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
                type = "voice channel"
            } else 
            if (isCategory) {
                type = "category"
            } else {
                type = "text channel"
            }
            const embed = new MessageEmbed()
                .setDescription(`**New ${type} \`${channel.name}\` was created**`)
                .setColor("GREEN")
                .setTimestamp()
                .setFooter("Channel ID: " + channel.id)
            basicLogs.send(embed)
        }
    }
}