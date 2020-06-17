const { MessageEmbed } = require("discord.js")

module.exports = (client, guild, user) => {
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            const embed = new MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL())
                .setDescription(`🤝 ${user.tag} was unbanned :o`)
                .setColor("GREEN")
                .setTimestamp()
                .setFooter(`User ID: ${user.id}`)
            basicLogs.send(embed)
        }
    }
}