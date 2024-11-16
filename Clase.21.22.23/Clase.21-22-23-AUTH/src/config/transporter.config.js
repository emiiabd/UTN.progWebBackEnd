import nodemailer from 'nodemailer';
import ENVIROMENT from './enviroment.config.js';

/* Logica de configuracion de nuestro email */

const transporter = nodemailer.createTransport({
  host: "mail.s101.com.ar",
  port: 465,
  secure: true, // true for port 465, false for other port
  auth: {
    user: ENVIROMENT.MAIL_USER,
    pass: ENVIROMENT.MAIL_PASS
  }
})


export default transporter