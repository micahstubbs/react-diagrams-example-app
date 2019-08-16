import createEngine, {
  DiagramModel,
  DagreEngine,
  PathFindingLinkFactory
} from "@projectstorm/react-diagrams";
import * as React from "react";
import { DemoButton, DemoWorkspaceWidget } from "../DemoWorkspaceWidget";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DemoCanvasWidget } from "../DemoCanvasWidget";
import createNode from "../../utils/createNode";
import connectNodes from "../../utils/connectNodes";
import graph from "../../data/miserables.json";

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

    // only happens if pathfinding is enabled (check line 25)
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
  //! 1) setup the diagram engine
  let engine = createEngine();

  //! 2) setup the diagram model
  let model = new DiagramModel();

  //! 3) create a default nodes

  // create an array to hold
  // react-diagram's representation of the nodes
  const nodes = [];
  const nodesHash = {};
  let reactDiagramNode;
  graph.nodes.forEach(node => {
    reactDiagramNode = createNode(node.id);
    nodes.push(reactDiagramNode);
    nodesHash[node.id] = reactDiagramNode;
  });

  //! 4) link nodes together
  // create an array to hold
  // react-diagram's represenation of the links
  const links = [];

  let reactDiagramLink;
  graph.links.forEach((link, i) => {
    const sourceKey = "source";
    const targetKey = "target";
    const sourceNode = nodesHash[link[sourceKey]];
    const targetNode = nodesHash[link[targetKey]];
    reactDiagramLink = connectNodes({
      sourceNode,
      targetNode,
      engine,
      count: count++,
      pathFinding: false
    });
    links.push(reactDiagramLink);
  });

  nodes.forEach((node, i) => {
    node.setPosition(i * 70, i * 70);
    model.addNode(node);
  });

  links.forEach(link => {
    model.addLink(link);
  });

  engine.setModel(model);

  return <DemoWidget model={model} engine={engine} />;
};
