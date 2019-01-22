const nodemailer = require('nodemailer');

/**
 * Exemplo de uso:
 * 
 * const configMailer = require('../../config/nodemailer');
 * configMailer.sendMailGmail(sendTo, sendSubject, sendBody).then(info => {
      res.json(info);
    }).catch(e => next(e));
 */

module.exports.sendMailGmail = (sendTo, sendSubject, sendBody) => {
  try {
    return new Promise((resolve, reject) => {

      const email = 'Colocar email aqui';
      const password = 'Colocar senha aqui';

      const transporterWithGmail = nodemailer.createTransport(
        {
          service: 'gmail',
          auth: {
            user: email,
            pass: password
          },
          secure: true
        });

      const mailOptions = {
        from: `iSkyNote Mailer <${email}>`, // sender address
        to: sendTo, // list of receivers
        subject: sendSubject, // Subject line
        html: sendBody, // plain text body
        headers: {
          "x-priority": "1",
          "x-msmail-priority": "High",
          importance: "high"
      }
      };

      transporterWithGmail.sendMail(mailOptions, (err, info) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(info.response);
        }
      });

      // email com anexo;
      // var email = {
      //     from: 'usuario@gmail.com',
      //     to: 'alanhoffmeister@gmail.com',
      //     subject: 'Veja os anexos',
      //     html: 'Estou mandando alguns anexos para testar.'
      //     attachments: [{ // Basta incluir esta chave e listar os anexos
      //       filename: 'boleto.pdf', // O nome que aparecerá nos anexos
      //       path: 'servidor/boletos/boleto_gerado1234.pdf' // O arquivo será lido neste local ao ser enviado
      //     }]
      //   };
    });
  } catch (error) {
    next(error);
  }
};
