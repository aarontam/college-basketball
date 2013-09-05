enyo.kind({
	name: "GameDay",
	kind: enyo.Model,
	mergeKeys: ["day"],
	// this is a read-only example, and this flag means if _destroy_ is called on this
	// model it will only do the local routines
	readOnly: true,
	parse: function (data) {
		// convert the array of games data hashes into a collection
		// of game records
		if (!this.get("games")) {
			// because this collection is getting its data from us here it doesn't know if
			// it needs to tell the records to parse the data when they are instanced so we
			// use the _didFetch_ flag and now the `parse` method of the Game model kind will be called
			// also note the use of the _owner_ property here that is only useful if you destroy this
			// GameDay model (the owner of the the collection we're creating) it will also destroy
			// the collection since we _own_ it
			data.games = new enyo.Collection(data.games, {model: Game, owner: this, didFetch: true});
		} else {
			// if this is one of the updates we don't need to replace the entire
			// collection we simply need to merge the new data in
			// note we also indicate to the merge method that this data needs to be parsed
			// by using its optional second parameter
			this.get("games").merge(data.games, true);
			// so the binding won't trigger a change to the controller
			delete data.games;
		}
		return data;
	}
});
