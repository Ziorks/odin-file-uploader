const pool = require("./pool");

//just an example
async function getAll() {
  const { rows } = await pool.query("SELECT * FROM table");
  return rows;
}

module.exports = { getAll };
