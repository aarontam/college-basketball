enyo.kind({
	name: "School",
	kind: enyo.Model,
	// this is a read-only example, and this flag means if _destroy_ is called on this
	// model it will only do the local routines
	readyOnly: true,
	attributes: {
		// we create a computed property that will map the internal _winner_ attribute
		// to a boolean (by default it is a string)
		won: function () { 
			return ("true" == this.get("winner"));
		},
		// we create a computed property that will return the correct full url source
		// for the team logo image
		logo: function () {
			return "http://i2.turner.ncaa.com/dr/ncaa/ncaa/release" + this.get("iconURL");
		}
	}
});
