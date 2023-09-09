const socket = io();

let usuario = '';

const caja = document.getElementById('caja');
const contenido = document.getElementById('contenido');

caja.addEventListener('change', (e) => {
    socket.emit('mensaje', {
        user: usuario,
        mensaje: e.target.value
    });
});

Swal.fire({
    title: 'Ingresa tu nombre',
    input: 'text',
    inputAttributes: {
    autocapitalize: 'off'
    },
    confirmButtonText: 'Ingresar',
    showLoaderOnConfirm: true,
    }).then((result) => {
        usuario = result.value;
    });

socket.on('nuevoMensaje', (data) => {
    const mensajes = data.map(({ user, mensaje }) => {
        return `<p>${user} dijo: ${mensaje}</p>`;
    });

    contenido.innerHTML = mensajes.join('');
});
