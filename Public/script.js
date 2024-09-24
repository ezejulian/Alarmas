document.getElementById('pruebaBtn').addEventListener('click', function() {
    document.getElementById('feedback').style.display = 'block';
});

document.getElementById('yesBtn').addEventListener('click', function() {
    const sucursal = document.getElementById('sucursal').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;

    const subject = `Prueba de Alarma - ${sucursal} ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Prueba Satisfactoria`;
    const body = `Sucursal: ${sucursal}\nNombre: ${nombre}\nApellido: ${apellido}\nFecha y Hora: ${new Date().toLocaleString()}\n\nLa prueba de alarma fue realizada satisfactoriamente.`;

    sendEmail('mariano.julian@oca.com.ar', subject, body);
});

document.getElementById('noBtn').addEventListener('click', function() {
    document.getElementById('details').style.display = 'block';
});

document.getElementById('sendSecurityBtn').addEventListener('click', function() {
    const sucursal = document.getElementById('sucursal').value;
    const details = document.getElementById('detailsText').value;

    const subject = `Prueba de Alarma Fallida - ${sucursal} ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    const body = `Detalles: ${details}\n\nSucursal: ${sucursal}\nFecha y Hora: ${new Date().toLocaleString()}`;

    sendEmail('mariano.julian@oca.com.ar', subject, body);
});

function sendEmail(to, subject, body) {
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to, subject, body })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar el correo');
    });
}
