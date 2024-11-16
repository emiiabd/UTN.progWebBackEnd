import dotenv from 'dotenv'

//internamente va a leer el archivo .env y guardara los valosres en process.env
dotenv.config()

const ENVIROMENT = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GMAIL_PASS: process.env.GMAIL_PASS,
  GMAIL_USER: process.env.GMAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_USER: process.env.MAIL_USER,
  API_KEY_INTERN: process.env.API_KEY_INTERN,
  MYSQL: {
    USERNAME: process.env.MYSQL_USERNAME, // LOCAL -> 'root'
    HOST: process.env.MYSQL_HOST, // LOCAL -> localhost
    PASSWORD: process.env.MYSQL_PASSWORD, // LOCAL -> nada por que no hay
    DATABASE: process.env.MYSQL_DATABASE, // LOCAL -> nombre base de datos
  }
}

export default ENVIROMENT