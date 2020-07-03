const TeamMemberManager = require("../managers/TeamMemberManager")
const alphabet = "abcdefhijklmnopqrstuvwxyz".split("")
class Team {
    constructor(game, id) {
        this.id = id
        this.game = game
        this.client = game.client
        this.ppt = game.ppt
        this.leader = null
        this.members = new TeamMemberManager(this)
        this.voiceChannel = null
        this.score = 0
    }

    get isFull() {
        if (this.members.size >= this.ppt) return true
        else return false
    }

    setLeader(player) {
        this.members.add(player)
        this.leader = player
    }

    createChannel() {
        return new Promise(async (resolve, reject) => {
            this.client.mainServer.channels.create(`${this.ppt}v${this.ppt} [${this.id+1}]`, {
                type: "voice",
                parent: this.client.mainServer.channels.cache.find(c => c.type === "category" && c.name.toLowerCase().includes("team")) || await this.client.mainServer.channels.create("Teams", {type: "category", position: this.client.mainServer.channels.cache.size}),
                userLimit: this.ppt
            }).then(channel => {
                this.voiceChannel = channel
                resolve(channel)
            }).catch((e) => {
                reject(e)
            })
        })
    }

    setChannel(channel) {
        this.voiceChannel = channel
    }

    sendToChannel() {
        return new Promise((resolve, reject) => {
            if (!this.voiceChannel) {
                return reject("No voice channel set for this team!")
            }
            const queue = this.client.queues.find(q => q.ppt === this.ppt && q.channel.members.get(this.leader.discord))
            this.members.forEach(async player => {
                const member = queue.channel.guild.members.cache.get(player.discord)
                if (member && member.voice && member.voice.channel) {
                    await member.voice.setChannel(this.voiceChannel, "Moved to team's vc").catch(() => {})
                }
            })
            resolve()
        })
    }

    setScore(int) {
        this.score = parseInt(int)
        return this
    }
}

module.exports = Team