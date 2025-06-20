import { LGraphNode, LiteGraph } from "litegraph.js";

export class SortAlphabetic extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("reverse", false, "toggle");
        this.addWidget("toggle", "Reverse", false, "reverse");
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Sort (Alphabetic)";
    serialize_widgets = true;
    onAction(action, data) {
        data.sort();
        if(this.properties.reverse) data.reverse();
        this.triggerSlot(0, data);
    }
}