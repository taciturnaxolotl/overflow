import express from "express";
import ViteExpress from "vite-express";
import apiRouter from "./api/index.js";
import * as msf from "./utils/metasploit.js";

const app = express();
app.use((req, res, next) => {
    if(req.ip !== "127.0.0.1" && req.ip !== "::1")
        res.status(400).send("Access not allowed from other machines");
    else next();
});

app.use("/api", apiRouter);

ViteExpress.bind(app, app.listen(2003, "localhost", () => {
    console.log("Running on http://localhost:2003");
}));

msf.init();
const stop = async () => {
    msf.deinit();
    process.exit(0);
}

process.on("uncaughtException", e => console.error(e));
process.on("unhandledRejection", e => console.error(e));

process.on("SIGHUP", async () => await stop());
process.on("SIGUSR2", async () => await stop());
process.on("SIGINT", async () => await stop());
process.on("SIGTERM", async () => await stop());