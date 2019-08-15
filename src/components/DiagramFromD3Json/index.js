import createEngine, {
  DiagramModel,
  DefaultPortModel,
  DagreEngine,
  PathFindingLinkFactory
} from "@projectstorm/react-diagrams";
import * as React from "react";
import { DemoButton, DemoWorkspaceWidget } from "../DemoWorkspaceWidget";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DemoCanvasWidget } from "../DemoCanvasWidget";
import createNode from "../../utils/createNode";
import connectNodes from "../../utils/connectNodes";
import miserables from "../../data/miserables.json";

let count = 0;

/**
 * Tests auto distribution
 */
class DemoWidget extends React.Component {
  engine;

  constructor(props) {
    super(props);
    this.engine = new DagreEngine({
      graph: {
        rankdir: "RL",
        ranker: "longest-path"
      },
      includeLinks: true
    });
  }

  autoLayout = () => {
    this.engine.redistribute(this.props.model);

    // only happens if pathfing is enabled (check line 25)
    this.reroute();
    this.props.engine.repaintCanvas();
  };

  componentDidMount() {
    setTimeout(() => {
      this.autoLayout();
    }, 500);
  }

  reroute() {
    this.props.engine
      .getLinkFactories()
      .getFactory(PathFindingLinkFactory.NAME)
      .calculateRoutingMatrix();
  }

  render() {
    return (
      <DemoWorkspaceWidget
        buttons={<DemoButton onClick={this.autoLayout}>Re-layout</DemoButton>}
      >
        <DemoCanvasWidget>
          <CanvasWidget engine={this.props.engine} />
        </DemoCanvasWidget>
      </DemoWorkspaceWidget>
    );
  }
}

export default () => {
  //1) setup the diagram engine
  let engine = createEngine();

  //2) setup the diagram model
  let model = new DiagramModel();

  //3) create a default nodes
  let nodesFrom = [];
  let nodesTo = [];

  nodesFrom.push(createNode("from-1"));
  nodesFrom.push(createNode("from-2"));
  nodesFrom.push(createNode("from-3"));

  nodesTo.push(createNode("to-1"));
  nodesTo.push(createNode("to-2"));
  nodesTo.push(createNode("to-3"));

  //4) link nodes together
  let links = nodesFrom.map((node, index) => {
    return connectNodes(node, nodesTo[index], engine, count++);
  });

  // more links for more complicated diagram
  links.push(connectNodes(nodesFrom[0], nodesTo[1], engine, count++));
  links.push(connectNodes(nodesTo[0], nodesFrom[1], engine, count++));
  links.push(connectNodes(nodesFrom[1], nodesTo[2], engine, count++));

  // initial random position
  nodesFrom.forEach((node, index) => {
    node.setPosition(index * 70, index * 70);
    model.addNode(node);
  });

  nodesTo.forEach((node, index) => {
    node.setPosition(index * 70, 100);
    model.addNode(node);
  });

  links.forEach(link => {
    model.addLink(link);
  });

  engine.setModel(model);

  return <DemoWidget model={model} engine={engine} />;
};
