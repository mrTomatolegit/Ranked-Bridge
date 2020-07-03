exports.load = (client, reload) => {
    client.randomLeaders = new Map()
    return new Promise(async resolve => {
        if (reload) {
            delete client.config
            delete require.cache[require.resolve(`../config.json`)]
        }
        console.log("Loading config file")
        client.config = require(`../config.json`)
        resolve()
    })
}