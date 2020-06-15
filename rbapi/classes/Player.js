const database = require("../data/data")
/**
 * @class Row inside the registry table
 */
class Player {
    /**
     * @param {string} ID - The Discord ID of the user
     * @param {string} UUID - The Minecraft UUID of the user
     * @param {boolean} written - Wether the user is registered in the database
    */
    constructor(ID, UUID, written) {
        this.discordID = ID
        this.minecraftUUID = UUID
        this.elo2 = 0
        this.elo4 = 0
        this.matchCount = 0
        this.written = written || false
        return this
    }
    /**
     * @param {number} elo - Number of 2v2 elo to add to the player
     */
    set addElo2(elo) {
        this.elo2 = this.elo2 + elo
        return this
    }

    /**
     * @param {number} elo - Number of 4v4 elo to add to the player
     */
    set addElo4(elo) {
        this.elo4 = this.elo4 + elo
        return this
    }

    write() {
        return new Promise((resolve, reject) => {
            if (this.written) {
                database.all(`UPDATE registry SET matchCount = $matchCount, minecraftUUID = $minecraftUUID, elo2 = $elo2, elo4 = $elo4`, {
                    $matchCount: this.matchCount,
                    $minecraftUUID: this.minecraftUUID,
                    $elo2: this.elo2,
                    $elo4: this.elo4
                }, (err) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(this)
                })
            } else {
                database.all(`INSERT INTO registry(discordID, minecraftUUID) VALUES($discordID, $minecraftUUID)`, {
                    $discordID: this.discordID,
                    $minecraftUUID: this.minecraftUUID
                }, (err) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(this)
                })
            }
        })
    }

    fetch() {
        return new Promise((resolve, reject) => {
            if (this.written) {
                database.all("SELECT * FROM registry WHERE discordID = $discord", {$discord: this.discordID}, (err, rows) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    if (rows.length < 1) {
                        reject("User was not found in database")
                        return
                    }
                    const row = rows[0]
                    this.elo2 = row.elo2
                    this.elo4 = row.elo4
                    this.matchCount = row.matchCount
                    resolve(this)
                })
            } else {
                reject("User was not written")
            }
        })
    }

    getIGN() {
        return new Promise(async (resolve, reject) => {
            resolve(await client.mojang.getName(this.minecraftUUID))
        })
    }
}

module.exports = Player