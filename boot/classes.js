exports.load = (client, reload) => {
	client.Player = class Player {
		constructor(ID, UUID, written) {
			this.discordID = ID
			this.minecraftUUID = UUID

			this.written = written || false
		}

		write() {
			if (!this.written) {
				return new Promise((resolve, reject) => {
					client.db.all(`INSERT INTO registry(discordID, minecraftUUID) VALUES($discordID, $minecraftUUID)`, {
						$discordID: this.discordID,
						$minecraftUUID: this.minecraftUUID
					}, (err, out) => {
						if (err) {
							reject(err)
							return
						}

						this.written = true
						resolve(this)
					})
				})
			} else {
				client.db.all(`UPDATE registry SET discordID = $discordID, minecraftUUID = $minecraftUUID`, {
					$discordID: this.discordID,
					$minecraftUUID: this.minecraftUUID
				}, (err, out) => {
					if (err) {
						reject(err)
						return
					}
					resolve(this)
				})
			}
		}

		getIGN() {
			return new Promise(async (resolve, reject) => {
				resolve(await client.mojang.getName(this.minecraftUUID))
			})
		}

		get user() {	
			return client.users.cache.get(this.discordID)
		}

	}
}