import { LGraphNode, LiteGraph } from "litegraph.js";
import { logRed } from "../log";

export class LogVulnerable extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("note", "", "text");
        this.addWidget("text", "Description", "", "note");
    }
    title = "Log as vulnerable";
    serialize_widgets = true;
    onAction(action, data) {
        console.log(action, data);
        for(const target of data)
            logRed(`${target} logged as vulnerable with note "${this.properties.note}"`);
    }
}