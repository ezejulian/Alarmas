const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Para usar variables de entorno

const app = express();
const port = process.env.PORT || 3000; // Usar el puerto que Vercel asigna

// Configura el transporte SMTP con nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Public/index.html'); // Asegúrate de que 'public/index.html' exista
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('Public'));

// Ruta para enviar correos
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

// Escuchar en el puerto asignado
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
