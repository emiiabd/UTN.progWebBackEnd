import transporter from "../config/transporter.config.js"

const mailValidator = (mail) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)

const sendEmail = async (options) =>{
  try{
    const response = await transporter.sendMail(options)
    //console.log(response)
    
    /* if(response.accepted.length == 0){
    } */
    
    /* 
    EJEMPLO DE RESPUESTA
    {
    accepted: [ 'vllcmilei@gmail.com' ],
    rejected: [],
    ehlo: [
      'SIZE 35882577',
      '8BITMIME',
      'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
      'ENHANCEDSTATUSCODES',
      'PIPELINING',
      'CHUNKING',
      'SMTPUTF8'
    ],
    envelopeTime: 590,
    messageTime: 532,
    messageSize: 278,
    response: '250 2.0.0 OK  1729000326 d2e1a72fcca58-71e774a2a64sm1268127b3a.123 - gsmtp',
    envelope: { from: '', to: [ 'vllcmilei@gmail.com' ] },
    messageId: '<be052c6b-b962-5fd5-2650-f262eaadc9b9@localhost>'
    }
    */
  return
  }
  catch(err){
    //esto es para poder hacer debbug (trackear el error)
    console.error('Error al enviar mail: ', err)
    throw err
  }
}


/* 
sendEmail({
  html: 'hola desde options node js',
  subject: 'objeto de prueba',
  to: 'vllcmilei@gmail.com'
})
*/
export {
  sendEmail,
  mailValidator
}
