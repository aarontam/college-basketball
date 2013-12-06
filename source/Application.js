enyo.kind({
	name: "Application",
	kind: enyo.Application,
	view: Main,
	controllers: [
		{name: "bracket", kind: Bracket}
	],
	published: {
		yearDate: new Date()
	},
	// in this method all we're doing is calling fetch with the `merge` strategy indicated
	// of course this app doesn't currently supply an interactive UI button or timer to
	// automatically update the content...but it could be done and this would make it so
	// it didn't need to rebuild the entire application UI it could just update any fields
	// that changed
	update: function () {
		var me = this;
		if (this.view.startLoading) this.view.startLoading();
		this.controllers.bracket.fetch({success: function() { 
			if (me.view.stopLoading) {
				me.view.stopLoading();
			}
		}, strategy: "merge", replace: true});
	},
	year: function () {
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
