enyo.kind({
	name: "Bracket",
	kind: enyo.Collection,
	model: Game,
	defaultSource: "jsonp",
	url: "http://data.ncaa.com/jsonp/gametool/brackets/championships/basketball-men/d1/2012/data.json",
	parse: function (data) {
		// ignore the first four play-in games for now (will do something with them later)
		return data.games.slice(4).sort(function(a, b) { return parseInt(a.bracketPositionId) - parseInt(b.bracketPositionId)});
	}
});
