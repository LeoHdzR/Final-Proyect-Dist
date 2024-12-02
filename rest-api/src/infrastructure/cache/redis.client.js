import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://redis:6379", // Cambiar localhost a redis
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();
