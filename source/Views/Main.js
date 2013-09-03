enyo.kind({
	name: "cb.MainView",
	kind: enyo.Scroller,
	fit: true,
	components: [
		{classes: "header", components: [
			{classes: "week", bindings: [
				{from: ".app.week", to: ".content", transform: "weekTransform"}
			]},
			{name: "counter", allowHtml: true, classes: "counter", bindings: [
				{from: ".app.ticker", to: ".content", transform: "tickerTransform"}
			]},
			{components: [
				{kind: enyo.Button, ontap: "toggleTicker", bindings: [
					{from: ".app.tick", to: ".content", transform: "refreshTransform"}
				]}
			]}
		]},
		{kind: enyo.DataRepeater, classes: "college-football", components: [
			{classes: "game-day", components: [
				{name: "date", classes: "date"},
				{name: "games", kind: enyo.DataRepeater, classes: "games", components: [
					{kind: cb.GameView}
				]}
			], bindings: [
				{from: ".model.day", to: ".$.date.content"},
				{from: ".model.games", to: ".$.games.controller"}
			]}
		], controller: ".app.controllers.scoreboard"}
	],
	toggleTicker: function () {
		this.app.toggleTicker();
	},
	weekTransform: function (v) {
		return "WEEK " + v;
	},
	tickerTransform: function (v, d, b) {
		return "&nbsp;... " + ((!isNaN(v) && v) || (this.app.didLoad? "paused": "loading"));
	},
	refreshTransform: function (v) {
		if (v != null) { return "Stop Refreshing"; }
		else { return "Start Refreshing"; }
	}
});
