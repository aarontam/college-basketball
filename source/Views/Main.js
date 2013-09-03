enyo.kind({
	name: "cb.MainView",
	kind: enyo.Scroller,
	fit: true,
	components: [
		{classes: "header", components: [
			{classes: "week", bindings: [
				{from: ".app.week", to: ".content", transform: "weekTransform"}
			]},
			{components: [
				{kind: enyo.Button, ontap: "refresh", content: "refresh"}
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
	refresh: function () {
		this.app.update();
	},
	weekTransform: function (v) {
		return "WEEK " + v;
	}
});
