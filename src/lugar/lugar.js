const axios = require('axios');


// Metodo para conseguir la información del API mediante el URL
const getInstance = async(direction) => {
    const encoderUlr = encodeURI(direction);
    const instance = axios.create({
        baseURL: `http://api.weatherapi.com/v1/current.json?key=e9d7edbcc6ee468996d10343211101&q=${encoderUlr}`,
        headers: { 'key': 'e9d7edbcc6ee468996d10343211101' }
    });
    return await instance.get();
};

// Metodo para conseguir las coordenadas y el nombre del provincia del país mediante la dirección
const getWeather = async(direction) => {
    try {
        const response = await getInstance(direction);
        const data = response.data.location;
        const location = data.name;
        const lat = data.lat;
        const lon = data.lon;
        if (location == 'True') {
            return 'Ingrese un lugar.';
        } else {
            return {
                location,
                lat,
                lon
            }
        }
    } catch (error) {
        const errorCode = error.response.data.error.code;
        if (errorCode === 1006) {
            return `No se encuentra el lugar '${direction}'`;
        }
    }
};

//Metodo para conseguir la temperatura mediante la dirección de la provincia
const getTemp = async(direction) => {
    try {
        const response = await getInstance(direction);
        const data = response.data.current;
        const tempCelcius = data.temp_c;
        const tempFarenheit = data.temp_f;

        return {
            tempCelcius,
            tempFarenheit
        }
    } catch (err) {
        const errorCode = err.response.data.error.code;
        if (errorCode === 1006) {
            return `No se encuentra el lugar '${direction}'`;
        }
    }
};
//Metodo para mostrar la temperatura y la provincia mediante al dirección
const showInfo = async(direccion) => {
    try {
        const response = await getInstance(direccion);
        const data = response.data.location;
        const temp = response.data.current;
        const location = data.name;
        const tempCelcius = temp.temp_c;
        const tempFarenheit = temp.temp_f;
        return `El clima de ${location} es de ${tempCelcius} Celcius y ${tempFarenheit} Farenheit.`;
    } catch (error) {
        return `No se pudo determinar del lugar ${direccion}`;
    }
}

module.exports = {
    getWeather,
    getTemp,
    showInfo
}