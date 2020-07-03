class Queue {
    constructor(manager, id, ppt) {
        this.manager = manager
        this.client = manager.client
        this.ppt = ppt
        this.id = id
    }

    get channel() {
        return this.client.channels.cache.get(this.id)
    }

    write() {
        return new Promise((resolve, reject) => {
            this.client.db.all(`SELECT * FROM queues WHERE id = $id`, {
                $id: this.id
            }, (err, rows) => {
                if (err) return reject(err)
                if (rows.length < 1) {
                    this.client.db.all(`INSERT INTO queues(id, ppt) VALUES($id, $ppt)`, {
                        $id: this.id,
                        $ppt: this.ppt
                    }, (err) => {
                        if (err) return reject(err)
                        resolve(this)
                    })
                } else {
                    this.client.db.all(`UPDATE queues SET ppt = $ppt WHERE id = $id`, {
                        $id: this.id,
                        $ppt: this.ppt
                    }, (err) => {
                        if (err) return reject(err)
                        resolve(this)
                    })
                }
            })
        })
    }
}

module.exports = Queue