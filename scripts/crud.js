const link = "https://63657be3f711cb49d1feaa58.mockapi.io/";


let a;

let getJSONData = function (url) {
    let result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}
function modificando() {
    document.getElementById("results").innerHTML = "";
    getJSONData(link + "users").then(function (resultObj) {
        if (resultObj.status === "ok") {
            let numero = document.getElementById("inputPutId").value;
            let encontro = false;
            if (numero != "") {
                for (let o = 0; o < resultObj.data.length; o++) {
                    if (numero === resultObj.data[o].id) {
                        document.getElementById("inputPutNombre").value = resultObj.data[o].name;
                        document.getElementById("inputPutApellido").value = resultObj.data[o].lastname;
                        encontro = true;
                        a = resultObj.data[o].id;
                        document.getElementById("inputPutNombre").removeAttribute("disabled");
                    document.getElementById("inputPutApellido").removeAttribute("disabled");

                    }
                    else if(!encontro){
                        document.getElementById("inputPutNombre").setAttribute("disabled", "");
                        document.getElementById("inputPutApellido").setAttribute("disabled", "");
                        document.getElementById("inputPutNombre").value = "";
                        document.getElementById("inputPutApellido").value = "";
                        document.getElementById("results").innerHTML = `
                        <div class="alert alert-danger" role="alert">
                        Usuario no disponible
                        </div>
                        `
                    }
                }
            }
        }
    });
}


async function modificar() {
    formButton.disabled = true;
    await fetch(link + "users/" + a, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("inputPutNombre").value,
            lastname: document.getElementById("inputPutApellido").value
        })
    })
        .then(response => response.json())
        .then(respuesta => console.log(respuesta))

   
    document.getElementById("inputPutId").value = "";
    buscando();
}


function buscando() {
    getJSONData(link + "users").then(function (resultObj) {
        if (resultObj.status === "ok") {
            let numero = document.getElementById("inputGet1Id").value;
            let appendUsuarios = "";
            let listaUsuarios = resultObj.data;
            let encontrado = false;
            for (let i = 0; i < listaUsuarios.length; i++) {
                let usuario = listaUsuarios[i];
                if (numero === usuario.id) {
                    
                    document.getElementById("results").innerHTML = "";
                    document.getElementById("results").innerHTML = `
                <li class="list-group-item text-light bg-dark">
                <p>ID: ${usuario.id}</p>
                <p>NAME: ${usuario.name}</p>
                <p>LASTNAME: ${usuario.lastname}</p>
                </li>
                <hr>
                `
                encontrado = true;
                    
                }
                else if (numero === "") {
                    appendUsuarios += `
                    <li class="list-group-item text-light bg-dark">
                    <p>ID: ${usuario.id}</p>
                    <p>NAME: ${usuario.name}</p>
                    <p>LASTNAME: ${usuario.lastname}</p>
                    </li>
                    <hr>
                    `
                    document.getElementById("results").innerHTML = "";
                    document.getElementById("results").innerHTML = appendUsuarios;
                    encontrado = true;
                }
                else if (!encontrado){
                    document.getElementById("results").innerHTML = `
                        <div class="alert alert-danger" role="alert">
                        Usuario no disponible
                        </div>
                        `
                }
            }
        }
        document.getElementById("inputGet1Id").value = "";
    });

}

async function agregando() {
    formButton2.disabled = true;
    await fetch(link + "users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("inputPostNombre").value,
            lastname: document.getElementById("inputPostApellido").value
        })
    })
        .then(response => response.json())
        .then(respuesta => console.log(respuesta))

    document.getElementById("inputPostNombre").value = "";
    document.getElementById("inputPostApellido").value = "";
    buscando();
}
async function borrando() {
    formButton3.disabled = true;
    const id = document.getElementById("inputDelete").value;
    await fetch(link + "users/" + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(respuesta => console.log(respuesta))
    document.getElementById("inputDelete").value = "";
    buscando();
}

/////////////////////////////////////////////// validaciones
const formInput = document.getElementById("inputPutId");
const formButton = document.getElementById("btnPut");

// the default state is 'disabled'
formButton.disabled = true;

// alternative is to use "change" - explained below
formInput.addEventListener("keyup", buttonState);

function buttonState() {
    if (document.getElementById("inputPutId").value === "") {
        formButton.disabled = true; // return disabled as true whenever the input field is empty
    } else {
        formButton.disabled = false; // enable the button once the input field has content
    }
}
////////////////////////////////////////
const formInput2 = document.getElementById("inputPostNombre");
const formInputApel = document.getElementById("inputPostApellido");
const formButton2 = document.getElementById("btnPost");


// the default state is 'disabled'
formButton2.disabled = true;

// alternative is to use "change" - explained below
formInput2.addEventListener("keyup", buttonState2);
formInputApel.addEventListener("keyup", buttonState2);

function buttonState2() {
    if (document.getElementById("inputPostNombre").value === "" || document.getElementById("inputPostApellido").value === "") {
        formButton2.disabled = true; // return disabled as true whenever the input field is empty
    } else {
        formButton2.disabled = false; // enable the button once the input field has content
    }
}
////////////////////////////////
const formInput3 = document.getElementById("inputDelete");
const formButton3 = document.getElementById("btnDelete");

// the default state is 'disabled'
formButton3.disabled = true;

// alternative is to use "change" - explained below
formInput3.addEventListener("keyup", buttonState3);

function buttonState3() {
    if (document.getElementById("inputDelete").value === "") {
        formButton3.disabled = true; // return disabled as true whenever the input field is empty
    } else {
        formButton3.disabled = false; // enable the button once the input field has content
    }
}


//////////////////////////////////////////////////
////////////////////////////////////////
const formInput4 = document.getElementById("inputPutNombre");
const formInputApel2 = document.getElementById("inputPutApellido");
const formButton4 = document.getElementById("btnSendChanges");


// the default state is 'disabled'
formButton4.disabled = true;

// alternative is to use "change" - explained below
formInput4.addEventListener("keyup", buttonState4);
formInputApel2.addEventListener("keyup", buttonState4);

function buttonState4() {
    if (document.getElementById("inputPutNombre").value === "" || document.getElementById("inputPutApellido").value === "") {
        formButton4.disabled = true; // return disabled as true whenever the input field is empty
    } else {
        formButton4.disabled = false; // enable the button once the input field has content
    }
}
////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnGet1").addEventListener("click", buscando);
    document.getElementById("btnPost").addEventListener("click", agregando);
    document.getElementById("btnDelete").addEventListener("click", borrando);
    document.getElementById("btnPut").addEventListener("click", modificando);
});
