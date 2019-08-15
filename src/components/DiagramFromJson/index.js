import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import * as React from "react";
import DemoWorkspaceWidget from "../DemoWorkspaceWidget";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DemoCanvasWidget } from "../DemoCanvasWidget";

import jsonGraph from "../../data/two-node-graph.json";

export default () => {
  // setup the diagram engine
  var engine = createEngine();

  //!------------- DESERIALIZE ----------------

  var model = new DiagramModel();
  console.log("jsonGraph", jsonGraph);
  model.deserializeModel(jsonGraph, engine);
  engine.setModel(model);

  return (
    <DemoWorkspaceWidget>
      <DemoCanvasWidget>
        <CanvasWidget engine={engine} />
      </DemoCanvasWidget>
    </DemoWorkspaceWidget>
  );
};
