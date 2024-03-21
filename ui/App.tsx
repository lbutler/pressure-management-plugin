import React, { useState } from "react";
import { sendMessage } from "@qatium/plugin/ui";
import { Message } from "../plugin/types";
import ServiceArea from "./components/ServiceArea";
import type { ServiceAreaProps } from "./components/ServiceArea";
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

  console.log("pressure update:", pressureManagedAreas);

  // Helper function to handle conditional rendering
  const renderContent = () => {
    // If an area is selected, render ServiceAreaDetails with the selected area details
    if (selectedArea !== undefined && pressureManagedAreas !== undefined) {
      return (
        <ServiceAreaDetails
          serviceArea={pressureManagedAreas[selectedArea]}
          onGoBack={() => setSelectedArea(undefined)}
          onHighlightAssets={(id) => highlightAsset(id)}
          onMoveToAssets={(id) => moveToAsset(id)}
          onSetValveSetting={(id, value) =>
            console.log(`Setting Valve ${id} to setting ${value}`)
          }
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

  // const content = pressureManagedAreas ? (
  //   <ListServiceAreas
  //     serviceAreas={pressureManagedAreas}
  //     onSelectArea={setSelectedArea}
  //     onHighlightAssets={(id) => {
  //       console.log(`Highlight asset ${id}`);
  //     }}
  //     onMoveToAssets={(id) => {
  //       console.log(`Move to asset ${id}`);
  //     }}
  //   />
  // ) : (
  //   <p>Loading data...</p>
  // );

  // const serviceAreas: ServiceAreaProps[] = [
  //   {
  //     valveId: "PRV 1",
  //     isWarning: true,
  //     currentTime: "12:00",
  //     setting: 12,
  //     minCustPressure: 22,
  //   },
  //   {
  //     valveId: "PRV 2",
  //     isWarning: false,
  //     currentTime: "12:00",
  //     setting: undefined,
  //     minCustPressure: 20,
  //   },
  //   {
  //     valveId: "PRV 3",
  //     isWarning: false,
  //     currentTime: "12:00",
  //     setting: 15.3,
  //     minCustPressure: 26.5,
  //   },
  // ];

  return (
    <>
      <header className="header">
        <h3 className="title">Pressure Management</h3>
      </header>
      {renderContent()}
    </>
  );
}

export default App;
