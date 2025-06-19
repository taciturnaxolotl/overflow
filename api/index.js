import express from "express";
import nmapRouter from "./nmap.js";
import crtShRouter from "./crtsh.js";
import metasploitRouter from "./metasploit.js";

const apiRouter = express.Router();
apiRouter.use("/nmap", nmapRouter);
apiRouter.use("/crtsh", crtShRouter);
apiRouter.use("/msf", metasploitRouter);

export default apiRouter;