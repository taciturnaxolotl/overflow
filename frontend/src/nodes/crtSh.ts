import { LGraphNode, LiteGraph } from "litegraph.js";
import { expandCidr } from "cidr-tools";
import { fetchErr } from "../fetch";
import { Task } from "../tasks";

export class CRTSh extends LGraphNode {
    constructor() {
        super();
        this.addProperty("domain", "", "text");
        this.addWidget("text", "Domain", "", "domain");
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "crt.sh subdomains scan";
    serialize_widgets = true;
    async onExecute() {
        const task = new Task(`crt.sh scan of ${this.properties.domain}`);
        const f = await fetchErr(`/api/crtsh?q=${encodeURIComponent(this.properties.domain)}`);
        const json = await f.json();
        this.triggerSlot(0,
            Array.from(new Set(json.map(x => x.name_value.split("\n")).flat()))
        );
        task.remove();
    }
}