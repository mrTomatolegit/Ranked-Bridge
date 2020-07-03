const {Client} = require("discord.js")

class StartClient extends Client{
    constructor(options) {
        if (options) super(options)
        else super()
    }
}

module.exports = StartClient