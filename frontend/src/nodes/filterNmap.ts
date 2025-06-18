import { LGraphNode, LiteGraph } from "litegraph.js";

export class FilterNmap extends LGraphNode {
    ports: string = "";

    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addWidget("text", "Ports", "", value => this.ports = value, { multiline: true })
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "nmap";
    async onAction(action, data) {
        const f = await fetch("/api/nmap", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ targets: data, opts: { ports: this.ports.split("\n").map(x => parseInt(x)).filter(x => x >= 0 && x <= 65535) } })
        });
        const json = await f.json();
        this.triggerSlot(0, json);
    }
}