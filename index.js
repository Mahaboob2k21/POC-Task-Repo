const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  const connection = await mysql.createConnection({
    host: 'your-rds-endpoint',
    user: 'your-database-username',
    password: 'your-database-password',
    database: 'your-database-name',
  });

  try {
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log('Query Results:', rows);

    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error('Error executing query:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error connecting to the database' }),
    };
  } finally {
    await connection.end();
  }
};
