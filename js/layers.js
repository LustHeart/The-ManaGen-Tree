addLayer("m", {
    name: "mana", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fff000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "mana", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
            if (hasUpgrade('m', 13)) mult = mult.times(upgradeEffect('m', 13))
            if (hasUpgrade('m', 14)) mult = mult.times(upgradeEffect('m', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: combine to mana", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Simple Spell",
            description: "double point gain",
            cost: new Decimal(1),
        },
        12: {
            title: "Point Spell 0.1",
            description: "point gain is boosted by mana",
            cost: new Decimal(4), // 4
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Mana Enhancer",
            description: "points boost mana gain",
            cost: new Decimal(11), // 11
            effect() {
                return player.points.add(1).pow(0.17)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Mana Repeation",
            description: "mana boosts mana gain",
            cost: new Decimal(21), // 21
            effect() {
                return player[this.layer].points.add(1).pow(0.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
    layerShown(){return true}
})
