const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () =>{

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json',data, (err) =>{
        if (err) throw new Error ('No se pudo grabar',err);

    })

}

const cargarDB = () =>{

    try{
        listadoPorHacer = require('../db/data.json');
    } catch(error){
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

        cargarDB();

        let porHacer = {
            descripcion: descripcion,
            completado: false
        }

        listadoPorHacer.push(porHacer);
        guardarDB();

        return porHacer;
}

const getListado = () =>{

    cargarDB();

    for(let tarea of listadoPorHacer){
        console.log('============= Por Hacer ============='.green);
        console.log(`Actividad: ${tarea.descripcion}`);
        console.log(`Estado: ${tarea.completado}`);
        console.log('====================================='.green);
    }
}

const actualizar = (descripcion,completado=true) =>{

    cargarDB();

    let index = listadoPorHacer.findIndex( tarea =>{
        return tarea.descripcion === descripcion;
    });

    if(index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }

}

const borrar = (descripcion) =>{

    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => {
        return tarea.descripcion === descripcion;
    });

    if(index >= 0){
        listadoPorHacer.splice(index,1);
        guardarDB();
    }else{
        console.log('No se ha encontrado ninguna tarea');
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}

