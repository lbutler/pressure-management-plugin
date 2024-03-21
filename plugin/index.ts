import {
  PluginI,
  SDK,
  ValveFamilies,
  AssetStatus,
} from "@qatium/plugin/engine";
import { Message } from "./types";

import { findServiceArea } from "./findServiceArea";

class Plugin implements PluginI<Message> {
  selectedElement: ReturnType<SDK["map"]["getSelectedElement"]>;

  run(sdk: SDK) {
    // Get all PRVs
    const prvElements = sdk.network.getValves(
      (a) => a.family === ValveFamilies.PRV && !!a.simulation
    );

    const serviceAreas = prvElements
      .map((prv) => {
        return findServiceArea(prv, sdk);
      })
      .filter((a) => a) as Message["serviceAreas"];

    sdk.ui.sendMessage({
      event: "service-areas",
      serviceAreas,
    });
  }

  onMessage(sdk: SDK, message: Message) {
    switch (message.event) {
      case "highlight-assets":
        return sdk.map.setHighlights(message.assets);

      case "move-to-assets":
        return sdk.map.fitTo(message.assets, {
          flightDuration: 5000,
          maxZoom: 20,
          padding: {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100,
          },
        });

      case "valve-setting":
        return sdk.network.setSetting(message.valveId, message.setting);

      default:
        return;
    }
  }
}

register(new Plugin());
