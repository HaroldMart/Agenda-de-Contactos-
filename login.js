const boton = document.getElementById('button');
const correo = document.getElementById('correo');
const clave = document.getElementById('clave');


boton.addEventListener("click", (e) => {
    e.preventDefault();

    const email = correo.value;
    const pass = clave.value;

    if(email !== "" & pass !== "") {
        
        swal.fire({
        icon: 'success',
        text:'El usuario inicio sesión con exito.',
        showConfirmButton: false,

        });

        window.location.href = "/index.html";

    } else {

        swal.fire({
        icon: 'info',
        text:'Completa los campos vacios',
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__shakeX'
        },

        hideClass:{
            popup: 'animate__animated animate__fadeOut'
            }
        });
    }
});





