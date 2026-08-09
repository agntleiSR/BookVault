const sql = require("mssql/msnodesqlv8");

const dbConfig = {
    connectionString:
        "Driver={ODBC Driver 18 for SQL Server};" +
        "Server=(localdb)\\MSSQLLocalDB;" +
        "Database=BookVaultDB;" +
        "Trusted_Connection=Yes;" +
        "TrustServerCertificate=Yes;"
};

const connectDB = async () => {
    try {
        await sql.connect(dbConfig);

        console.log("✅ SQL Server connected successfully.");
        console.log("✅ Database: BookVaultDB");
    } catch (error) {
        console.error("❌ SQL Server connection failed:");
        console.error(error);
    }
};

module.exports = {
    sql,
    connectDB
};