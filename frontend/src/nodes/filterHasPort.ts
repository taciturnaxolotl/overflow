import { LGraphNode, LiteGraph } from "litegraph.js";

export class FilterHasPort extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Has port";
    onAction(action, data) {
        console.log(data);
        this.triggerSlot(0,
            data.filter(x => x.match(/:\d+$/))
        );
    }
}