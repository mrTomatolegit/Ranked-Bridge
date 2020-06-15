exports.load = (client, reload) => {
    return new Promise(async resolve => {
        if (reload) {
            delete client.config
            delete require.cache[require.resolve(`../config.json`)]
        }
        console.log("Loading config file")
        client.config = require(`../config.json`)
        const rbapi = require("../rbapi")
        const events = require('events')
        client.events = new events.EventEmitter()
        client.settings = await new rbapi.Settings().fetch()
        resolve()
    })
}