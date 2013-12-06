enyo.kind({
	name: "Game",
	kind: enyo.Model,
	mergeKeys: ["contestId"],
	// this is a read-only example, and this flag means if _destroy_ is called on this
	// model it will only do the local routines
	readOnly: true,
	parse: function(data) {
		var t = this.get("top"),
			b = this.get("bottom"),
			top,
			bottom;

		// determine top and bottom team (important for correct seeding)
		if (data.home.isTop === "T") {
			top = data.home;
			bottom = data.away;
		} else {
			top = data.away;
			bottom = data.home;
		}
		top.seed = data.seedTop;
		bottom.seed = data.seedBottom;

		if (!t) {
			data.top = new School(top);
			data.bottom = new School(bottom);
		} else {
			t.setObject(top);
			b.setObject(bottom);
		}

		return data;
	}
});
