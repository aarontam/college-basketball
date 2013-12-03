enyo.kind({
	name: "Main",
	kind: enyo.Scroller,
	fit: true,
	classes: "college-basketball",
	components: [
		{name: "games", classes: "games", kind: enyo.DataRepeater, ontap: "gameSelected", components: [
			{classes: "game", components: [
				{classes: "top", components: [
					{name: "topTeam", classes: "top-team", kind: "Team"}
				]},
				{classes: "bottom", components: [
					{name: "bottomTeam", classes: "bottom-team", kind: "Team"}
				]},
				{name: "location", classes: "game-location"}
			], bindings: [
				{from: ".model.location", to: ".$.location.content"},
				{from: ".model.top", to: ".$.topTeam.model"},
				{from: ".model.bottom", to: ".$.bottomTeam.model"}
			]}
		], controller: ".app.controllers.bracket"},
		{name: "popup", kind: enyo.Popup, modal: true, floating: true, centered: true, components: [
			{name: "iframe", tag: "iframe", classes: "enyo-fill", style: "border: none;"}
		]}
	],
	gameSelected: function (inSender, inEvent) {
		enyo.log(inEvent);
		if (typeof inEvent.index !== 'undefined') {
			this.$.iframe.setSrc("http://www.ncaa.com/game/basketball-men/d1/2013/03/19/nc-at-liberty#recap");
			this.$.popup.showAtPosition({left: inEvent.clientX, top: inEvent.clientY});
		}
	}
});
