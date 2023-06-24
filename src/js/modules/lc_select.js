import "../../../node_modules/lc-select/lc_select.min.js";

const contactsSelectSimple = new lc_select('select[name="title"]', {
	wrap_width: "100%",
	pre_placeh_opt: true,
	enable_search: false,
});

const contactsSelectMultiple = new lc_select('select[name="site"], select[name="location"]', {
	wrap_width: "100%",
	pre_placeh_opt: true,
	enable_search: false,
	// max_opts : 3,
});