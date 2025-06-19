import { LGraphNode, LiteGraph } from "litegraph.js";
import { expandCidr } from "cidr-tools";
import { fetchErr } from "../fetch";

export class CRTSh extends LGraphNode {
    domain: string = "";

    constructor() {
        super();
        this.addWidget("text", "Domain", "", value => this.domain = value);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "crt.sh subdomains scan";
    serialize_widgets = true;
    async onExecute() {
        const f = await fetchErr(`/api/crtsh?q=${encodeURIComponent(this.domain)}`);
        const json = await f.json();
        this.triggerSlot(0,
            Array.from(new Set(json.map(x => x.name_value.split("\n")).flat()))
        );
    }
}