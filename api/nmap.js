import express from "express";
import { scanNmap } from "../utils/nmap.js";

const nmapRouter = express.Router();
nmapRouter.use(express.json());
nmapRouter.post("/", async (req, res) => {
    res.send(await scanNmap(req.body.targets, req.body.opts));
});

export default nmapRouter;