import dotenv from 'dotenv';

dotenv.config();

const DB_Username = process.env.DB_USERNAME;
const DB_Password = process.env.DB_PASSWORD;
const DB_Url = process.env.DB_URL;
const DB_dbname = process.env.DB_DBNAME;

const port = process.env.PORT;
const DB_Path = `mongodb+srv://${DB_Username}:${DB_Password}@${DB_Url}/${DB_dbname}`;

export default { port, DB_Path };
