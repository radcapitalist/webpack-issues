# webpack-issues
This repository reproduces some issues I've been having with Webpack getting correct paths in stack traces and hitting breakpoints.
Specifically, this documents issues I reported [in this Webpack issue](https://github.com/webpack/webpack/issues/8764).
### Getting Started
Clone this repository to a local folder, and in that folder, do the following:
```
npm install
npm run build-dev
npm run build-dev-2
npm run build-dev-3
npm run build-dev-4
```
This builds the repository 4 times, with just a couple differences in the Webpack configuration for source map generation.
All four configurations use **webpack.SourceMapDevToolPlugin** for source map generation. Here is what is interesting about
each of the 4 configurations:

* **dev** - The `devtool` option is _not present_ in the exported Webpack configuration object
* **dev-2** - The Webpack config contains `devtool: false`
* **dev-3** - The `devtool` option is _not present_, plus **source-map-support** is installed via `webpack.BannerPlugin`.
* **dev-4** - The Webpck config contains `devtool: false`, plus **source-map-support** is installed via `webpack.BannerPlugin`.

### Running the Tests
Run one of the configurations using the supplied npm scripts.
```
npm run dev
```
OR
```
npm run dev-2
```
etc.

Once it's running, fire up your favorite browser and surf http://localhost:3000/fail.

Then, look at the stack trace in either the browser or the console where the application is running and look at the first line of the stack trace.

## Windows
On Windows, here is what I get from each of the configurations:
* **dev**  
  This configuration produces the correct path to the original source file:
  ```
      at eval (c:\jmpdev\usr\sasewh\git\webpack-issues\src\server\routes\index.js:13:8)
  ```
* **dev-2**  
  This configuration points into the bundle rather than to the original source code:
  ```
      at c:\jmpdev\usr\sasewh\git\webpack-issues\build\bundle-server-dev-2.js:569:8
  ```
* **dev-3**  
  This configuration also produces the correct path to the original source file:
  ```
      at eval (c:\jmpdev\usr\sasewh\git\webpack-issues\src\server\routes\index.js:13:8)
  ```
* **dev-4**  
  This configuration is trying to point to the line in the original source file, but with **source-map-support** involved, the path
  ends up with `webpack:\` in the middle of it:
  ```
      at c:\jmpdev\usr\sasewh\git\webpack-issues\build\webpack:\src\server\routes\index.js:13:1
  ```
  
## Mac
And here is what I get from each configuration on the Mac, none of which are any good:
* **dev**  
  In the "close but no cigar" category, with this configuration I get:
  ```
      at eval (Users/sasewh/Development/git/webpack-issues/src/server/routes/index.js:13:8)
      at Layer.handle [as handle_request] (/Users/sasewh/Development/git/webpack-issues/node_modules/express/lib/router/layer.js:95:5)
  ```
  I included two lines of the stack trace here.  Notice that in the first line, the leading slash on the path is missing.  This is true
  for all non-external lines of code.  The second line is external, which has the correct path, because it's not source-mapped.
* **dev-2**  
  Like in the Windows case, with `devtool: false` in the config file, source-mapping seems to not happen, so we get a perfectly fine path
  into the bundle, which does us no good:
  ```
      at /Users/sasewh/Development/git/webpack-issues/build/bundle-server-dev-2.js:569:8
  ```
* **dev-3**  
  Same result as dev:
  ```
      at eval (Users/sasewh/Development/git/webpack-issues/src/server/routes/index.js:13:8)
  ```
* **dev-4**  
  This one is also agonizingly close.  If I could just get the "build/webpack:" out of there:
  ```
      at /Users/sasewh/Development/git/webpack-issues/build/webpack:/src/server/routes/index.js:13:1
  ```
  


  

