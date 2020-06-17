module.exports = (client, member) => {
    if (client.settings.joinLogs) {
        const joinLogs = client.channels.cache.get(client.settings.joinLogs)
        if (joinLogs) {
            const embed = new MessageEmbed()
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setDescription(`${member.user} has left the server!`)
                .setColor("RED")
                .setTimestamp(member.joinedAt)
                .setFooter(`User ID: ${member.user.id} | Joined at:`)
            joinLogs.send(embed)
        }
    }
}