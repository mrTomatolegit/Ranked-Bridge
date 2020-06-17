const { MessageEmbed } = require("discord.js")

module.exports = (client, channel, date) => {
    if (channel.type === "dm") return
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            const embed = new MessageEmbed()
                .setDescription(`A message was pinned in ${channel}`)
                .setColor("GREEN")
                .setTimestamp(date)
                .setFooter('Channel ID: ' + channel.id)
            basicLogs.send(embed)
        }
    }
}