import express from "express";
import { getData, PostData } from "../controllers/controller.js";

export const  userRouter = express.Router()

userRouter.route("/").get((req, res) => {
    res.json({
      message: "port running !!!!"
    });
  });
  
userRouter.route('/getdata').get(getData);
userRouter.route('/postdata').post(PostData);