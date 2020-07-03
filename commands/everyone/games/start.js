exports.info = {
    info: "Starts your game with the leaders you selected before",
    format: "",
    aliases: [],
    hidden: false
}
const { Client } = require("../../../rankedbridge")
const { Message, MessageEmbed } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<string>} args 
 */
exports.run = (client, message, args) => {
    const queue = client.queues.find(queue => queue.channel.members.get(message.author.id))

    if (!queue) {
        message.channel.send("You aren't in a game queue!")
        return
    }
    
    const leaders = client.randomLeaders.get(message.author.id)

    if (!leaders) {
        message.channel.send(new MessageEmbed()
            .setColor("RED")
            .setDescription(`:x: **You need to choose the leaders first!**\n\`${client.config.prefix}play\``)
            .setTimestamp()
            .setFooter("No leaders were chosen")
            )
        return
    }
    const game = client.games.new(queue.ppt)
    game.teams.setLeaders(leaders)
    game.startPicks(message.channel).then(() => {
        game.teams.forEach(team => {
            team.createChannel().then(channel => {
                team.sendToChannel(channel)
            })
        })
    })
}