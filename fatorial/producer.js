const redis = require("redis");
const client = redis.createClient();
const clientRestrito = redis.createClient();

client.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

clientRestrito.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

function sendNotification(evento) {
  client.publish("eventos", evento, (err, reply) => {
    if (err) console.error("Error sending notification:", err);
    else console.log(`Evento enviado: ${evento}`);
  });
}

function sendRestrictedNotification(eventoRestrito) {
  clientRestrito.publish("eventos.restritos", eventoRestrito, (err, reply) => {
    if (err) console.error("Error sending restricted notification:", err);
    else console.log(`Evento restrito enviado: ${eventoRestrito}`);
  });
}

setInterval(() => {
  const evento = `Novo evento às ${new Date().toLocaleTimeString()}`;
  sendNotification(evento);
  sendRestrictedNotification(evento);
}, 5000);
