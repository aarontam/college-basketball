enyo.kind({
	name: "Main",
	kind: "FittableRows",
	fit: true,
	classes: "college-basketball",
	components: [
		{kind: "Signals", onLoadingStart: "spinnerStart"},
		{kind: "Signals", onLoadingStop: "spinnerStop"},
		{classes: "onyx-toolbar-inline", components: [
			{name: "yearPicker", kind: onyx.DatePicker, dayHidden: true, monthHidden: true, onSelect: "yearSelected"},
			{name: "buttonBracket", kind: onyx.Button, content: "Return to Bracket", ontap: "buttonBracketTapped", showing: false}
		]},
		{name: "panels", kind: enyo.Panels, fit: true, components: [
			{name: "panelBracket", components: [
				{name: "bracket", kind: enyo.Scroller, classes: "enyo-fill", components: [
					{name: "spinner", kind: onyx.Spinner, classes: "onyx-light"},
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
					], controller: ".app.controllers.bracket"}
				]}
			]},
			{name: "panelDetail", components: [
				{name: "detail", tag: "iframe", classes: "enyo-fill", style: "border: none;"}
			]}
		]}
	],
	bindings: [
		{from: ".app.yearDate", to: ".$.yearPicker.value", transform: function (v) {
			if (v.getFullYear() > this.app.maxYear) v.setFullYear(this.app.maxYear);
			return v;
		}},
		{from: ".app.maxYear", to : ".$.yearPicker.maxYear"},
		{from: ".app.minYear", to : ".$.yearPicker.minYear"}
	],
	spinnerStart: function (inSender, inEvent) {
		this.$.spinner.start();
	},
	spinnerStop: function (inSender, inEvent) {
		this.$.spinner.stop();
	},
	buttonBracketTapped: function (inSender, inEvent) {
		this.$.panels.setIndex(enyo.indexOf(this.$.panelBracket, this.$.panels.getPanels()));
		this.$.buttonBracket.setShowing(false);
	},
	yearSelected: function (inSender, inEvent) {
		this.app.controllers.router.trigger({location: "#bracket/" + inEvent.value.getFullYear(), change: true});
		return true;
	},
	gameSelected: function (inSender, inEvent) {
		if (typeof inEvent.index !== 'undefined') {
			this.showDetail(inEvent.model.get("recapUrl"));
		}
		return true;
	},
	showDetail: function (inUrl) {
		this.$.detail.setSrc(inUrl);
		this.$.panels.setIndex(enyo.indexOf(this.$.panelDetail, this.$.panels.getPanels()));
		this.$.buttonBracket.setShowing(true);
	}
});
