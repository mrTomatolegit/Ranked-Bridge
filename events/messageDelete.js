const { MessageEmbed } = require("discord.js")

module.exports = (client, message) => {
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`**Message sent by** ${message.author} **deleted in** ${message.channel}\n${message.content.length > 300 ? message.content.substring(0, 297) + "..." : message.content}`)
                .setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`)
                .setTimestamp()
            basicLogs.send(embed)
        }
    }
}