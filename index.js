const app = require("./src/app");
const { connectRedis, redis } = require("./src/config/redis");


const PORT = 3001;

async function startServer() {
    try {
        await connectRedis();
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portunda işləyir`);
        });
    } catch (error) {
        console.error("Serveri başlatmaq mümkün olmadı:", error);

        if (redis.isOpen) {
            await redis.quit().catch(()=>{});
        }

        process.exitCode = 1;
    }
}

startServer();