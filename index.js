const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Para usar variables de entorno

const app = express();
const port = 3000;

// Configura el transporte SMTP con nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

app.post('/send-email', (req, res) => {
    const { to, subject, body } = req.body;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al enviar el correo');
        }
        res.status(200).send('Correo enviado');
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
