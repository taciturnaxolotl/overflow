import { LGraphNode, LiteGraph } from "litegraph.js";

export class FilterDeduplicate extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Deduplicate";
    serialize_widgets = true;
    onAction(action, data) {
        this.triggerSlot(0,
            Array.from(new Set(data))
        );
    }
}