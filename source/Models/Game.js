enyo.kind({
	name: "Game",
	kind: enyo.Model,
	// this is a read-only example, and this flag means if _destroy_ is called on this
	// model it will only do the local routines
	readOnly: true,
	parse: function (data) {
		var h = this.get("home"),
			a = this.get("away");
		// we know that if there isn't a _home_ already this is our first time receiving
		// this data so we don't want to merge, we create our school entries
		if (!h) {
			data.home = new School(data.home);
			data.away = new School(data.away);
		} else {
			// since we're just merging the data and we know its current structure
			// doesn't need to be parsed we just call this to let anything know if
			// something has changed
			h.setObject(data.home);
			a.setObject(data.away);
			// remove these entries from the dataset so
			// they won't override our current objects
			delete data.home;
			delete data.away;
		}
		return data;
	}
});
