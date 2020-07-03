const PlayerManager = require("../managers/PlayerManager")

class Player {
    /**
     * 
     * @param {PlayerManager} manager - The PlayerManager
     * @param {string} discord - The Discord ID of the player
     * @param {string} minecraft - The Minecraft UUID of the player
     */
    constructor(manager, discord, minecraft) {
        this.manager = manager
        this.client = manager.client
        this.discord = discord
        this.minecraft = minecraft
        this.ign = null
        this.elo2 = 0
        this.elo4 = 0
        this.gamesPlayed = 0
        this.gamesWon = 0
    }

    get user() {
        return this.client.users.cache.get(this.discord)
    }

    get gamesLost() {
        return this.gamesPlayed - this.gamesWon
    }

    get elo() {
        return (this.elo2 + this.elo4) / 2
    }

    get rank() {
        return this.client.ranks.getRankByElo(this.elo)
    }

    setGamesWon(int) {
        this.gamesWon = int
        return this
    }

    setGamesPlayed(int) {
        this.gamesPlayed = int
        return this
    }

    addPlay() {
        this.setGamesPlayed(this.gamesPlayed + 1)
        return this
    }

    addWin() {
        this.setGamesWon(this.gamesWon + 1)
        return this
    }

    async fetchIGN() {
        const ign = await this.client.mojang.getIGN(this.minecraft)
        this.ign = ign
        return ign
    }

    setElo2(num) {
        this.elo2 = num
        return this
    }

    setElo4(num) {
        this.elo4 = num
        return this
    }

    write() {
        return new Promise((resolve, reject) => {
            this.client.db.all(`SELECT * FROM players WHERE discord = $discord`, {
                $discord: this.discord
            }, (err, rows) => {
                if (err) return reject(err)
                if (rows.length < 1) {
                    this.client.db.all(`INSERT INTO players(discord, minecraft, elo2, elo4) VALUES($discord, $minecraft, $elo2, $elo4)`, {
                        $discord: this.discord,
                        $minecraft: this.minecraft,
                        $elo2: this.elo2,
                        $elo4: this.elo4
                    }, (err) => {
                        if (err) return reject(err)
                        resolve(this)
                    })
                } else {
                    this.client.db.all(`UPDATE players SET minecraft = $minecraft, elo2 = $elo2, elo4 = $elo4 WHERE discord = $discord`, {
                        $discord: this.discord,
                        $minecraft: this.minecraft,
                        $elo2: this.elo2,
                        $elo4: this.elo4
                    }, (err) => {
                        if (err) return reject(err)
                        resolve(this)
                    })
                }
            })
        })
    }
}

module.exports = Player