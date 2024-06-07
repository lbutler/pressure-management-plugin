import { ValveFamilies } from "@qatium/sdk";
import {
  Plugin,
  init
} from "@qatium/sdk/plugin";
import { Message } from "./types";

import { findServiceArea } from "./findServiceArea";

class MyPlugin implements Plugin {
  run() {
    // Get all PRVs
    const prvElements = sdk.network.getValves(
      (a) => a.family === ValveFamilies.PRV && !!a.simulation
    );

    const serviceAreas = prvElements.map((prv) => {
      return findServiceArea(prv);
    });

    sdk.ui.sendMessage({
      event: "service-areas",
      serviceAreas,
    });
  }

  onMessage(message: Message) {
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

init(new MyPlugin());
