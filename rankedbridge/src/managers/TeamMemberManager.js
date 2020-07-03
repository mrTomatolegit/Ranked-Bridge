const { Collection } = require("discord.js")

class TeamMemberManager extends Collection{
    constructor(team) {
        super()
        this.team = team
        this.client = team.client
    }

    add(player) {
        this.set(player.discord, player)
        return this.get(player.discord)
    }
}

module.exports = TeamMemberManager