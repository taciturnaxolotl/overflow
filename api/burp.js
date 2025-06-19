import express from "express";

const burpRouter = express.Router();
burpRouter.use(express.json());
burpRouter.post("/", async (req, res) => {
    const f = await fetch(`http://localhost:1337/${req.body.token}/v0.1/scan`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            urls: req.body.targets,
            scan_configurations: [{ name: req.body.configName, type: "NamedConfiguration" }]
        })
    });
    const id = f.headers.get("location");
    let json;
    const cycle = async (resolve, reject) => {
        const f = await fetch(`http://localhost:1337/${req.body.token}/v0.1/scan/${id}`);
        json = await f.json();
        if(json.scan_status === "succeeded") resolve();
        else setTimeout(cycle, 500, resolve, reject);
    }
    await new Promise((resolve, reject) => cycle(resolve, reject));
    res.send(json);
});

export default burpRouter;