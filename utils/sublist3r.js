import { spawnSync } from "child_process";
import { tmpdir } from "os";
import { join } from "path";
import fs from "fs";

let n = 0;
export const getSubdomains = (path, domain) => {
    const filePath = join(tmpdir(), `overflowscan${n}`);
    if(fs.existsSync(filePath))
        fs.unlinkSync(filePath);
    const r = spawnSync(process.platform === "win32" ? "python" : "python3", [path, "-d", domain, "-o", filePath]);
    try { console.log(r.stderr.toString("utf-8")); } catch(_) {}
    if(r.error) throw new Error(r.error);
    if(r.status !== 0) throw new Error(`Status is ${r.status}, not 0`);
    return fs.readFileSync(filePath, "utf-8").split("\n").filter(x => x);
}