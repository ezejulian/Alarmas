const express = require('express');
const bodyParser = require('body-parser');
const SerialPort = require('serialport').SerialPort;
const path = require('path');

const app = express();
const port = 5000;

// Reemplaza con el puerto de tu Arduino (ej. COM3, /dev/ttyUSB0, /dev/ttyACM0)
const arduinoPort = 'COM9'; // Cambia esto según tu sistema
const serialPort = new SerialPort({
  path: arduinoPort,
  baudRate: 9600,
});

// Configura el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para manejar el encendido y apagado del LED
app.post('/led', (req, res) => {
  const command = req.body.command; // '1' para encender, '0' para apagar
  if (command === '1' || command === '0') {
    serialPort.write(command, (err) => {
      if (err) {
        return res.status(500).send('Error al enviar el comando');
      }
      res.send('Comando enviado: ' + command);
    });
  } else {
    res.status(400).send('Comando no válido');
  }
});

// Manejo de errores
serialPort.on('error', (err) => {
  console.error('Error en el puerto serie: ', err.message);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
