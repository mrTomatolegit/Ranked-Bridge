class SettingsManager {
    constructor(client) {
        this.client = client
    }
    /**
     * Fetches the settings from the database
     */
    fetch() {
        return new Promise((resolve, reject) => {
            this.client.db.all(`SELECT * FROM settings`, (err, rows) => {
                if (err) {
                    throw err
                }
                if (rows.length < 1) {
                    reject("No settings")
                    return
                }
                const settings = rows[0]
                for (let setting in settings) {
                    this[setting] = settings[setting]
                }
                resolve(this)
            })
        })
    }
    /**
     * Writes the settings in the database
     */
    write() {
        return new Promise((resolve, reject) => {
            let allVars= ""
            let antiInject = {}
            for (setting of this) {
                if (allVars.length > 0) {
                    allVars = allVars + ", "
                }
                allVars = `${allVars}${setting} = $${setting}`
                antiInject[`$${setting}`] = this[setting]
            }
            this.client.db.all(`UPDATE settings SET ${allVars}`, antiInject, (err, out) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(this)
            })
        })
    }
}

module.exports = SettingsManager