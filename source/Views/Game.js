enyo.kind({
	name: "cb.GameView",
	classes: "game",
	colors: ["primary", "primary-light", "light-highlight", "dark-highlight", "dark"],
	components: [
		{kind: enyo.Table, classes: "teams-table", components: [
			{components: [
				{classes: "teams", components: [
					{name: "homeItems", classes: "home", components: [
						{name: "homeTeam", classes: "team"},
						{name: "homeScore", classes: "score"}
					]},
					{name: "awayItems", classes: "away", components: [
						{name: "awayTeam", classes: "team"},
						{name: "awayScore", classes: "score"}
					]}
				]},
				{classes: "game-stats"}
			]}
		]},
		{name: "location", classes: "location"},
		{name: "startTime", classes: "start-time"}
	],
	bindings: [
		{from: ".model.location",  to: ".$.location.content"},
		{from: ".model.startTime", to: ".$.startTime.content"},
		{from: ".model.homeTeam",  to: ".$.homeTeam.content"},
		{from: ".model.homeScore", to: ".$.homeScore.content"},
		{from: ".model.awayTeam",  to: ".$.awayTeam.content"},
		{from: ".model.awayScore", to: ".$.awayScore.content"},
		{from: ".model.winner",    to: ".winner"}
	],
	winnerChanged: function (p, c) {
		if (c) {
			if (c == "home") {
				this.$.homeItems.addClass("winner");
			} else if (c == "away") {
				this.$.awayItems.addClass("winner");
			}
		}
	},
	modelChanged: enyo.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.addClass(this.colors[(Math.floor(this.index % 5))]);
		};
	})
});
