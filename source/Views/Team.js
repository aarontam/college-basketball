enyo.kind({
	name: "Team",
	classes: "team",
	orientation: "home",
	components: [
		{name: "score", classes: "team-score"},
		{name: "logo", classes: "logo", kind: enyo.Image},
		{name: "teamName", classes: "team-name"},
		{classes: "banner", content: "winner"}
	],
	bindings: [
		{from: ".model.logo", to: ".$.logo.src"},
		{from: ".model.currentScore", to: ".$.score.content"},
		{from: ".model.won", to: ".winner"},
		{from: ".model.nameRaw", to: ".$.teamName.content"}
	],
	winnerChanged: function () {
		this.addRemoveClass("winner", this.winner);
	}
});
