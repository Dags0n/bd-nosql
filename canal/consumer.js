const redis = require("redis");
const client = redis.createClient();

client.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

function consumeNotification() {
  client.brpop("notifications", 0, (err, reply) => {
    if (err) {
      console.error("Error receiving notification:", err);
      return;
    }

    const [_, notification] = reply;
    console.log(`Notificação recebida: ${notification}`);
    
    consumeNotification();
  });
}

consumeNotification();
