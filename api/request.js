import express from "express";

const requestRouter = express.Router();
requestRouter.use(express.json());
requestRouter.post("/", async (req, res) => {
    const f = await fetch(req.body.url, {
        headers: Object.assign({
            "User-Agent": "overflow"
        }, req.body.headers || {}),
        method: req.body.method,
        body: req.body.data
    });
    const t = await f.text();
    res.send(`${f.status} ${f.statusText}\n\n${t}`);
});

export default requestRouter;