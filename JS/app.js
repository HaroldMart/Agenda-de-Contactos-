const names = document.getElementById("name");
const lastNames = document.getElementById("lastName");
const phones = document.getElementById("phone");
const addresss = document.getElementById("address");
const ul = document.querySelector("ul");
const btn_mode = document.querySelector("#toogle");
const add = document.getElementById("btn-add");
const empty = document.querySelector(".empty");
const main = document.getElementById("main");
let contacts = [];
let id = Date.now();

showContact();

add.addEventListener("click", (e) => {
  e.preventDefault();

  const name = names.value;
  const lastName = lastNames.value;
  const phone = phones.value;
  const address = addresss.value;

  if ((name !== "") & (lastName !== "") & (phone !== "") & (address !== "")) {
    validName(name, lastName, phone, address);
  } else {
    swal.fire({
      icon: "info",
      text: "Completa los campos vacios",
      showConfirmButton: true,
      showClass: {
        popup: "animate__animated animate__shakeX",
      },

      hideClass: {
        popup: "animate__animated animate__fadeOut",
      },
    });
  }
});

document.addEventListener("keyup", (e) => {
    if (e.target.matches(".search")) {
      if (e.key === "Escape") e.target.value = "";
  
      document.querySelectorAll("li").forEach((contact) => {
        contact.textContent.toLowerCase().includes(e.target.value.toLowerCase())
          ? contact.classList.remove("filter")
          : contact.classList.add("filter");
      });
    }
    });

  btn_mode.addEventListener("click", () => {
    const name = names.value;
    const lastName = lastNames.value;
    const phone = phones.value;
    const address = addresss.value;
  
    dark_mode(name, lastName, phone, address);
  });
  
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  function addContacts(name, lastName, phone, address) {
    const contact = {
      name,
      lastName,
      phone,
      address,
      id,
    };
  
    contacts = [...contacts, contact];
    localStorage.setItem("Contacts", JSON.stringify(contacts));
    const p = document.createElement("p");
    p.innerHTML = `<b>${name} ${lastName}<b/> <br/> ${phone} <br/> ${address}`;
  
    const div = document.createElement("div");
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = "https://img.icons8.com/fluency-systems-filled/35/000000/user.png";
    img.className = "photo";
  
    li.appendChild(img);
    li.appendChild(p);
    div.appendChild(deleteContact());
    li.appendChild(div);
    ul.appendChild(li);
  
    swal.fire({
      icon: "success",
      text: "Contacto agregado correctamente",
      showConfirmButton: true,
      timer: 3000,
    });
  
    names.value = "";
    lastNames.value = "";
    phones.value = "";
    addresss.value = "";
    ul.style.display = "flex";
    emptyFunction();
  }

function showContact() {
  document.addEventListener("DOMContentLoaded", () => {
    contacts = JSON.parse(localStorage.getItem("Contacts")) || [];
    contacts.forEach((contact) => {
      const p = document.createElement("p");
      const li = document.createElement("li");
      p.innerHTML = `<b>${contact.name} ${contact.lastName}</b> <br/> ${contact.phone} <br/> ${contact.address}`;
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src =
        "https://img.icons8.com/fluency-systems-filled/35/000000/user.png";
      img.className = "photo";
      li.appendChild(img);
      li.appendChild(p);
      div.appendChild(deleteContact());
      li.appendChild(div);
      ul.appendChild(li);
    });

    emptyFunction();
  });
}

function deleteContact() {
  const deleteBtn = document.createElement("button");

    deleteBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="25"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>';
    deleteBtn.setAttribute("id", id);
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", (e) => {
    const contact = e.target.parentNode.parentNode.parentNode;
    ul.removeChild(contact);
    let contacts = JSON.parse(localStorage.getItem("Contacts"));
    contacts.splice(e, 1);
    localStorage.setItem("Contacts", JSON.stringify(contacts));
    emptyFunction();

    swal.fire({
      icon: "warning",
      text: "Contacto eliminado correctamente",
      showConfirmButton: true,
      timer: 3000,
    });
  });

  return deleteBtn;
}

function emptyFunction() {
  const items = document.querySelectorAll("li");
  if (items.length == 0) {
    empty.style.display = "flex";
    ul.style.display = "none";
    main.style.boxShadow = "box-shadow: 0px 0px 6px black;";

    const body = document.querySelector("body");

    if (body.className === "dark") {
      main.style.backgroundColor = "#15323e";
      main.style.color = "white";
    } else {
      main.style.backgroundColor = "rgb(232, 232, 232)";
      main.style.color = "black";
    }
  } else {
    empty.style.display = "none";
    main.style.backgroundColor = "transparent";
  }
}

function validName(name, lastName, phone, address) {
  const re =
    /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;

  if (!re.exec(name)) {
    isNa_phone(name, lastName, phone, address);
  } else {
    swal.fire({
      icon: "warning",
      text: "El nombre de usuario no es valido",
      showConfirmButton: true,
      showClass: {
        popup: "animate__animated animate__shakeX",
      },

      hideClass: {
        popup: "animate__animated animate__fadeOut",
      },
    });
  }
}

function dark_mode(name, lastName, phone, address) {
  document.body.classList.toggle("dark");
  emptyFunction();

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "true");
  } else {
    localStorage.setItem("dark-mode", "false");
  }
}

function isNa_phone(name, lastName, phone, address) {
  const phoneVal = phone;
  if (isNaN(phoneVal)) {
    swal.fire({
      icon: "info",
      text: "Solo se permiten numeros en el campo de telefono",
      showConfirmButton: true,
      timer: 3000,
    });
  } else {
    addContacts(name, lastName, phone, address);
  }
}
