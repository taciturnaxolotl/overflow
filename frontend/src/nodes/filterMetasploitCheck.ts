import { LGraphNode, LiteGraph } from "litegraph.js";
import { fetchErr } from "../fetch";
import { Task } from "../tasks";

const defaultConfig = "rhosts={target}";

export class FilterMetasploitCheck extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("exploit", "", "text");
        this.addProperty("opts", defaultConfig, "text");
        this.addWidget("text", "Exploit", "", "exploit")
        this.addWidget("text", "Options", defaultConfig, "opts", { multiline: true })
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Metasploit check";
    serialize_widgets = true;
    getOptions(target) {
        return Object.fromEntries(this.properties.opts.split("\n").filter(x => x).map(x => {
            const equals = x.indexOf("=");
            if(equals === -1) return [x, ""];
            return [x.slice(0, equals), x.slice(equals + 1).replaceAll("{target}", target)];
        }));
    }
    async onAction(action, data) {
        for(const target of data) {
            const task = new Task(`Metasploit scan of ${target}`);
            console.log(this.getOptions(target));
            const f = await fetchErr("/api/msf/check", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ exploit: this.properties.exploit, opts: this.getOptions(target) })
            }, task);
            const json = await f.json();
            task.remove();
            if(!json || !json.result || !json.result.code || json.result.code !== "vulnerable")
                continue;
            this.triggerSlot(0, [target]);
        }
    }
}