import { LGraphNode, LiteGraph } from "litegraph.js";

export class MapPrefixSuffix extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("prefix", "", "text");
        this.addProperty("suffix", "", "text");
        this.addWidget("text", "Prefix", "", "prefix");
        this.addWidget("text", "Suffix", "", "suffix");
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Prefix & suffix";
    serialize_widgets = true;
    async onAction(action, data) {
        this.triggerSlot(0, data.map(x => this.properties.prefix + x + this.properties.suffix));
    }
}