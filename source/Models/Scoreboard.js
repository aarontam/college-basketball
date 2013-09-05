enyo.kind({
	name: "Scoreboard",
	kind: enyo.Collection,
	model: GameDay,
	defaultSource: "jsonp",
	// this is the url we want to use to request the data for the games but notice the `%.` that
	// we will use with _enyo.format_ to replace that with the current week
	url: "http://data.ncaa.com/jsonp/scoreboard/football/fbs/2013/%./scoreboard.html",
	getUrl: function () {
		// so we found the current season week and use that to complete our
		// scores request, the request requires a leading `0` if it is a single digit
		// value
		return enyo.format(this.url, ("0" + this.app.get("week")).slice(-2));
	},
	parse: function (data) {
		// the data comes back as an object with a property that is the
		// array of days with games that week
		return data.scoreboard;
	}
});
