enyo.kind({
	name: "Team",
	classes: "team",
	orientation: "home",
	components: [
		{name: "teamInfo", classes: "team-info", components: [
			{name: "logo", classes: "logo", kind: enyo.Image},
			{name: "seed", classes: "seed"},
			{name: "teamName", classes: "name"}
		]},
		{name: "score", classes: "team-score"}
	],
	bindings: [
		// binding from a computed property...
		{from: ".model.logo", to: ".$.logo.src"},
		{from: ".model.score", to: ".$.score.content"},
		{from: ".model.seed", to: ".$.seed.content"},
		// binding from a computed property...
		{from: ".model.won", to: ".winner"},
		// binding from a computed property...
		{from: ".model.name", to: ".$.teamName.content"}
	],
	// when the computed property for `won`, bound to our local property
	// `winner` is set, this method will detect the change and fire which
	// will in-turn add a class to help visually indicate which team won
	winnerChanged: function () {
		this.addRemoveClass("winner", this.winner);
	}
});
