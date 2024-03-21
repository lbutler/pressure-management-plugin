import { Valve, ValveStatus } from "@qatium/plugin/engine";

export interface ServiceAreaInfo {
  id: string;
  currentTime: string;
  currentSetting: number | undefined;
  currentStatus: ValveStatus | undefined;
  pipesInServiceArea: string[];
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
