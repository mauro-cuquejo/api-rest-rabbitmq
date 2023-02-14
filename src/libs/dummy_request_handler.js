const http = require('http');
const https = require('https')

module.exports = {
    async obtenerDatosDummy() {
        let url = (process.env.NODE_ENV === 'production') ?
            process.env.URL_DATOS_DUMMY :
            'localhost';

        let port = (process.env.NODE_ENV === 'production') ?
            5000 :
            3000;

        let options = {
            host: url,
            port: port,
            path: '/obtener-dummy-original'
        };
        return new Promise((resolve, reject) => {
            http.get(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    jsonData = procesarDatosJSON(data);
                    resolve(jsonData);
                });
            }).on('error', (error) => {
                reject(new Error('Error procesando datos Dummy'));
            });
        });
    }
}

function procesarDatosJSON(data) {
    jsonData = JSON.parse(data);
    jsonData.nuevo_campo = "NUEVO CAMPO!!!";
    jsonData.importe = jsonData.importe * 2;
    return jsonData;
}
