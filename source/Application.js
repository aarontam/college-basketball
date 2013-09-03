enyo.kind({
	name: "cb.Application",
	kind: enyo.Application,
	view: cb.MainView,
	controllers: [
		{name: "scoreboard", kind: cb.Scoreboard}
	],
	update: function () {
		this.controllers.scoreboard.fetch({success: this.startTicker, strategy: "merge"});
	},
	week: function () {
		// the first week of college football started on Thursday, August 29th
		var t = new Date().getTime(),
			f = new Date("Aug 29, 2013").getTime(),
			d = t - f,
			w = Math.ceil(d / (7 * 86400000));
		return w;
	},
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
