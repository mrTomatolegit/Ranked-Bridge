const { mojang, Player } = require("../../../rbapi")

exports.info = {
    info: "Registers your IGN in the database",
    format: "<MinecraftIGN>",
    aliases: ["reg"],
    hidden: false
}

exports.run = async (client, message, [IGN]) => {

    if (!IGN) {
        message.channel.send("You need to give me a Minecraft IGN?")
        return
    }
    const uuid = await mojang.getUUID(IGN)
    console.log(uuid)
    if (!uuid) {
        message.channel.send("That name does not exist")
        return
    }
    client.keymanager.next().getPlayer(uuid).then(player => {
        console.log(player)
        const tag = player.socialMedia.links.DISCORD
        if (!tag) {
            message.channel.send("Please link your Discord account with your in-game account. If you cannot or don't understand, ask a staff member for assistance or view this message")
            return
        } else
        if (message.author.tag !== tag) {
            message.channel.send("The Discord tag associated with this player is not the same as your current tag")
            return
        }
        const playerObject = new Player(message.author.id, uuid)
        playerObject.write().then(() => {
            message.member.setNickname(`[${playerObject.elo2}] [${playerObject.elo4}] ${player.displayname}`).catch(() => {
                client.error("Could not set " + message.author.tag + " => " + message.author.id + "'s nickname")
            })
            // Give the roles
            message.delete()
            client.emit("playerRegistered", playerObject)
        }).catch(e => {
            message.channel.send("Your name is correct... but there was an error on our side. Try again later?")
            client.error(e)
        })
    }).catch((e) => {
        message.channel.send("There was an error with Hypixel! oops...")
        client.error(e)
    })
}