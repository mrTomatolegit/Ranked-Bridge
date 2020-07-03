const request = require("request")

class Mojang {
    constructor() {
        this.totalRequests = 0
    }

    getUUID(IGN) {
        return new Promise((resolve, reject) => {
            this.totalRequests++
            request(`https://api.mojang.com/users/profiles/minecraft/${escape(IGN)}`, (err, response, body) => {
                if (err) {
                    client.error(err)
                    reject(err)
                    return
                }
                if (!body || body.length < 1) {
                    resolve(null)
                    return
                }
                try {
                    const profile = JSON.parse(body)
                    resolve(profile.id)
                } catch {
                    resolve(null)
                }
            })
        })
    }

    getIGN(UUID) {
        return new Promise((resolve, reject) => {
            request(`https://api.mojang.com/user/profiles/${escape(UUID)}/names`, (err, response, body) => {
                if (err) {
                    client.error(err)
                    reject(err)
                    return
                }
                if (!body || body.length < 1) {
                    resolve(null)
                    return
                }
                try {
                    const profile = JSON.parse(body)
                    resolve(profile[profile.length-1] ?  profile[profile.length-1].name : null)
                }
                catch {
                    resolve(null)
                }
            })
        })
    }
}

module.exports = Mojang