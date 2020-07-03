exports.info = {
    info: "Cancel a game you ~start-ed",
    format: "[Game ID]",
    aliases: [],
    hidden: false
}

exports.run = (client, message, [gameID]) => {
    const game = client.games.get(partseInt(gameID)) || client.games.find(g => {
        let find = client.randomLeaders.get(message.author.id)
        if (!find) return null
        let found = null
        g.teams.forEach(team => {
            const L = find.find(f => f.user.id === team.leader.discord) 
            if (L) found = L
        })
        return found
    })

    if (!game) {
        message.channel.send("You did not mention a game id")
        return
    }
}