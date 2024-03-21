import { Valve, SDK, Asset, Junction } from "@qatium/plugin/engine";

import type { ServiceAreaInfo } from "./types";

function findServiceArea(prv: Valve, sdk: SDK): ServiceAreaInfo {
  const timeObject = sdk.network.getTime();
  const timeString = timeObject.time.toLocaleTimeString("en-US", {
    timeZone: timeObject.timezone,
    hour: "2-digit",
    minute: "2-digit",
    //@ts-ignore
    hourCycle: "h23",
  });
  if (prv.simulation?.status !== "ACTIVE") {
    return {
      id: prv.id,
      currentTime: timeString,
      currentSetting: prv.simulation?.setting,
      currentStatus: prv.simulation?.status,
      pipesInServiceArea: [prv.id],
      minCustomerId: undefined,
      minCustomerPressure: undefined,
      minNodeId: undefined,
      minNodePressure: undefined,
      maxCustomerId: undefined,
      maxCustomerPressure: undefined,
      maxNodeId: undefined,
      maxNodePressure: undefined,
    };
  }

  const neighborAssets = sdk.network.getNeighborAssets(prv.id);
  const downstreamNode = findDownstreamNode(neighborAssets, sdk);
  const connectedAssets = sdk.network.getConnectedAssets(
    [downstreamNode],
    (asset) => {
      return (
        (asset.type === "Valve" && asset.family !== "TCV") ||
        (asset.type === "Valve" && asset.status === "CLOSED") ||
        asset.type === "SupplySource" ||
        asset.type === "Tank" ||
        asset.type === "Pump"
      );
    }
  );

  const pipesInServiceArea = connectedAssets
    .filter((a) => a.type === "Pipe")
    .map((a) => a.id);

  const servicePressures = findServicePressures(connectedAssets);

  return {
    id: prv.id,
    currentSetting: prv.simulation?.setting,
    currentStatus: prv.simulation?.status,
    currentTime: timeString,
    pipesInServiceArea: pipesInServiceArea,
    //assestsInServiceArea: connectedAssets,
    ...servicePressures,
  };
}

function findDownstreamNode(assets: Asset[], sdk: SDK): string {
  const junctions = assets
    .map((a) =>
      sdk.network.getNeighborAssets(a.id).filter((n) => n.type === "Junction")
    )
    //@ts-ignore
    .flat();

  const lowestJunction = junctions.reduce(
    (acc: Junction, junction: Junction) => {
      if (!acc.simulation || !junction.simulation) {
        return acc;
      }
      const junctionElevation = junction.elevation;
      const junctionPressure = junction.simulation.pressure;
      const accElevation = acc.elevation;
      const accPressure = acc.simulation.pressure;

      if (junctionElevation + junctionPressure < accElevation + accPressure) {
        return junction;
      }

      return acc;
    },
    junctions[0] as Asset
  );

  return lowestJunction.id;
}

function findServicePressures(connectedAssets: Asset[]) {
  const customerNodes = connectedAssets.filter(
    (a) => a.group === "customerPoint"
  );
  const nodes = connectedAssets.filter((a) => a.type === "Junction");

  const minCustomer = getByPressure(customerNodes);
  const minNode = getByPressure(nodes);
  const maxCustomer = getByPressure(customerNodes, false);
  const maxNode = getByPressure(nodes, false);

  return {
    minCustomerId: minCustomer.id,
    minCustomerPressure: minCustomer.simulation?.pressure,
    minNodeId: minNode.id,
    minNodePressure: minNode.simulation?.pressure,
    maxCustomerId: maxCustomer.id,
    maxCustomerPressure: maxCustomer.simulation?.pressure,
    maxNodeId: maxNode.id,
    maxNodePressure: maxNode.simulation?.pressure,
  };
}

function getByPressure(nodes: Asset[], findMin: boolean = true): Asset {
  return nodes.reduce((prev, current) => {
    // If one of the nodes doesn't have a simulation object, return the other node
    if (!prev.simulation) return current;
    if (!current.simulation) return prev;

    // Compare based on whether finding min or max
    const comparisonResult =
      prev.simulation.pressure < current.simulation.pressure;
    return findMin
      ? comparisonResult
        ? prev
        : current
      : comparisonResult
      ? current
      : prev;
  });
}

export { findServiceArea };
