import express from "express";
import nmapRouter from "./nmap.js";

const apiRouter = express.Router();
apiRouter.use("/nmap", nmapRouter);

export default apiRouter;