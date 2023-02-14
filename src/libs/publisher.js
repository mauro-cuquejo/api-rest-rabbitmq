const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

var canal, conexion;

async function conectar(queue) {
    let url = (process.env.NODE_ENV === 'production') ?
        process.env.RABBITMQ_SERVER_CONTENEDOR :
        process.env.RABBITMQ_SERVER_LOCAL;

    console.log("url rabbit: " + url);
    conexion = await amqp.connect(url, (error) => { if (error) throw error; });
    canal = await conexion.createChannel();
    await canal.assertQueue(queue);
}

//sender
exports.encolarJSON = async function (queue, stringJson) {
    conectar(queue).then(() => {
        canal.sendToQueue(queue, Buffer.from(stringJson));
    }, (error) => { console.log(error) });
}