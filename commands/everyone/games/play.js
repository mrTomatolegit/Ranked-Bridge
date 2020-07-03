exports.info = {
    info: "Get random leaders from your queue!",
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

    if (queue.channel.members.size < queue.ppt * 2) {
        message.channel.send(`You need ${queue.ppt * 2} players in that voice channel to start! (${queue.ppt * 2 - queue.channel.members.size} more)`)
        return
    }
    const leaders = Array.from(queue.channel.members.random(queue.ppt))
    const leaderPlayers = []
    leaders.forEach(leader => {
        leaderPlayers.push(client.players.get(leader.id))
    })
    message.channel.send(new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription(`**Leaders for a ${queue.ppt}v${queue.ppt} bridge game**\n` + leaders.join("\n"))
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`You can start the game using ${client.config.prefix}start`)
    )
    client.randomLeaders.set(message.author.id, leaderPlayers)
}