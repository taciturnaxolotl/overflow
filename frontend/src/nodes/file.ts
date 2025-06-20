import { LGraphNode, LiteGraph } from "litegraph.js";
import { Task } from "../tasks";
import { fetchErr } from "../fetch";

export class LogFile extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("name", "", "text");
        this.addWidget("text", "File name", "", "name");
    }
    title = "Append to file";
    serialize_widgets = true;
    async onAction(action, data) {
        const task = new Task(`Appening data to file ${this.properties.name}`);
        await fetchErr("/api/file?name=" + encodeURIComponent(this.properties.name), {
            method: "POST",
            body: data.join("\n") + "\n",
            headers: { "content-type": "text/plain" }
        }, task);
        task.remove();
    }
}