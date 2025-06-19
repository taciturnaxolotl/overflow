import express from "express";
import nmapRouter from "./nmap.js";
import crtShRouter from "./crtsh.js";
import metasploitRouter from "./metasploit.js";
import burpRouter from "./burp.js";
import sublist3rRouter from "./sublist3r.js";

const apiRouter = express.Router();
apiRouter.use("/nmap", nmapRouter);
apiRouter.use("/crtsh", crtShRouter);
apiRouter.use("/msf", metasploitRouter);
apiRouter.use("/burp", burpRouter);
apiRouter.use("/sublist3r", sublist3rRouter);

export default apiRouter;