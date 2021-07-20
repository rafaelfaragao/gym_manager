const { age, date } = require("../../lib/utils")
const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`
          SELECT instructors.*, count(members) AS total_students 
          FROM instructors 
          LEFT JOIN members ON (members.instructor_id = instructors.id) 
          GROUP BY instructors.id 
          ORDER BY total_students DESC`, function (err, results) {
      if(err) throw `Database Error! ${err}`
		
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
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  find(id, callback){
    db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function(err, results){
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  update(data, callback){
    const query = `
      UPDATE instructors SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        services=($5) 
      WHERE id = $6
    `

    db.query(query, data, function (err, results){
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  delete(id, callback){
    db.query(`DELETE FROM instructors WHERE id = $1`, [id], function (err, results){
      if(err) throw `Database Error! ${err}`

      callback()
    })
  }
}