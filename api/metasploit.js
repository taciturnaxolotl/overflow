import express from "express";
import * as msf from "../utils/metasploit.js";

const metasploitRouter = express.Router();
metasploitRouter.use(express.json());
metasploitRouter.post("/check", async (req, res) => {
    const info = await msf.runCommand(["module.check", "exploit", req.body.exploit.replace(/^exploit\//, ""), req.body.opts]);
    console.log(info);
    const { uuid } = info;
    let n = 0;
    const cycle = async (resolve, reject) => {
        n++;
        if(n >= 500) return reject(new Error("Timeout")); // 15s timeout
        const r = (await msf.runCommand(["module.running_stats"])).results;
        if(r && r.includes(uuid)) resolve();
        else setTimeout(cycle, 30, resolve, reject);
    }
    await new Promise((resolve, reject) => cycle(resolve, reject));
    res.send(await msf.runCommand(["module.results", uuid]));
});

export default metasploitRouter;