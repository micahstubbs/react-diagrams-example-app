import {
  DefaultPortModel,
  PathFindingLinkFactory
} from "@projectstorm/react-diagrams";

export default function({
  sourceNode,
  targetNode,
  engine,
  count,
  pathFinding
}) {
  //just to get id-like structure
  const sourcePort = sourceNode.addPort(
    new DefaultPortModel(true, `${sourceNode.name}-out-${count}`, "Out")
  );
  const targetPort = targetNode.addPort(
    new DefaultPortModel(false, `${sourceNode.name}-to-${count}`, "IN")
  );

  if (pathFinding) {
    return sourcePort.link(
      targetPort,
      engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME)
    );
  }
  return sourcePort.link(targetPort);
}
