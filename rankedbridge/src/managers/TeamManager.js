const { Collection } = require("discord.js");
const Team = require("../classes/Team");
const Player = require("../classes/Player")

class TeamManager extends Collection{
    constructor(game) {
        super()
        this.game = game
        this.ppt = game.ppt
        this.new()
        this.new()
    }

    unusedID() {
        let awoo = null
        for (let i = 0; i < 1000000000; i++) {
            if (!this.get(i)) {
                awoo = i
                break
            }
        }
        return awoo
    }
    /**
     * 
     * @param {Array<Player>} array 
     */
    setLeaders(array) {
        array.forEach((player, index) => {
            this.get(index).setLeader(player)
        })
    }

    new() {
        const unusedID = this.unusedID()
        this.set(unusedID, new Team(this.game, unusedID))
        return this.get(unusedID)
    }

    getMember(id) {
        return this.find(t => t.members.get(id))
    }

    get full() {
        return this.find(t => !t.isFull) ? false : true
    }

    get winningTeam() {
        let winner = null
        this.forEach(team => {
            if (winner) {
                if (team.score > winner.score) {
                    winner = team
                }
            } else {
                winner = team
            }
        })
        return winner
    }

    get losingTeam() {
        let loser = null
        this.forEach(team => {
            if (loser) {
                if (team.score < loser.score) {
                    loser = team
                }
            } else {
                loser = team
            }
        })
        return loser
    }

    deleteChannels() {
        this.forEach(async team => {
            if (team.voiceChannel) {
                await team.voiceChannel.delete()
            }
        })
    }
}

module.exports = TeamManager