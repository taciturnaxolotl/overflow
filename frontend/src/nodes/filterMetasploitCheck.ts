import { LGraphNode, LiteGraph } from "litegraph.js";
import { fetchErr } from "../fetch";

const defaultConfig = "rhosts={target}";

export class FilterMetasploitCheck extends LGraphNode {
    exploit: string = "";
    opts: string = defaultConfig;

    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addWidget("text", "Exploit", "", value => this.exploit = value)
        this.addWidget("text", "Options", defaultConfig, value => this.opts = value, { multiline: true })
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Metasploit check";
    getOptions(target) {
        return Object.fromEntries(this.opts.split("\n").filter(x => x).map(x => {
            const equals = x.indexOf("=");
            if(equals === -1) return [x, ""];
            return [x.slice(0, equals), x.slice(equals + 1).replaceAll("{target}", target)];
        }));
    }
    async onAction(action, data) {
        console.log(data);
        for(const target of data) {
            console.log(this.getOptions(target));
            const f = await fetchErr("/api/msf/check", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ exploit: this.exploit, opts: this.getOptions(target) })
            });
            const json = await f.json();
            if(!json || !json.result || !json.result.code || json.result.code !== "vulnerable")
                continue;
            this.triggerSlot(0, [target]);
        }
    }
}