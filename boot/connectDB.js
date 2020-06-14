exports.load = (client, reload) => {
    const sqlite = require("sqlite3")
    client.db = new sqlite.Database("./data/Ranked-Bridge.db")


    client.fetchSettings = async () => {
        client.db.all(`SELECT * FROM settings`, (err, rows) => {
            if (err) throw err

            client.settings = rows[0]
            return rows[0]
        })
    }
    client.fetchSettings()
    
    client.getUUID = (ID) => {
        return new Promise((resolve, reject) => {
            client.db.all("SELECT * FROM registry WHERE discordID = $ID", {$ID: ID}, (err, out) => {
                if (err) {
                    client.error(err)
                    reject(err)
                    return
                }
                if (!out || out.length < 1) {
                    resolve(null)
                    return
                }
                resolve(out[0].minecraftUUID)
            })
        })
    }

    client.getID = (UUID) => {
        return new Promise((resolve, reject) => {
            client.db.all("SELECT * FROM registry WHERE minecraftUUID = $UUID", {$UUID: UUID}, (err, out) => {
                if (err) {
                    client.error(err)
                    reject(err)
                    return
                }
                if (!out || out.length < 1) {
                    resolve(null)
                    return
                }
                resolve(out[0].discordID)
            })
        })
    }
}