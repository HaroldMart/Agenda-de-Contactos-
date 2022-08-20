const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const telefono = document.getElementById('telefono');
const direccion = document.getElementById('direccion');
const ul = document.querySelector('ul');
const agregar = document.getElementById('btn-agregar');
const vacio = document.querySelector('.vacio');
const main = document.querySelector('.main');
let contactos = []
let id = Date.now();

mostrar();


agregar.addEventListener("click", (e) => {
    e.preventDefault();
    const name = nombre.value;

    if (name !== "") {
        const lastName = apellido.value;
        const phone = telefono.value;
        const address = direccion.value;

        const contacto = {
            name,
            lastName,
            phone,
            address,
            id
        }

        contactos = [...contactos,contacto]
        localStorage.setItem("Contacts",JSON.stringify(contactos));
        const p = document.createElement('p');
        p.innerHTML = `<b>${name} ${lastName}<b/> <br/> ${phone} <br/> ${address}`;

        const div = document.createElement("div");
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = "https://img.icons8.com/fluency-systems-filled/35/000000/user.png";    
        img.className = 'photo';
        
        li.appendChild(img);
        li.appendChild(p);
        div.appendChild(desplegar());
        div.appendChild(borrar());
        li.appendChild(div);
        
    
        ul.appendChild(li);

        swal.fire({
            icon: 'success',
            text:'Contacto agregado correctamente',
            showConfirmButton: false,
        }); 

        nombre.value = "";
        apellido.value = "";
        telefono.value = "";
        direccion.value = "";
        ul.style.display = "flex";

        empty();
    } else{
        swal.fire({
            icon: 'info',
            text:'Los campos estan vacios',
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
            hideClass:{
                popup: 'animate__animated animate__fadeOut'
            }
        }); 
    }
})


function mostrar(){
    document.addEventListener('DOMContentLoaded',() => {
        contactos = JSON.parse(localStorage.getItem("Contacts"));
        contactos.forEach(contacto => {
            const p = document.createElement('p');
            const li = document.createElement('li');
            p.innerHTML = `<b>${contacto.name} ${contacto.lastName}</b> <br/> ${contacto.phone} <br/> ${contacto.address}`;
            const div = document.createElement("div");
            const img = document.createElement('img');
            img.src = "https://img.icons8.com/fluency-systems-filled/35/000000/user.png";
            img.className = 'photo';
            li.appendChild(img);
            li.appendChild(p);
            div.appendChild(desplegar());
            div.appendChild(borrar());
            li.appendChild(div);
            ul.appendChild(li);
        });
        empty();
    })
}

function desplegar() {
    const desplegado = document.getElementById('desplegado')
    const despliegue = document.createElement('button');
    despliegue.innerHTML = `<img src="https://img.icons8.com/windows/25/000000/resize-diagonal--v1.png"/>`;
    despliegue.className = "despliegueBTN";
    despliegue.addEventListener("click", (e) => {
        const target = e.target.parentNode.parentNode.parentNode;
        desplegado.innerHTML = `${target.textContent}`;

        console.log(target)
        console.log(desplegado)
        desplegado.style.display = 'flex'
       
    });

    return despliegue;
}


function borrar() {
    const borrarBtn = document.createElement("button");
    borrarBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="25"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>';
    borrarBtn.setAttribute("id", id);
    borrarBtn.className = "borrarBtn";
    borrarBtn.addEventListener("click", (e) => {
        const contacto = e.target.parentNode.parentNode.parentNode;
        ul.removeChild(contacto);
        let contactos = JSON.parse(localStorage.getItem('Contacts'));
        contactos.splice(e, 1);
        console.log(contactos);
        localStorage.setItem('Contacts', JSON.stringify(contactos));
        empty();

        swal.fire({
            icon: 'warning',
            text:'Contacto eliminado correctamente',
            showConfirmButton: false,
        });
    });
    
    return borrarBtn;
}


function empty() {
    const items = document.querySelectorAll("li");
        if (items.length == 0){
            vacio.style.display = "flex";
            ul.style.display = "none";
            main.style.backgroundColor = 'rgb(233, 233, 233)';
            main.style.boxShadow = 'box-shadow: 0px 0px 6px black;'
        } else{
            vacio.style.display = "none";
            main.style.backgroundColor = "transparent";
        }   
}

document.addEventListener("keyup", e => {
    if (e.target.matches('.buscar')){

        if(e.key === 'Escape')e.target.value = "";

        document.querySelectorAll('li').forEach(contacto => {
            contacto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?contacto.classList.remove('filtro')
                :contacto.classList.add('filtro');
        })
    }
    console.log(e.target.value)
})