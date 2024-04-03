import { useState } from "react";
import { sendMessage } from "@qatium/plugin/ui";
import { Message } from "../plugin/types";
import ListServiceAreas from "./components/ListServiceAreas";
import ServiceAreaDetails from "./components/ServiceAreaDetails";
import "./App.css";
import { usePressureManagedAreas } from "./usePressureManagedAreas";

function App() {
  const pressureManagedAreas = usePressureManagedAreas();
  const [selectedArea, setSelectedArea] = useState<number | undefined>(
    undefined
  );

  const highlightAsset = (assets: string[]) => {
    sendMessage<Message>({
      event: "highlight-assets",
      assets,
    });
  };

  const moveToAsset = (assets: string[]) => {
    sendMessage<Message>({
      event: "move-to-assets",
      assets,
    });
  };

  const setValveSetting = (valveId: string, setting: number) => {
    sendMessage<Message>({
      event: "valve-setting",
      valveId,
      setting,
    });
  };

  const renderContent = () => {
    // If an area is selected, render ServiceAreaDetails with the selected area details
    if (selectedArea !== undefined && pressureManagedAreas !== undefined) {
      return (
        <ServiceAreaDetails
          serviceArea={pressureManagedAreas[selectedArea]}
          onGoBack={() => setSelectedArea(undefined)}
          onHighlightAssets={(id) => highlightAsset(id)}
          onMoveToAssets={(id) => moveToAsset(id)}
          onSetValveSetting={(id, value) => setValveSetting(id, value)}
        />
      );
    }

    // If pressureManagedAreas is loaded, render ListServiceAreas, else show loading state
    return pressureManagedAreas ? (
      <ListServiceAreas
        serviceAreas={pressureManagedAreas}
        onSelectArea={setSelectedArea}
        onHighlightAssets={(id) => highlightAsset(id)}
        onMoveToAssets={(id) => moveToAsset(id)}
      />
    ) : (
      <p>Loading data...</p>
    );
  };

  return <>{renderContent()}</>;
}

export default App;
