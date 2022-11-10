const formulario = document.getElementById('formulario')
const datatable = document.getElementById('table-patentes');

let arrayPatentes = []

const createTable = () => {
    arrayPatentes = JSON.parse(localStorage.getItem('patentes'))
    if (arrayPatentes === null) {
        datatable.innerHTML = `<p> No hay patentes en la base de datos.</p>`
    }
    else {
        datatable.innerHTML = "<tr><th>Patente</th></tr>"
        for (let i = 0; i < arrayPatentes.length; i++) {
            let fila = "<tr><td>" + arrayPatentes[i].patente + "</tr></td>";
            datatable.innerHTML += fila;
        }
        return datatable;
    }
}

const altaPatente = (patente) => {
   
    if (!estaVacia(patente) && esValida(patente)) {
        let item = { patente: patente };
        arrayPatentes.push(item);

        // guardo en el local storage
        saveDB();

        return item;
    }
}

const esRepetida = (patente) => {
    arrayPatentes = JSON.parse(localStorage.getItem('patentes'))
    for (const i = 0; i < arrayPatentes.length; i++) {
        console.log(arrayPatentes[i].patente)
        //        #if (arrayPatentes[i].patente == patente){
        //             alert("La patente ya se encuentra en la base de datos.")
        //            return true;
        //        }
        //    }
        //    return false;
    }
}
const regex = (patente) => {
    // validación con expresión regular
    const re = new RegExp('[A-Z]{3}[0-9]{3}$');
    return re.test(patente);
}

const esValida = (patente) => {
    if(regex(patente)){
        return true;
    }
    alert("El formato de la patente no es válida. Intente nuevamente.")  
    return false;
}

const estaVacia = (patente) => {
    if (patente === '' || patente === null) {
        alert("El campo está vacío, debe ingresar una patente válida.")
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
})

document.getElementById('get-patentes').addEventListener("click", (e) => {
    e.preventDefault();
    createTable();
});

document.getElementById('close-window').addEventListener("click", (e) => {
    e.preventDefault();
    window.close();
});