import { onMessage } from "@qatium/plugin/ui";
import { useEffect, useState } from "react";
import { Message, ServiceArea } from "../plugin/types";

export const usePressureManagedAreas = () => {
  const [pressureManagedAreas, setPressureManagedAreas] =
    useState<ServiceArea[]>();

  useEffect(() => {
    const { removeListener } = onMessage<Message>((msg) => {
      if (msg.event !== "service-areas") {
        return;
      }

      if (!msg.serviceAreas) {
        return setPressureManagedAreas(undefined);
      }

      setPressureManagedAreas(msg.serviceAreas);
    });

    return removeListener;
  }, []);

  return pressureManagedAreas;
};
