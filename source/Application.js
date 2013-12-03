enyo.kind({
	name: "Application",
	kind: enyo.Application,
	view: Main,
	controllers: [
		{name: "bracket", kind: Bracket}
	],
	// in this method all we're doing is calling fetch with the `merge` strategy indicated
	// of course this app doesn't currently supply an interactive UI button or timer to
	// automatically update the content...but it could be done and this would make it so
	// it didn't need to rebuild the entire application UI it could just update any fields
	// that changed
	update: function () {
		this.controllers.bracket.fetch({success: this.startTicker, strategy: "merge"});
	},
	// we create a computed property (see the `computed` block at the bottom) that will
	// return the current week relative to the beginning of the college football season
	week: function () {
		// the first week of college football started on Thursday, August 29th
		var t = new Date().getTime(),
			f = new Date("Aug 29, 2013").getTime(),
			d = t - f,
			w = Math.ceil(d / (7 * 86400000));
		return w;
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
		week: [{cached: true}]
	}
});
