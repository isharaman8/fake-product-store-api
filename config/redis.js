const redis = require("redis");
const client = redis.createClient();
(async () => {
	await client.connect();
})();

client.on("connect", () => console.log(`Redis server connected`));
client.on("error", (err) => {
	console.log(err);
});

module.exports = client;
