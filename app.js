const weather = require('./src/lugar/lugar');
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion del lugar',
        demand: true
    }
}).argv;
const direccion = argv.direccion;

// Localizacion del lugar
// weather.getWeather(direccion)
//     .then(console.log)
//     .catch(err => console.log(err));

//Temperatura C y F del lugar
// weather.getTemp(direccion)
//     .then(console.log)
//     .catch(err => console.log(err));

weather.showInfo(direccion)
    .then(console.log)
    .catch(err => console.log(err));