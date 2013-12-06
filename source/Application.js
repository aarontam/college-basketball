enyo.kind({
	name: "Application",
	kind: enyo.Application,
	view: Main,
	controllers: [
		{name: "bracket", kind: Bracket},
		{name: "router", kind: Router}
	],
	minYear: 2011,
	maxYear: 2012,
	published: {
		yearDate: new Date()
	},
	// fetch bracket data
	update: function () {
		enyo.Signals.send("onLoadingStart");
		this.controllers.bracket.fetch({success: function() { enyo.Signals.send("onLoadingStop") }, strategy: "merge", replace: true});
	},
	// computed property that returns the year as a string (and ensures the value does not exceed the max year specified)
	year: function () {
		if (this.yearDate.getFullYear() > this.maxYear) this.yearDate.setFullYear(this.maxYear);
		return this.yearDate.getFullYear();
	},
	// update our data whenever the year changes
	yearDateChanged: function (inOldValue) {
		this.update();
	},
	// we overloaded the default `start` method to also call our `update` method
	// once the view is rendered
	start: enyo.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.update();
		};
	}),
	computed: {
		year: [{cached: false}]
	}
});
