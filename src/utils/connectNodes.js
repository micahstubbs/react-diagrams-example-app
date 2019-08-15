import { DefaultPortModel } from "@projectstorm/react-diagrams";

export default function(nodeFrom, nodeTo, engine, count) {
  //just to get id-like structure
  const portOut = nodeFrom.addPort(
    new DefaultPortModel(true, `${nodeFrom.name}-out-${count}`, "Out")
  );
  const portTo = nodeTo.addPort(
    new DefaultPortModel(false, `${nodeFrom.name}-to-${count}`, "IN")
  );
  return portOut.link(portTo);

  // ################# UNCOMMENT THIS LINE FOR PATH FINDING #############################
  // return portOut.link(
  //   portTo,
  //   engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME)
  // );
  // #####################################################################################
}
