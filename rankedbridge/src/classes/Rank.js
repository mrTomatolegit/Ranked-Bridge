class Rank {
    constructor(manager, id, name) {
        this.manager = manager
        this.id = id
        this.name = name
        this.min = 0
        this.win = 0
        this.loss = 0
    }

        /**
     * 
     * @param {boolean} win 
     * @param {number} score1 
     * @param {number} score2 
     */
    calcElo(win, score1, score2) {
        if (score1 === score2) {
            return 0
        }
        let allyScore
        let enemyScore
        
        if (win) {
            allyScore = score1 > score2 ? score1 : score2
            enemyScore = score1 > score2 ? score2 : score1
            if (allyScore - enemyScore === allyScore) {
                return this.win 
            } else {
                return this.win - 5
            }
        } else {
            allyScore = score1 > score2 ? score2 : score1
            enemyScore = score1 > score2 ? score1 : score2
            if (enemyScore - allyScore === enemyScore) {
                return -(this.loss + 5)
            } else {
                return -this.loss
            }
        }
    }

    setMin(int) {
        this.min = int
        return this
    }

    setWinAmount(int) {
        this.win = int 
        return this
    }

    setLossAmount(int) {
        this.loss = int
        return this
    }

    write() {
        return new Promise((resolve, reject) => {
            this.client.db.all(`SELECT * FROM ranks WHERE id = $id`, {
                $id: this.id
            }, (err, rows) => {
                if (err) return reject(err)
                if (rows.length < 1) {
                    this.client.db.all(`INSERT INTO ranks(id, name, minElo, win, loss) VALUES($id, $name, $minElo, $win, $loss)`, {
                        $id: this.id,
                        $name: this.name,
                        $minElo: this.min,
                        $win: this.win,
                        $loss: this.loss
                    }, (err) => {
                        if (err) return reject(err)
                        resolve(this)
                    })
                } else {
                    this.client.db.all(`UPDATE ranks SET name = $name, minElo = $minElo, win = $win, loss = $loss WHERE id = $id`, {
                        $name: this.name,
                        $minElo: this.min,
                        $win: this.win,
                        $loss: this.loss,
                        $id: this.id
                    }, (err) => {
                        if (err) return reject(err)
                        resolve(this)
                    })
                }
            })
        })
    }
}

module.exports = Rank