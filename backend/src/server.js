import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/db.js";
import {connectRedis} from "./config/redis.js";
import app from "./app.js";


await connectDb();
await connectRedis();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});