enyo.kind({
	name: "cb.Game",
	kind: enyo.Model,
	readOnly: true,
	attributes: {
		homeTeam: function () {
			var r = this.get("homeRank");
			if (r) { r = enyo.format("(%.) ", r); }
			else { r = ""; }
			return r + this.get("home").nameRaw;
		},
		homeRank: function () {
			return parseInt(this.get("home").teamRank);
		},
		homeScore: function () {
			return this.get("home").currentScore;
		},
		awayTeam: function () {
			var r = this.get("awayRank");
			if (r) { r = enyo.format("(%.) ", r); }
			else { r = ""; }
			return r + this.get("away").nameRaw;
		},
		awayRank: function () {
			return parseInt(this.get("away").teamRank);
		},
		awayScore: function () {
			return this.get("away").currentScore;
		},
		winner: function () {
			if (this.get("gameState") == "final") {
				return this.get("home").winner == "true"? "home": "away";
			}
		}
	}
});
