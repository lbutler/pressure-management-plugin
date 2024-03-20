import { SDK, Valve, ValveStatus } from "@qatium/plugin";

//export type SelectedElement = ReturnType<SDK["map"]["getSelectedElement"]>

export interface ServiceArea {
  id: string;
  currentSetting: number;
  currentStatus: ValveStatus;
  pipesInServiceArea: string[];
  //assestsInServiceArea: Asset[];
  minCustomerId: string;
  minCustomerPressure: number | undefined;
  minNodeId: string;
  minNodePressure: number | undefined;
  maxCustomerId: string;
  maxCustomerPressure: number | undefined;
  maxNodeId: string;
  maxNodePressure: number | undefined;
}

export type Message = {
  event: "service-areas";
  serviceAreas: ServiceArea[];
};

//export type Message =
//  | {
//    event: "selected-element",
//    selectedElement: SelectedElement
//  }
//  | {
//    event: "close-valve",
//    valveId: Valve["id"]
//  }
