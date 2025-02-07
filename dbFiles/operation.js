const sql = require("mssql");
const config = require("./config");

const createUser = async (userData) => {
  try {
    console.log("Received User Data:", userData);

    if (!userData.name || !userData.password || !userData.email) {
      throw new Error("Missing required fields");
    }

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("name", sql.NVarChar, userData.name)
      .input("password", sql.NVarChar, userData.password)
      .input("email", sql.NVarChar, userData.email)
      .query(
        "INSERT INTO user1 (name, password, email) VALUES (@name, @password, @email)"
      );
    return result;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

const getUser = async (name, password) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("password", sql.NVarChar, password)
      .query("SELECT * FROM user1 WHERE name = @name AND password = @password");
    return result.recordset[0];
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

module.exports = { createUser, getUser };
