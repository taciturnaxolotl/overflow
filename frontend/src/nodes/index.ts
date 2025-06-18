import { LiteGraph } from "litegraph.js";
import { ConstList } from "./const";
import { LogVulnerable } from "./log";
import { FilterHasPort } from "./filterHasPort";
import { IPRange } from "./ipRange";
import { FilterNmap } from "./filterNmap";
import { MapStripPorts } from "./mapStripPort";
import { CRTSh } from "./crtSh";

LiteGraph.registerNodeType("overflow/const", ConstList);
LiteGraph.registerNodeType("overflow/log", LogVulnerable);
LiteGraph.registerNodeType("overflow/hasport", FilterHasPort);
LiteGraph.registerNodeType("overflow/iprange", IPRange);
LiteGraph.registerNodeType("overflow/nmap", FilterNmap);
LiteGraph.registerNodeType("overflow/stripports", MapStripPorts);
LiteGraph.registerNodeType("overflow/crtsh", CRTSh);