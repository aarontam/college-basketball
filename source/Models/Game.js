enyo.kind({
	name: "Game",
	kind: enyo.Model,
	readOnly: true,
	parse: function (data) {
		var h = this.get("home"),
			a = this.get("away");
		if (!h) {
			data.home = new School(data.home);
			data.away = new School(data.away);
		} else {
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
