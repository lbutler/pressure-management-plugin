import { SDK, Valve, ValveStatus } from "@qatium/plugin";

//export type SelectedElement = ReturnType<SDK["map"]["getSelectedElement"]>

export interface ServiceAreaInfo {
  id: string;
  currentTime: string;
  currentSetting: number;
  currentStatus: ValveStatus;
  pipesInServiceArea: string[];
  //assestsInServiceArea: Asset[];
  minCustomerId: string | undefined;
  minCustomerPressure: number | undefined;
  minNodeId: string | undefined;
  minNodePressure: number | undefined;
  maxCustomerId: string | undefined;
  maxCustomerPressure: number | undefined;
  maxNodeId: string | undefined;
  maxNodePressure: number | undefined;
}

export type Message =
  | {
      event: "service-areas";
      serviceAreas: ServiceAreaInfo[];
    }
  | {
      event: "highlight-assets";
      assets: string[];
    }
  | {
      event: "move-to-assets";
      assets: string[];
    }
  | {
      event: "valve-setting";
      valveId: Valve["id"];
      setting: number;
    };

//export type Message =
//  | {
//    event: "selected-element",
//    selectedElement: SelectedElement
//  }
//
