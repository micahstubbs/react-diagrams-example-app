import * as React from "react";
import "./styles.css";
import createEngine, {
  DefaultLinkModel,
  DiagramModel
} from "@projectstorm/react-diagrams";
import { JSCustomNodeFactory } from "../JSCustomNodeFactory";
import { JSCustomNodeModel } from "../JSCustomNodeModel";

import { BodyWidget } from "../BodyWidget";

export default function Diagram() {
  // create an instance of the engine
  const engine = createEngine();

  // register the two engines
  engine.getNodeFactories().registerFactory(new JSCustomNodeFactory());

  // create a diagram model
  const model = new DiagramModel();

  //####################################################
  // now create two nodes of each type, and connect them

  const node1 = new JSCustomNodeModel({ color: "rgb(192,255,0)" });
  node1.setPosition(50, 50);

  const node2 = new JSCustomNodeModel({ color: "rgb(0,192,255)" });
  node2.setPosition(200, 50);

  const link1 = new DefaultLinkModel();
  link1.setSourcePort(node1.getPort("out"));
  link1.setTargetPort(node2.getPort("in"));

  model.addAll(node1, node2, link1);

  //####################################################

  // install the model into the engine
  engine.setModel(model);

  return <BodyWidget engine={engine} />;
}
