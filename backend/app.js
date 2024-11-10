import express from "express";
export const app = express();
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true, limit:"50mb"}));
import { userRouter } from "./router/router.js";

app.use("/api/v1", userRouter);