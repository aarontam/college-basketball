enyo.kind({
	name: "cb.Application",
	kind: enyo.Application,
	view: cb.MainView,
	tick: null,
	didLoad: false,
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
			// just so we only ever have to do this once, we bind it now so
			// we can freely use it as the callback without rebinding
			this.startTicker = this.bindSafely("startTicker");
			this.updateTicker = this.bindSafely("updateTicker");
			// we also want to register a listener so we can be updated once
			// the collection has added records
			this.controllers.scoreboard.addListener("add", function () {
				this.set("didLoad", true);
			}, this);
			sup.apply(this, arguments);
			this.update();
		};
	}),
	startTicker: function () {
		this.set("tick", 30);
		this._timeout = setTimeout(this.updateTicker, 1000);
	},
	stopTicker: function () {
		clearTimeout(this._timeout);
		this.set("tick", null);
	},
	updateTicker: function () {
		this.tick--;
		if (this.tick == 0) {
			this.stopTicker();
			this.update();
		} else {
			this.notifyObservers("tick");
			this._timeout = setTimeout(this.updateTicker, 1000);
		}
	},
	toggleTicker: function () {
		if (this.get("tick") != null) {
			this.stopTicker();
		} else {
			this.startTicker();
		}
	},
	ticker: function () {
		return this.tick;
	},
	computed: {
		week: [{cached: true}],
		ticker: ["tick"]
	}
});
