const { MessageEmbed } = require("discord.js")

module.exports = (client, oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) return
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            const embed = new MessageEmbed()
                .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL())
                .setDescription(`Message edited in ${newMessage.channel} [Jump to Message](${newMessage.url})`)
                .addField("Before", oldMessage.content.length > 300 ? oldMessage.content.substring(0, 297) + "..." : oldMessage.content)
                .addField("After", newMessage.content.length > 300 ? newMessage.content.substring(0, 297) + "..." : newMessage.content)
                .setFooter(`User ID: ${newMessage.author.id}`)
                .setTimestamp()
            basicLogs.send(embed)
        }
    }
}