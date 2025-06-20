import { spawn } from "child_process";

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export const sqlmap = async (path, url, opts) => {
    const proc = spawn(process.platform === "win32" ? "python" : "python3", [path, "-s"]);
    proc.stdout.on("data", d => console.log(d.toString()));
    proc.stderr.on("data", d => console.log(d.toString()));
    await wait(1500);

    const f1 = await fetch(`http://localhost:8775/task/new`);
    const { taskid } = await f1.json();

    const f2 = await fetch(`http://localhost:8775/scan/${taskid}/start`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            url: url,
            ...opts
        })
    });
    const { success } = await f2.json();
    if(!success) throw new Error("not success");

    const cycle = async (resolve, reject) => {
        const f = await fetch(`http://localhost:8775/scan/${taskid}/status`);
        const { status } = await f.json();
        if(status !== "terminated") setTimeout(cycle, 500, resolve, reject);
        else resolve();
    };
    await new Promise(cycle);

    const f3 = await fetch(`http://localhost:8775/scan/${taskid}/data`);
    const { data } = await f3.json();

    proc.kill();
    return data;
};