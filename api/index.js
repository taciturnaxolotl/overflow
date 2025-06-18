import express from "express";
import nmapRouter from "./nmap.js";
import crtShRouter from "./crtsh.js";

const apiRouter = express.Router();
apiRouter.use("/nmap", nmapRouter);
apiRouter.use("/crtsh", crtShRouter);

export default apiRouter;