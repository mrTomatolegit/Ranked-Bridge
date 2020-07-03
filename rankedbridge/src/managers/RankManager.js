const { Collection } = require("discord.js")
const Rank = require("../classes/Rank")

class RankManager extends Collection{
    constructor(client) {
        super()
        this.client = client
    }

    add(id, name) {
        this.set(id, new Rank(this, id, name))
        return this.get(id)
    }

    fetch() {
        return new Promise((resolve ,reject) => {
            this.client.db.all(`SELECT * FROM ranks`, (err, rows) => {
                if (err) return reject(err)

                rows.forEach(row => {
                    this.add(row.id, row.name).setMin(row.minElo).setWinAmount(row.win).setLossAmount(row.loss)
                })

                resolve(this)
            })
        })
    }

    getRankByElo(elo) {
        const validRanks = this.filter(r => r.min <= elo)
        let highestRank
        validRanks.forEach((rank) => {
            if (highestRank) {
                if (rank.min > highestRank.min) {
                    highestRank = rank
                }
            } else {
                highestRank = rank
            }
        })
        return highestRank
    }
}

module.exports = RankManager