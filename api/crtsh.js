import express from "express";

const crtShRouter = express.Router();
crtShRouter.get("/", async (req, res) => {
    res.send(await (await fetch(`https://crt.sh/json?q=${encodeURIComponent(req.query.q)}`)).json());
});

export default crtShRouter;