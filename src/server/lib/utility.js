
let utility = module.exports;

utility.renderPugTemplate = (res, template, in_data) => {
	let data = in_data || {};
	// Copy res.locals into data
	if (res.locals) {
		for (let k in res.locals)
			data[k] = res.locals[k];
	}
	return res.send(template(data));
};

