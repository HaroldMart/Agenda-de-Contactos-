const boton = document.querySelector('.button')

boton.addEventListener("click", (e) => {
    e.preventDefault();

    swal.fire({
    icon: 'success',
    text:'El usuario inicio sesión con exito.',
    showConfirmButton: false,

    });

    window.location.href = "/index.html";
});


    
  




// swal.fire({
//     icon: 'info',
//     text:'Los campos estan vacios',
//     showConfirmButton: false,
//     showClass: {
//         popup: 'animate__animated animate__shakeX'
//     },
//     hideClass:{
//         popup: 'animate__animated animate__fadeOut'
//     }
// });