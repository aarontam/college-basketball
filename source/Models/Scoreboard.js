enyo.kind({
	name: "cb.Scoreboard",
	kind: enyo.Collection,
	model: cb.GameDay,
	defaultSource: "jsonp",
	url: "http://data.ncaa.com/jsonp/scoreboard/football/fbs/2013/%./scoreboard.html",
	getUrl: function () {
		// so we found the current season week and use that to complete our
		// scores request
		return enyo.format(this.url, ("0" + this.app.get("week")).slice(-2));
	},
	parse: function (data) {
		// the data comes back as an object with a property that is the
		// array of days with games that week
		return data.scoreboard;
	}
});
