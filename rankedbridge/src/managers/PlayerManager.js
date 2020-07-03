const { Collection } = require("discord.js");
const Client = require("../client/Client");
const Player = require("../classes/Player");

class PlayerManager extends Collection {
    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        super()
        this.client = client
    }

    add(discord, minecraft) {
        this.set(discord, new Player(this, discord, minecraft))
        return this.get(discord)
    }

    fetch() {
        return new Promise((resolve, reject) => {
            this.client.db.all(`SELECT * FROM players`, (err, rows) => {
                if (err) return reject(err)

                rows.forEach(row => {
                    this.add(row.discord, row.minecraft).setElo2(row.elo2).setElo4(row.elo4).setGamesPlayed(row.gamesPlayed).setGamesWon(row.gamesWon)
                })
                resolve(this)
            })
        })
    }
}

module.exports = PlayerManager