const argv = require('./config/yargs.js').argv;
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch(comando){

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log("Tarea Guardada");
    break;

    case 'listar':
        porHacer.getListado();
    break;

    case 'actualizar':
        porHacer.actualizar(argv.descripcion,argv.completado);
        console.log('Tarea Actualizada');
    break;

    case 'borrar':
        porHacer.borrar(argv.descripcion);
        console.log('Tarea Borrada');
    break;

    default:
        console.log('Comando no reconocido')
    break;
}