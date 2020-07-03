const { Collection } = require("discord.js");
const Game = require("../classes/Game");

class GameManager extends Collection {
    constructor(client) {
        super()
        this.client = client
    }

    unusedID() {
        let awoo = null
        for (let i = 0; i < 1000000000; i++) {
            if (!this.get(i)) {
                awoo = i
                break
            }
        }
        return awoo
    }

    add(id, ppt) {
        this.set(id, new Game(this, id, ppt))
        return this.get(id)
    }

    new(ppt) {
        const unusedID = this.unusedID()
        this.set(unusedID, new Game(this, unusedID, ppt))
        return this.get(unusedID)
    }
}

module.exports = GameManager