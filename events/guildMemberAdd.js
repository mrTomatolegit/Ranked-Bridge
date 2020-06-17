const { MessageEmbed } = require("discord.js")

module.exports = (client, member) => {
    if (client.settings.joinLogs) {
        const joinLogs = client.channels.cache.get(client.settings.joinLogs)
        if (joinLogs) {
            const embed = new MessageEmbed()
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setDescription(`${member.user} has joined the server!`)
                .setColor("GREEN")
                .setTimestamp(member.user.createdAt)
                .setFooter(`User ID: ${member.user.id} | Created at:`)
            joinLogs.send(embed)
        }
    }
}