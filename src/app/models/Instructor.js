const { age, date } = require("../../lib/utils")
const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM instructors`, function (err, results) {
      if (err) return res.send("Database error!")

      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
            `

    db.query(query, data, function (err, results) { //o data são os Values da query
      if (err) return res.send("Databse Error!")

      callback(results.rows[0])
    })
  },
  find(id, callback){
    db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function(err, results){
      if(err) return res.send("Database Error!")

      callback(results.rows[0])
    })
  }
}