enyo.kind({
	name: "School",
	kind: enyo.Model,
	attributes: {
		won: function () { 
			return ("true" == this.get("winner"));
		},
		logo: function () {
			return "http://i2.turner.ncaa.com/dr/ncaa/ncaa/release" + this.get("iconURL");
		}
	}
});
