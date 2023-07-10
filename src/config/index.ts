/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

dotenv.config();

const DB_Username = process.env.DB_USERNAME;
const DB_Password = process.env.DB_PASSWORD;
const DB_Url = process.env.DB_URL;
const DB_dbname = process.env.DB_DBNAME;

export const Access_Token_Secret = process.env.ACCESS_TOKEN_SECRET!;
export const Refresh_Token_Secret = process.env.REFRESH_TOKEN_SECRET!;

export const Client_URL = process.env.CLIENT_URL;

export const port = process.env.PORT;
export const DB_Path = `mongodb+srv://${DB_Username}:${DB_Password}@${DB_Url}/${DB_dbname}`;

export default { Client_URL, port, DB_Path, Access_Token_Secret, Refresh_Token_Secret };
