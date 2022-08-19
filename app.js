const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const telefono = document.getElementById('telefono');
const direccion = document.getElementById('direccion');
const ul = document.querySelector('ul');
const agregar = document.getElementById('btn-agregar')
const vacio = document.querySelector('.vacio');
const div = document.querySelector("li")
let contactos = []
let id = Date.now();

mostrar();


agregar.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nombre.value;
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

    const li = document.createElement('li');
    li.appendChild(p);
    li.appendChild(desplegar());
    ul.appendChild(li);

    nombre.value = "";
    apellido.value = "";
    telefono.value = "";
    direccion.value = "";
    ul.style.display = "flex";
})


function mostrar(){
    document.addEventListener('DOMContentLoaded',() => {
        contactos = JSON.parse(localStorage.getItem("Contacts"));
        contactos.forEach(contacto => {
            const p = document.createElement('p');
            const li = document.createElement('li');
            p.innerHTML = `<b>${contacto.name} ${contacto.lastName}</b> <br/> ${contacto.phone} <br/> ${contacto.address}`;
            li.appendChild(p);
            li.appendChild(desplegar());
            ul.appendChild(li);

            let items = document.querySelectorAll('li');
            if (items.length == 0) {
                vacio.style.display = "flex";
                ul.style.display = "none";
            }
        });

        console.log(contactos)
    })
}

function desplegar(e){
    const despliegue = document.createElement('button');
    despliegue.innerHTML = `<img src="https://img.icons8.com/windows/25/000000/resize-diagonal--v1.png"/>`;
    despliegue.className = "despliegueBTN";

    return despliegue;
}
