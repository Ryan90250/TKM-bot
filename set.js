const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUNITi9wTlNXUXVTNmhSeFFNbGh5bHNocTNxL043OUNwaFJZME9RL0dGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTVLYURvT1hBSmhTbjJqcDFFTE10YXEwa2JveHNROUlwRUlRTHN6Qm5CZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SVZaWndRSysyM2VJNy9ZSVhIVSszUDJ4c295a0xZOXdOSUoyRHF2WTJvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTXdlYkZlNmdEZ0ZKcjVQVVFKV01JT3JadmNyV1prSHFoQmxuek1iQ0hJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlDemJvWHYzeDlvUmpJRG1KMGtsTnV3dmZtZG1xWkpQeHdyNUc0Y0RuWFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImthcnhkL3drdDlJbzRzUHNKc29wWTZBQ1lVblVMRHA3OFRrNTJtalZBalk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU9hemdrdlJjbVl4M1NnUmNmWnBOMjUycjFNY3VFaWRUaWxFUDVOY2VIYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN2poZE1wc01iVC92MG83ajBXR25oZ0NjYUhiQXBwcWJCb2lIWGlRMmFpdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVxWGg0ZTVZL2hCNXRNd1FkZ1JZb3NnNVczYmJ6VlUzSFp4UjZrVmxqQUE5SS9iTGtOMy9TNEdqYW1UdVpZU2hYbVFjNnN5L0tjU2xDL2F6YXRibGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM0LCJhZHZTZWNyZXRLZXkiOiJGS2M2VnV4R01KQ2FRMC9sYXJzK0RMVjlmcXJwRGx2Zk9nWXFpOWF1dXlFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ3WGd3NW5qTlFEbXVJQXhoN2R6UFNnIiwicGhvbmVJZCI6IjUyNDU4NTMxLWIzOWUtNDFmOC05ZDVmLTYwZTM5ZjBlNWYxMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJVi9CRDc3SmIxWEFic2wxaU5IQktYbnYwYkE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiLzNmN0NPM0lNRyt3Z240QkM0bjB2ZStHbis0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjczTjdBWExKIiwibWUiOnsiaWQiOiIyNjM3ODUwNDE0MTY6MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSUhKNHZVRkVOVHB6YjhHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieTQ3OG1TS0U0dlRJR1JIbEZEaEp4eGZUdGNrQmlGY0ZxZmlLUXQ0VFEzWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQnhlSEtlZ1ZZVUpvb3gxUnIrNFBJa2V4SUhWQTBPanNZcnhrdXBPaDNRdVdCMGRMN3lhaGtuc245dmxMekNtMVhUbGRCT1ppazhwNldkeVNEWXh2QlE9PSIsImRldmljZVNpZ25hdHVyZSI6InhJR0dGSjk4T3kvSHFtcll5dFlHZktCMHpCQWIzeGF2YlFRZUEzblVBT1B3WXFkU3VpQzZnczNzaTJnUk9PN1hpcWdiUHcwTy8xUmxFT1RtR3BBbmhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg1MDQxNDE2OjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY3VPL0praWhPTDB5QmtSNVJRNFNjY1gwN1hKQVloWEJhbjRpa0xlRTBOMiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDAwODQxOX0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
