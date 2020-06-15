const sqlite = require("sqlite3")
const db = new sqlite.Database("./rbapi/data/Ranked-Bridge.db")
db.all(`SELECT * FROM settings`)
module.exports = db
console.log("aaa")