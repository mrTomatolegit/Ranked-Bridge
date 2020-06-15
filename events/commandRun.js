const { MessageEmbed } = require("discord.js")

module.exports = (client, message) => {
    const command = message.content.slice(client.config.prefix.length).trim().split(/ +/g).shift().toLowerCase()
    console.log(`${message.author.tag} &${message.author.id} => ${command}`)
    if (client.settings.commandLogs) {
        const commandLogs = client.channels.cache.get(client.settings.commandLogs)
        if (commandLogs) {
            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`${message.author} has run a command in ${message.channel}\n\`${message.content.length > 300 ? message.content.substring(0, 297) + "..." : message.content}\``)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(`User ID: ${message.author.id}`)
            commandLogs.send(embed)
        }
    }
}