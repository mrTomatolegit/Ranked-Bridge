const { MessageEmbed } = require("discord.js")

module.exports = async (client, oldEmoji, newEmoji) => {
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            const author = await newEmoji.fetchAuthor()
            const embed = new MessageEmbed()
                .setDescription(`**Emoji ${newEmoji} was updated**\n${oldEmoji.name} => ${newEmoji.name}`)
                .addField("Emoji name", newEmoji.name)
                .addField("Added by", `${author} **${author.tag}**`)
                .setColor("ORANGE")
                .setFooter(`Emoji ID: ${newEmoji.id}`)
                .setThumbnail(newEmoji.url)
                .setTimestamp()
            basicLogs.send(embed)
        }
    }
}