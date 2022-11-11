const formulario = document.getElementById('formulario')
const datatable = document.getElementById('table-patentes');

const arrayPatentes = []

const createTable = () => {
    let storage = JSON.parse(localStorage.getItem('patentes'))
    if (localStorage.getItem("patentes") === null) {
        datatable.innerHTML = `<p> No hay patentes en la base de datos.</p>`
    } else {
        datatable.innerHTML = "<tr><th>Patente</th></tr>"
        for (let i = 0; i < storage.length; i++) {
            let fila = "<tr><td>" + storage[i].patente + "</tr></td>";
            datatable.innerHTML += fila;
        }
        return datatable;
    }
}

const altaPatente = (patente) => {
    const formData = { patente };
    arrayPatentes.push(formData);
    if (localStorage.getItem("patentes") === null) {
        localStorage.setItem("patentes", JSON.stringify(arrayPatentes))
    } else {
        const storage = JSON.parse(localStorage.getItem("patentes"))
        if (!estaVacia(patente) && esValida(patente) && !esPatenteRepetida(patente)) {
            storage.push(formData);
            localStorage.setItem("patentes", JSON.stringify(storage))
        }
    }
}

const editarPatente = (patente) => {
    let storage = JSON.parse(localStorage.getItem("patentes"));
    if (!estaVacia(patente) && esValida(patente)) {
        let resultado = storage.findIndex(elem => {
            return elem.patente === patente
        });

        if (resultado === -1) {
            alert("No existe la patente ingresada.")
            document.querySelector("#text-patente").focus();
        } else {
            var update = window.prompt("Ingrese la nueva patente:", patente);
            if (!estaVacia(update) && esValida(update) && !esPatenteRepetida(update)) {
                storage[resultado].patente = update;
                localStorage.setItem("patentes", JSON.stringify(storage))
            }
        }
    }
}

const bajaPatente = (patente) => {
    let storage = JSON.parse(localStorage.getItem("patentes"));
    if (!estaVacia(patente) && esValida(patente)) {
        let resultado = storage.findIndex(elem => {
            return elem.patente === patente
        });

        if (resultado === -1) {
            alert("No existe la patente ingresada. Intente nuevamente.")
            document.querySelector("#text-patente").focus();
        } else {
            storage.splice(resultado, 1)
            localStorage.setItem("patentes", JSON.stringify(storage))
        }
    }
}

const existePatenteRepetida = (patente) => {
    let esRepetida = false;
    let storage = JSON.parse(localStorage.getItem("patentes"))
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].patente === patente) {
            esRepetida = true;
        }
    }
    return esRepetida;
}

const esPatenteRepetida = (patente) => {
    if (existePatenteRepetida(patente)) {
        alert("La patente está en la base de datos. Verifique el listado.")
        return true;
    }
    return false;
}

const regex = (patente) => {
    const re = new RegExp('^[A-Z]{3}[0-9]{3}$');
    console.log(re.test(patente))
    return re.test(patente);
}

const esValida = (patente) => {
    if (regex(patente)) {
        return true;
    }
    alert("El formato de la patente no es válida. Intente nuevamente.")
    document.querySelector("#text-patente").focus();
    return false;
}

const estaVacia = (patente) => {
    if (patente === '' || patente === null || patente.lenght === 0) {
        alert("El campo de texto está vacío, debe ingresar una patente válida.")
        document.querySelector("#text-patente").focus();
        return true;
    }
    return false;
}

//Events listener 
document.getElementById('add-button').addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.getElementById('text-patente').value;

    altaPatente(input);

    formulario.reset();
});

document.getElementById('update-button').addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.getElementById('text-patente').value;

    editarPatente(input);

    formulario.reset();

});

document.getElementById('delete-button').addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.getElementById('text-patente').value;

    bajaPatente(input);

    formulario.reset();

});

document.getElementById('get-patentes').addEventListener("click", (e) => {
    e.preventDefault();
    createTable();
});

document.getElementById('close-window').addEventListener("click", (e) => {
    e.preventDefault();
    let confirm = window.confirm("¿Estás seguro que quieres salir?")
    if (confirm) {
        window.close();
    }
});