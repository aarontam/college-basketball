enyo.kind({
	name: "Router",
	kind: enyo.Router,
	history: true,
	routes: [
		{ path: "bracket/:year", handler: "loadBracket" }
	],
	loadBracket: function (inYear) {
		if (inYear) {
			this.app.setYearDate(new Date(this.app.getYearDate().setFullYear(inYear)));
		} else {
			// this is our default view (bracket for most recent year)
			this.app.setYearDate(new Date(this.app.getYearDate().setFullYear(this.app.maxYear)));
		}
	}
});