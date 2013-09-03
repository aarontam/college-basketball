enyo.kind({
	name: "cb.GameDay",
	kind: enyo.Model,
	mergeKeys: ["day"],
	readOnly: true,
	parse: function (data) {
		// convert the array of games data hashes into a collection
		// of game records
		if (!this.get("games")) {
			data.games = new enyo.Collection(data.games, {model: cb.Game, owner: this});
		} else {
			// if this is one of the updates we don't need to replace the entire
			// collection we simply need to merge the new data in
			this.get("games").merge(data.games);
			// so the binding won't trigger a change to the controller
			delete data.games;
		}
		return data;
	}
});
