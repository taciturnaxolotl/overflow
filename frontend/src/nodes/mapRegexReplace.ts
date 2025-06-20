import { LGraphNode, LiteGraph } from "litegraph.js";

export class MapRegexReplace extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("regex", "", "text");
        this.addProperty("flags", "", "text");
        this.addProperty("with", "", "text");
        this.addWidget("text", "Regex", "", "regex");
        this.addWidget("text", "Flags", "", "flags");
        this.addWidget("text", "Replace with", "", "with");
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Regex replace";
    serialize_widgets = true;
    async onAction(action, data) {
        this.triggerSlot(0, data.map(x => x.replace(new RegExp(this.properties.regex, this.properties.flags), this.properties.with)).filter(x => x));
    }
}