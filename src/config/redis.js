const { createClient } = require("redis");

const redis = createClient({
    url: "redis://127.0.0.1:6379",
});

redis.on("error", (err) => {
    console.error("Redis xətası:", err.message);
});

async function connectRedis() {
    if (!redis.isOpen) {
        await redis.connect();
    }

    console.log("Redis bağlantısı uğurludur");
}

module.exports = {
    redis,
    connectRedis,
};

