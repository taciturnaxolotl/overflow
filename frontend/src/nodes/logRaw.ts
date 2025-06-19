import { LGraphNode, LiteGraph } from "litegraph.js";
import { logBlue } from "../log";

export class LogRaw extends LGraphNode {
    constructor() {
        super();
        this.addInput("Text", LiteGraph.ACTION);
    }
    title = "Log text";
    serialize_widgets = true;
    onAction(action, data) {
        data.forEach(logBlue);
    }
}