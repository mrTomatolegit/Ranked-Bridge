const { MessageEmbed } = require("discord.js")

module.exports = (client, oldMember, newMember) => {
    if (client.settings.activityLogs) {
        const activityLogs = client.channels.cache.get(client.settings.activityLogs)
        if (activityLogs) {
            let newChannel = newMember.channel
            let oldChannel = oldMember.channel
            if (oldChannel == undefined && newChannel != undefined) {
                // Join channels
                const embed = new MessageEmbed()
                    .setAuthor(newMember.member.user.tag, newMember.member.user.displayAvatarURL())
                    .setColor("GREEN")
                    .setDescription(`📥 ${newMember.member.user} **joined the voice channel \`${newChannel.name}\`**`)
                    .setFooter(`User ID: ${newMember.member.user.id}`)
                    .setTimestamp()
                activityLogs.send(embed)
            } else
            if (newChannel == undefined){
                // Leave channels
                const embed = new MessageEmbed()
                .setAuthor(newMember.member.user.tag, newMember.member.user.displayAvatarURL())
                .setColor("RED")
                .setDescription(`📤 ${newMember.member.user} **left the voice channel \`${oldChannel.name}\`**`)
                .setFooter(`User ID: ${newMember.member.user.id}`)
                .setTimestamp()
            activityLogs.send(embed)
            } else 
            if (oldChannel.id !== newChannel.id) {
                // Change channels
                const embed = new MessageEmbed()
                    .setAuthor(newMember.member.user.tag, newMember.member.user.displayAvatarURL())
                    .setColor("ORANGE")
                    .setDescription(`🔁 ${newMember.member.user} **left the voice channel \`${oldChannel.name}\` and joined \`${newChannel.name}\`**`)
                    .setFooter(`User ID: ${newMember.member.user.id}`)
                    .setTimestamp()
                activityLogs.send(embed)
            }
        }
    }
}