enyo.kind({
	name: "Main",
	kind: enyo.Scroller,
	fit: true,
	classes: "college-basketball",
	components: [
		{classes: "onyx-toolbar-inline", components: [
			{name: "yearPicker", kind: "onyx.DatePicker", dayHidden: true, monthHidden: true, maxYear: 2012, minYear: 2011, value: new Date("2012-12-31")}
		]},
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
				{from: ".model.bottom", to: ".$.bottomTeam.model"},
				{from: ".model.round", to:".style", transform: function(v, dir, binding) {
					var topIndex,
						index = binding.target.index
						round = parseInt(v)-2;
					if (index == 63) topIndex = 0;
					else if (index >= 62) topIndex = index - 62;
					else if (index >= 60) topIndex = index - 60;
					else if (index >= 56) topIndex = index - 56;
					else if (index >= 48) topIndex = index - 48;
					else if (index >= 32) topIndex = index - 32;
					else topIndex = index;
					return "position: absolute; top:" + (33*(Math.pow(2, round)-1) + (topIndex*66*Math.pow(2, round))) + "px; left:" + round*246 + "px"; }
				}
			]}
		], controller: ".app.controllers.bracket"},
		{name: "popup", kind: enyo.Popup, modal: true, floating: true, centered: true, components: [
			{name: "iframe", tag: "iframe", classes: "enyo-fill", style: "border: none;"}
		]}
	],
	bindings: [
		{from: ".$.yearPicker.value", to: ".app.yearDate"}
	],
	gameSelected: function (inSender, inEvent) {
		enyo.log(inEvent);
		if (typeof inEvent.index !== 'undefined') {
			this.$.iframe.setSrc("http://www.ncaa.com/game/basketball-men/d1/2013/03/19/nc-at-liberty#recap");
			this.$.popup.showAtPosition({left: inEvent.clientX, top: inEvent.clientY});
		}
	}
});
