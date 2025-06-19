import { LGraphNode, LiteGraph } from "litegraph.js";

export class ConstList extends LGraphNode {
    constructor() {
        super();
        this.addProperty("str", "", "text");
        this.addWidget("text", "List of targets", "", "str", { multiline: true });
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Constant list";
    serialize_widgets = true;
    onExecute() {
        this.triggerSlot(0, this.properties.str.split("\n").filter(x => x));
    }
}