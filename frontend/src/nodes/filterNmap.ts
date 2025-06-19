import { LGraphNode, LiteGraph } from "litegraph.js";
import { fetchErr } from "../fetch";
import { Task } from "../tasks";

export class FilterNmap extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("ports", "", "text");
        this.addWidget("text", "Ports", "", "ports", { multiline: true })
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "nmap";
    serialize_widgets = true;
    async onAction(action, data) {
        const task = new Task(`nmap scan of ${data.length} hosts`);
        const f = await fetchErr("/api/nmap", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ targets: data, opts: { ports: this.properties.ports.split("\n").map(x => parseInt(x)).filter(x => x >= 0 && x <= 65535) } })
        }, task);
        const json = await f.json();
        this.triggerSlot(0, json);
        task.remove();
    }
}