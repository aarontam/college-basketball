enyo.kind({
	name: "Bracket",
	kind: enyo.Collection,
	model: Game,
	defaultSource: "jsonp",
	url: "http://data.ncaa.com/jsonp/gametool/brackets/championships/basketball-men/d1/%./data.json",
	getUrl: function () {
		// insert the currently selected year into our data url
		return enyo.format(this.url, this.app.get("year"));
    },
	parse: function (data) {
		// ignore the first four play-in games for now (will figure out something to do with them later...)
		return data.games.slice(4).sort(function(a, b) { return parseInt(a.bracketPositionId) - parseInt(b.bracketPositionId)});
	}
});
