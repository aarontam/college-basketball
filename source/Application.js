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
	// in this method all we're doing is calling fetch with the `merge` strategy indicated
	// of course this app doesn't currently supply an interactive UI button or timer to
	// automatically update the content...but it could be done and this would make it so
	// it didn't need to rebuild the entire application UI it could just update any fields
	// that changed
	update: function () {
		enyo.Signals.send("onLoadingStart");
		this.controllers.bracket.fetch({success: function() { enyo.Signals.send("onLoadingStop") }, strategy: "merge", replace: true});
	},
	year: function () {
		if (this.yearDate.getFullYear() > this.maxYear) this.yearDate.setFullYear(this.maxYear);
		return this.yearDate.getFullYear();
	},
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
