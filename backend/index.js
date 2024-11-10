import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
 dotenv.config({ path:"config/.env"});

 connectDatabase();

 app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port:${process.env.PORT}`);
 });