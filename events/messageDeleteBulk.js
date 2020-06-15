const { MessageEmbed } = require("discord.js")

module.exports = (client, messages) => {
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(messages.first().guild.name)
                .setDescription(`Bulk Delete in ${messages.first().channel}, ${messages.size} messages deleted`)
                .setTimestamp()
            basicLogs.send(embed)
        }
    }
}