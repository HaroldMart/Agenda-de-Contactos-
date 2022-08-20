const boton = document.getElementById('button');
const correo = document.getElementById('correo');
const clave = document.getElementById('clave');

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = correo.value;
    const pass = clave.value;

    vacioLogin(email, pass);
});

function vacioLogin(email, pass) {
    if(email !== "" & pass !== "") {
        valEmail(email);

    } else {
        swal.fire({
        icon: 'info',
        text:'Completa los campos vacios',
        showConfirmButton: true,
        showClass: {
            popup: 'animate__animated animate__shakeX'
        },

        hideClass:{
            popup: 'animate__animated animate__fadeOut'

            }
        });
    };
};

function valEmail(valor){  
    const email = valor;

    re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if(!re.exec(valor)) {

        swal.fire({
            icon: 'info',
            text:'EL correo no es valido',
            showConfirmButton: true,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },

            hideClass:{
                popup: 'animate__animated animate__fadeOut'
                }
            });

        return false;

    } else {
       bloqueados(email);

        return true;
    };
};

function bloqueados(email) {
    if(email == "bryancastillo@gmail.com" || email == "cristiancriss83@gmail.com") {
        swal.fire({
            icon: 'warning',
            text:'Este usuario bloqueado',
            showConfirmButton: true,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
    
            hideClass:{
                popup: 'animate__animated animate__fadeOut'}
            });

    } else {
        swal.fire({
            icon: 'success',
            text:'El usuario inicio sesión con exito.',
            showConfirmButton: true,});

            correo.value = "";
            clave.value = "";
    
            setTimeout(ventana, 2000);
    }
}

function ventana() {
    window.location.href = "/index.html";
}