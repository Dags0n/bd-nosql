const redis = require("redis");
const client = redis.createClient();

client.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

function sendNotification(notification) {
  client.rpush("notifications", notification, (err, reply) => {
    if (err) console.error("Error sending notification:", err);
    else console.log(`Notification sent: ${notification}`);
  });
}

setInterval(() => {
  const notification = `Nova notificação às ${new Date().toLocaleTimeString()}`;
  sendNotification(notification);
}, 5000);
