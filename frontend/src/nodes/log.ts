import { LGraphNode, LiteGraph } from "litegraph.js";
import { logRed } from "../log";

export class LogVulnerable extends LGraphNode {
    note: string[] = [];

    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addWidget("text", "Description", "", value => this.note = value);
    }
    title = "Log as vulnerable";
    onAction(action, data) {
        console.log(action, data);
        for(const target of data)
            logRed(`${target} logged as vulnerable with note "${this.note}"`);
    }
}