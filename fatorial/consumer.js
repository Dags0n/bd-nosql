const redis = require("redis");
const client = redis.createClient();

client.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

function consumeNotification() {
  client.subscribe("eventos");

  client.on("message", (channel, message) => {
    console.log(`Evento recebido do canal ${channel}: ${message}`);
  });
}

consumeNotification();
