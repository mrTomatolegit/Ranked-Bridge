const StartClient = require("./StartClient");
const sqlite3 = require("sqlite3");
const Mojang = require("../classes/Mojang");
const SettingsManager = require("../managers/SettingsManager");
const PlayerManager = require("../managers/PlayerManager");
const QueueManager = require("../managers/QueueManager");
const RankManager = require("../managers/RankManager");
const GameManager = require("../managers/GameManager");
const { Collection } = require("discord.js");
class Client extends StartClient {
    constructor(mainServer, options) {
        if (options) super(options)
        else super()

        this.mainServerID = mainServer
        

        this.db = new sqlite3.Database("./rankedbridge/src/client/Ranked-Bridge.db")
        this.mojang = new Mojang(this)
        this.settings = new SettingsManager(this)
        this.players = new PlayerManager(this)
        this.queues = new QueueManager(this)
        this.ranks = new RankManager(this)
        this.games = new GameManager(this)
    }

    async init() {
        await this.settings.fetch()
        await this.players.fetch()
        await this.ranks.fetch()
        await this.queues.fetch()

        return this
    }

    get mainServer() {
        return this.guilds.cache.get("719789085706682378")
    }

    get teamVoiceChannels() {
        let channels = new Collection()
        this.games.forEach(game => {
            game.teams.forEach(team => {
                channels.set(team.id, team.voiceChannel)
            })
        })
        return channels
    }
}

module.exports = Client