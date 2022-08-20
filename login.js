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
        
        valEmail(email)
        
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
}

function valEmail(valor){  
    
    re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if(!re.exec(valor)) {

        swal.fire({
            icon: 'info',
            text:'EL correo no es valido',
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
    
            hideClass:{
                popup: 'animate__animated animate__fadeOut'
                }
            });

        return false;

    } else {

        swal.fire({
            icon: 'success',
            text:'El usuario inicio sesión con exito.',
            showConfirmButton: false,
    
            });
    
            window.location.href = "/index.html";

        return true;
    }

}




