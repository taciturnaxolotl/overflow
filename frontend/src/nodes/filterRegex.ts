import { LGraphNode, LiteGraph } from "litegraph.js";

export class FilterRegex extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("regex", "", "text");
        this.addProperty("flags", "", "text");
        this.addWidget("text", "Regex", "", "regex");
        this.addWidget("text", "Flags", "", "flags");
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Regex filter";
    serialize_widgets = true;
    async onAction(action, data) {
        this.triggerSlot(0, data.filter(x => x.match(new RegExp(this.properties.regex, this.properties.flags))));
    }
}