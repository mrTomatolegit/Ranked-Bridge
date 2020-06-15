const { Player, mojang } = require("../rbapi")
const { MessageEmbed } = require("discord.js")

module.exports = async (client, player) => {
    if (player instanceof Player && client.settings.appLogs) {
        const appLogs = client.channels.cache.get(client.settings.appLogs)
        if (appLogs) {
            const user = client.users.cache.get(player.discordID)
            const embed = new MessageEmbed()
                .setTitle("New user registered")
                .addField("Discord", user, true)
                .addField("Minecraft username", await mojang.getName(player.minecraftUUID), true)
                .setTimestamp()
                .setAuthor(user.tag, user.displayAvatarURL())
                .setColor("GREEN")
                .setFooter(`ID: ${player.discordID} | UUID: ${player.minecraftUUID}`)
            appLogs.send(embed)
        }
    }
}