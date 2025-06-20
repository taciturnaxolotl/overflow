import { LGraphNode, LiteGraph } from "litegraph.js";
import { fetchErr } from "../fetch";
import { Task } from "../tasks";

export class FilterDNS extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "DNS resolver";
    serialize_widgets = true;
    async onAction(action, data) {
        for(const target of data) {
            const task = new Task(`DNS resolving of ${target}`);
            const f = await fetchErr(`/api/dns?q=${encodeURIComponent(target)}`, {}, task);
            const json = await f.json();
            this.triggerSlot(0, json);
            task.remove();
        }
    }
}