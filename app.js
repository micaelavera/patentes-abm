const formulario = document.getElementById('formulario')
const datatable = document.getElementById('table-patentes');

const arrayPatentes = []

const createTable = () => {
    let storage = JSON.parse(localStorage.getItem('patentes'))
    if (localStorage.getItem("patentes") === null) {
        datatable.innerHTML = `<p> No hay patentes en la base de datos.</p>`
    }
    else {
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

const existePatenteRepetida = (patente) => {
    let storage = JSON.parse(localStorage.getItem("patentes"))
    for (const i = 0; i < storage.length; i++) {    
        if (storage[i].patente === patente) {
            return true;
        }
        return false;
    }
    return false;
}


const esPatenteRepetida = (patente) => {
    if (existePatenteRepetida(patente)) {
        alert("La patente está en la base de datos. Verifique el listado.")
        return true;
    }
    return false;

}
const regex = (patente) => {
    // validación con expresión regular
    const re = new RegExp('[A-Z]{3}[0-9]{3}$');
    return re.test(patente);
}

const esValida = (patente) => {
    if (regex(patente)) {
        return true;
    }
    alert("El formato de la patente no es válida. Intente nuevamente.")
    document.querySelector("#add-patente").focus();
    return false;
}

const estaVacia = (patente) => {
    if (patente === '' || patente === null) {
        alert("El campo está vacío, debe ingresar una patente válida.")
        document.querySelector("#add-patente").focus();
        return true;
    }
    return false;
}

const saveDB = () => {
    localStorage.setItem('patentes', JSON.stringify(arrayPatentes))
}

//Events listener 
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('add-patente').value;

    altaPatente(input);

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