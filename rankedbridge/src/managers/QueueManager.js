const { Collection } = require("discord.js")
const Queue = require("../classes/Queue")

class QueueManager extends Collection {
    constructor(client) {
        super()
        this.client = client
    }

    add(id, ppt) {
        this.set(id, new Queue(this, id, ppt))
        return this.get(id)
    }

    fetch() {
        return new Promise((resolve, reject) => {
            this.client.db.all(`SELECT * FROM queues`, (err, rows) => {
                if (err) return reject(err)

                rows.forEach(row => {
                    this.add(row.id, row.ppt)
                })

                resolve(this)
            })
        })
    }

    get length() {
        return this.size
    }
}

module.exports = QueueManager