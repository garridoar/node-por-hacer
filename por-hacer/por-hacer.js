

const fs = require('fs');


let listadoPorHacer = [];

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (e) => {
        if(e)
            throw new Error('No se pudo crear el archivo json', e);
    });

}

 const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    }

    catch(e) {
        listadoPorHacer = [];
    }

 }

 const getListado = () => {

    let listado = require('../db/data.json');
    return listado;
 }

 const actualizar = (descripcion, completado = true ) => {

    cargarDB();

    let index = listadoPorHacer.findIndex( (tarea) => {
        return tarea.descripcion === descripcion;
    });

    if(index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    else {
        return false;
    }   
 }

 const borrar = (descripcion) => {

    let cond = false;

    try {
        
         cargarDB();
    
         let index = listadoPorHacer.findIndex( (tarea) => {
             return tarea.descripcion === descripcion;
         });
    
         if(index != -1)
            listadoPorHacer.splice(index, 1);
        else
            throw new Error('No se ha encontrado el elemento');
    
         guardarDB();

         cond = true;

    }
    catch(e) {
        console.log("No se pudo eliminar el elemento de la DB", e);
    }
    
    return cond;

 }



module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}