const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
});

export const _getTobaccos = (tasteName) => {
  return connection.promise()
    .query(
      `
        SELECT tb.name, tb.id, tb.strength FROM tobaccos tb 
        INNER JOIN tobacco_taste tt ON tb.id = tt.tobacco_id
        INNER JOIN tastes t ON t.id = tt.taste_id
        WHERE t.name = ?
      `, 
      [tasteName]
    )
    .then(([rows]) => {
      return rows;
    })
    .catch(console.log) //TODO: log to error.log
};


