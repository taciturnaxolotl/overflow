import { LGraphNode, LiteGraph } from "litegraph.js";
import { expandCidr } from "cidr-tools";
import { fetchErr } from "../fetch";
import { Task } from "../tasks";

export class Sublist3r extends LGraphNode {
    constructor() {
        super();
        this.addProperty("domain", "", "text");
        this.addProperty("path", "", "text");
        this.addWidget("text", "Domain", "", "domain");
        this.addWidget("text", "Sublist3r path", "", "path");
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Sublist3r subdomains scan";
    serialize_widgets = true;
    async onExecute() {
        const task = new Task(`Sublist3r scan of ${this.properties.domain}`);
        const f = await fetchErr(`/api/sublist3r?p=${encodeURIComponent(this.properties.path)}&q=${encodeURIComponent(this.properties.domain)}`, {}, task);
        const json = await f.json();
        this.triggerSlot(0, json); // Already unique
        task.remove();
    }
}