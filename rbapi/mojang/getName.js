const request = require("request")

module.exports = (UUID) => {
    return new Promise((resolve, reject) => {
        request(`https://api.mojang.com/user/profiles/${UUID}/names`, (err, response, body) => {
            if (err) {
                client.error(err)
                reject(err)
                return
            }
            if (!body || body.length < 1) {
                resolve(null)
                return
            }
            const profile = JSON.parse(body)
            resolve(profile[profile.length-1] ?  profile[profile.length-1].name : null)
        })
    })
}