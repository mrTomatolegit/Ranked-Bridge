const { MessageEmbed } = require("discord.js")

module.exports = (client, oldChannel, newChannel) => {
    if (newChannel.type === "dm") return
    if (client.settings.basicLogs) {
        const basicLogs = client.channels.cache.get(client.settings.basicLogs)
        if (basicLogs) {
            let descStart = ""
            let updatedStuff = ""
            const isVoiceChannel = channel.type === "voice"
            const isCategory = channel.type === "category"

            if (isVoiceChannel) {
                descStart = `**Voice channel \`${newChannel.name}\` was updated**`
                if (oldChannel.name !== newChannel.name) {
                    updatedStuff = updatedStuff + `**Name**: ${oldChannel.name} => ${newChannel.name}\n`
                }
                if (oldChannel.bitrate !== newChannel.bitrate) {
                    updatedStuff = updatedStuff + `**Bitrate**: ${oldChannel.bitrate} => ${newChannel.bitrate}\n`
                }
                if (oldChannel.parent.id !== newChannel.parent.id) {
                    updatedStuff = updatedStuff + `**Category**: ${oldChannel.parent.name || "none"} => ${newChannel.parent.name || "none"}\n`
                }
                if (oldChannel.position !== newChannel.position) {
                    updatedStuff = updatedStuff + `**Position**: ${oldChannel.position} => ${newChannel.position}\n`
                }
                if (oldChannel.userLimit !== newChannel.userLimit) {
                    updatedStuff = updatedStuff + `**User limit**: ${oldChannel.userLimit} => ${newChannel.userLimit}\n`
                }
                if (!oldChannel.permissionOverwrites.equals(newChannel.permissionOverwrites)) {
                    updatedStuff = updatedStuff + `**Permission overwrites updated**\n`
                }
            } else 
            if (isCategory) {
                descStart = `**Category \`${newChannel.name}\` was updated**`
                if (oldChannel.name !== newChannel.name) {
                    updatedStuff = updatedStuff + `**Name**: ${oldChannel.name} => ${newChannel.name}\n`
                }
                if (oldChannel.position !== newChannel.position) {
                    updatedStuff = updatedStuff + `**Position**: ${oldChannel.position} => ${newChannel.position}\n`
                }
                if (oldChannel.permissionOverwrites.equals(newChannel.permissionOverwrites)) {
                    updatedStuff = updatedStuff + `**Permission overwrites updated**\n`
                }
            } else {
                descStart = `**Text channel \`${newChannel.name}\` was updated**`
                if (oldChannel.name !== newChannel.name) {
                    updatedStuff = updatedStuff + `**Name**: ${oldChannel.name} => ${newChannel.name}\n`
                }
                if (oldChannel.nsfw !== newChannel.nsfw) {
                    updatedStuff = updatedStuff + `**NSFW**: ${oldChannel.nsfw} => ${newChannel.nsfw}\n`
                }
                if (oldChannel.parent.id !== newChannel.parent.id) {
                    updatedStuff = updatedStuff + `**Category**: ${oldChannel.parent.name || "none"} => ${newChannel.parent.name || "none"}\n`
                }
                if (oldChannel.position !== newChannel.position) {
                    updatedStuff = updatedStuff + `**Position**: ${oldChannel.position} => ${newChannel.position}\n`
                }
                if (oldChannel.topic !== newChannel.topic) {
                    updatedStuff = updatedStuff + `**Topic**: ${oldChannel.topic} => ${newChannel.topic}\n`
                }
                if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
                    updatedStuff = updatedStuff + `**Rate limit**: ${oldChannel.rateLimitPerUser} => ${newChannel.rateLimitPerUser}\n`
                }
                if (oldChannel.permissionOverwrites.equals(newChannel.permissionOverwrites)) {
                    updatedStuff = updatedStuff + `**Permission overwrites updated**\n`
                }
            }
            const embed = new MessageEmbed()
                .setDescription(`${descStart}\n\n${updatedStuff}`)
                .setColor("ORANGE")
                .setFooter(`Channel ID: ${newChannel.id}`)
                .setTimestamp()
            basicLogs.send(embed)
        }
    }
}