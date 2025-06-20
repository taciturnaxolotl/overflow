import { LGraphNode, LiteGraph } from "litegraph.js";
import { fetchErr } from "../fetch";
import { Task } from "../tasks";

const defaultOpts = `level=1`;

export class FilterSqlmap extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("path", "", "text");
        this.addProperty("opts", defaultOpts, "text");
        this.addWidget("text", "Path to sqlmapapi.py", "", "path");
        this.addWidget("text", "Options", defaultOpts, "opts", { multiline: true });
        this.addOutput("Targets", LiteGraph.EVENT);
        this.addOutput("Logs", LiteGraph.EVENT);
    }
    title = "sqlmap scan";
    serialize_widgets = true;
    getOptions() {
        return Object.fromEntries(this.properties.opts.split("\n").filter(x => x).map(x => {
            const equals = x.indexOf("=");
            if(equals === -1) return [x, ""];
            return [x.slice(0, equals), x.slice(equals + 1)];
        }));
    }
    async onAction(action, data) {
        for(const target of data) {
            const task = new Task(`sqlmap scan of ${target}`);
            const f = await fetchErr(`/api/sqlmap`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    path: this.properties.path,
                    opts: this.getOptions(),
                    url: target
                })
            }, task);
            const json = await f.json();
            for(const found of json) {
                if(found.type !== 1) continue;
                this.triggerSlot(1, found.value.map((x: any) => Object.values(x.data).map((y: any) => y.title + " - " + y.payload)).flat());
                if(Object.keys(found.value).length) this.triggerSlot(0, [target]);
            }
            
            task.remove();
        }
    }
}