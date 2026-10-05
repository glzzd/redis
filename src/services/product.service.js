const { redis } = require("../config/redis");

const products = [
  {
    id: 1,
    name: "Məhsul 1",
    price: 10.99,
    description: "Məhsul 1-in təsviri",
  },
  {
    id: 2,
    name: "Məhsul 2",
    price: 19.99,
    description: "Məhsul 2-in təsviri",
  },
  {
    id: 3,
    name: "Məhsul 3",
    price: 29.99,
    description: "Məhsul 3-in təsviri",
  },
  {
    id: 4,
    name: "Məhsul 4",
    price: 39.99,
    description: "Məhsul 4-in təsviri",
  },
  {
    id: 5,
    name: "Məhsul 5",
    price: 49.99,
    description: "Məhsul 5-in təsviri",
  },
];


async function getProducts() {
    const cacheKey = "products:all";

    const cachedProducts = await redis.get(cacheKey);

    if(cachedProducts !== null) {
        console.log("CACHE HIT");
        return {source: "cache", data: JSON.parse(cachedProducts) };
    }

    console.log("CACHE MISS");
    const result = products;


    await redis.set(cacheKey, JSON.stringify(result), {
        EX: 60,
    });

    return {source: "database", data: result };

    
}


module.exports = {
    getProducts,
};