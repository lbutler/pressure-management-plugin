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

    const newSelectedElement = sdk.map.getSelectedElement();

    if (newSelectedElement?.id === this.selectedElement?.id) {
      return;
    }

    this.selectedElement = newSelectedElement;

    return sdk.ui.sendMessage<Message>({
      event: "selected-element",
      selectedElement: newSelectedElement,
    });
  }

  onMessage(sdk: SDK, message: Message) {
    if (message.event !== "close-valve") {
      return;
    }

    return sdk.network.setStatus(message.valveId, "CLOSED");
  }
}

register(new Plugin());
