const TeamManager = require("../managers/TeamManager")
const {MessageEmbed, MessageCollector} = require("discord.js")
class Game {
    constructor(manager, id, ppt) {
        this.manager = manager
        this.client = manager.client
        this.id = id
        this.ppt = ppt
        this.teams = new TeamManager(this)
    }

    async startPicks(channel) {
        const awoo = () => {
            let txt = ""
            this.leaders.forEach((leader) => {
                txt = `${txt}${leader.user}`
            })
            return txt
        }
        channel.send(new MessageEmbed()
            .setTitle("Picking session has started")
            .addField("Leaders", awoo())
            .setColor("ORANGE")
            .setTimestamp()
            .setFooter(`You can cancel this event using this id: ${this.id}`)
        )
        for (let i = 0; !this.teams.full; i++) {
            for (let leader of this.leaders) {
                await new Promise((resolve) => {
                    const collector = new MessageCollector(channel, m => m.author.id === leader.discord)
                    channel.send(`${leader.user}, your turn! Ping a user in the queue!`)
                    collector.on('collect', message => {
                        let member
                        if (message.mentions.members) {
                            member = message.mentions.members.first()
                        } else {
                            return message.channel.send("That didn't ping anyone in the server! Try again")
                        }
                        if (member) {
                            const queue = this.client.queues.find(q => q.ppt === this.ppt && q.channel.members.get(leader.discord) && q.channel.members.get(member.user.id))
                            if (!queue) {
                                message.channel.send("You aren't in the same queue channel! Try again")
                                return
                            }
                            const player = this.client.players.get(member.user.id)
                            if (!player) {
                                member.voice.setChannel(null).catch(() => {})
                                message.channel.send("That user cannot be chosen, they haven't registered!")
                                return
                            }
                            const team = this.teams.find(t => t.leader.discord === leader.discord)
                            if (!team) {
                                message.channel.send("There was an error... you aren't in a team")
                                return
                            }
                            if (this.teams.getMember(player.discord)) {
                                message.channel.send("That player is already picked, choose another")
                                return
                            }
                            team.members.add(player)
                            collector.stop()
                            resolve()
                        }
                    })
                })
            }
        }
        return
    }

    cancel() {
        this.manager.delete(this.id)
        delete this
    }

    get leaders() {
        let leaders = []
        this.teams.forEach(team => {
            leaders.push(team.leader)
        })
        return leaders
    }

    end() {
        this.teams.winningTeam.members.forEach(player => {
            if (this.ppt === 2) {
                player.addPlay().addWin().setElo2(player.elo2 + player.rank.calcElo(true, this.teams.winningTeam.score, this.teams.losingTeam.score)).write()
            } else {
                player.addPlay().addWin().setElo4(player.elo4 + player.rank.calcElo(true, this.teams.winningTeam.score, this.teams.losingTeam.score)).write()
            }
        })
        this.teams.losingTeam.members.forEach(player => {
            if (this.ppt === 2) {
                player.addPlay().setElo2(player.elo2 + player.rank.calcElo(false, this.teams.winningTeam.score, this.teams.losingTeam.score)).write()
            } else {
                player.addPlay().setElo4(player.elo4 + player.rank.calcElo(false, this.teams.winningTeam.score, this.teams.losingTeam.score)).write()
            }
        })
        this.teams.deleteChannels()
        this.manager.delete(this.id)
        delete this
    }

    cancel() {
        this.manager.delete(this.id)
        delete this
    }
}

module.exports = Game