const { MessageEmbed } = require("discord.js")

module.exports = async (client, emoji) => {
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            const embed = new MessageEmbed()
                .setDescription(`**Emoji** ${emoji} **was removed**`)
                .setColor("RED")
                .setFooter(`Emoji ID: ${emoji.id}`)
                .addField("Emoji name", emoji.name)
                .setThumbnail(emoji.url)
                .setTimestamp()
            basicLogs.send(embed)
        }
    }
}