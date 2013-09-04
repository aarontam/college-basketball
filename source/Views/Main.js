enyo.kind({
	name: "Main",
	kind: enyo.Scroller,
	fit: true,
	classes: "college-football",
	components: [
		{classes: "game-week", components: [
			{tag: "span", content: "NCAAF Week "},
			{tag: "span", name: "week"}	
		]},
		{kind: enyo.DataRepeater, components: [
			{classes: "game-day", components: [
				{classes: "date", components: [
					{name: "date"}
				]},
				{name: "games", classes: "games", kind: enyo.DataRepeater, components: [
					{classes: "game", components: [
						{classes: "game-teams", components: [
							{name: "away", classes: "away-team", kind: "Team", orientation: "away"},
							{content: "@", classes: "at"},
							{name: "home", classes: "home-team", kind: "Team", orientation: "home"}
						]},
						{name: "location", classes: "game-location"}
					], bindings: [
						{from: ".model.home", to: ".$.home.model"},
						{from: ".model.away", to: ".$.away.model"},
						{from: ".model.location", to: ".$.location.content"}
					]}
				]}
			], bindings: [
				// we map an entry from our model to the controller of our nested
				// repeater
				{from: ".model.games", to: ".$.games.controller"},
				{from: ".model.day", to: ".$.date.content"}
			]}	
		], controller: ".app.controllers.scoreboard"}
	],
	bindings: [
		{from: ".app.week", to: ".$.week.content"}
	]
});
