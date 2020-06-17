const { MessageEmbed } = require("discord.js")

module.exports = (client, channel) => {
    if (channel.type === "dm") return
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            let type = ""

            const isVoiceChannel = channel.type === "voice"
            const isCategory = channel.type === "category"

            if (isVoiceChannel) {
                type = "Voice channel"
            } else 
            if (isCategory) {
                type = "Category"
            } else {
                type = "Text channel"
            }

            const embed = new MessageEmbed()
                .setDescription(`**${type} \`${channel.name}\` was deleted**`)
                .setColor("RED")
                .setTimestamp()
                .setFooter("Channel ID: " + channel.id)
            basicLogs.send(embed)
        }
    }
}