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
		// binding from a computed property...
		{from: ".model.logo", to: ".$.logo.src"},
		{from: ".model.currentScore", to: ".$.score.content"},
		// binding from a computed property...
		{from: ".model.won", to: ".winner"},
		{from: ".model.nameRaw", to: ".$.teamName.content"}
	],
	// when the computed property for `won`, bound to our local property
	// `winner` is set, this method will detect the change and fire which
	// will in-turn add a class to help visually indicate which team won
	winnerChanged: function () {
		this.addRemoveClass("winner", this.winner);
	}
});
