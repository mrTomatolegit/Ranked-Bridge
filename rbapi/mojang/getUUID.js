const request = require("request")

module.exports = (IGN) => {
    return new Promise((resolve, reject) => {
        request(`https://api.mojang.com/users/profiles/minecraft/${IGN}`, (err, response, body) => {
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
            resolve(profile.id)
        })
    })
}