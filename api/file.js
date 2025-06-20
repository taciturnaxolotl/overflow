import express from "express";
import { appendFileSync } from "fs";

const fileRouter = express.Router();
fileRouter.use(express.text());
fileRouter.post("/", (req, res) => {
    appendFileSync(req.query.name, req.body)
    res.send("OK");
});

export default fileRouter;