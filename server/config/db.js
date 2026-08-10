const sql = require("mssql/msnodesqlv8");

const dbConfig = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};" +
    "Server=(localdb)\\MSSQLLocalDB;" +
    "Database=BookVaultDB;" +
    "Trusted_Connection=Yes;" +
    "TrustServerCertificate=Yes;",
};

let pool;

const connectDB = async () => {
  try {
    pool = await sql.connect(dbConfig);

    console.log("SQL Server connected successfully.");
    console.log("Database: BookVaultDB");

    return pool;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

const getDB = () => pool;

module.exports = {
  sql,
  connectDB,
  getDB,
};