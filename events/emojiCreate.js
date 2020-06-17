const { MessageEmbed } = require("discord.js")

module.exports = async (client, emoji) => {
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            const author = await emoji.fetchAuthor()
            const embed = new MessageEmbed()
                .setDescription(`Emoji ${emoji} was added`)
                .setColor("GREEN")
                .setFooter(`Emoji ID: ${emoji.id}`)
                .addField("Emoji name", emoji.name)
                .addField("Added by", `${author} **${author.tag}**`)
                .setThumbnail(emoji.url)
                .setTimestamp()
            basicLogs.send(embed)
        }
    }
}