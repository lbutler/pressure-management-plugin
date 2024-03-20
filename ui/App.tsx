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

  const content = pressureManagedAreas ? (
    <>
      {pressureManagedAreas.map((area) => (
        <ServiceArea key={area.id} />
        // <div key={area.id}>
        //   <h2>{area.id}</h2>
        //   <p>Current setting: {area.currentSetting}</p>
        //   <p>Current status: {area.currentStatus}</p>
        //   <p>Pipes in service area: {area.pipesInServiceArea.join(", ")}</p>
        //   <p>
        //     Min customer: {area.minCustomerId}, pressure:{" "}
        //     {area.minCustomerPressure}
        //   </p>
        //   <p>
        //     Min node: {area.minNodeId}, pressure: {area.minNodePressure}
        //   </p>
        //   <p>
        //     Max customer: {area.maxCustomerId}, pressure:{" "}
        //     {area.maxCustomerPressure}
        //   </p>
        //   <p>
        //     Max node: {area.maxNodeId}, pressure: {area.maxNodePressure}
        //   </p>
        // </div>
      ))}
    </>
  ) : (
    <p>First select a valve</p>
  );

  const serviceAreas: ServiceAreaProps[] = [
    {
      valveId: "PRV 1",
      isWarning: true,
      currentTime: "12:00",
      setting: 12,
      minCustPressure: 22,
    },
    {
      valveId: "PRV 2",
      isWarning: false,
      currentTime: "12:00",
      setting: undefined,
      minCustPressure: 20,
    },
    {
      valveId: "PRV 3",
      isWarning: false,
      currentTime: "12:00",
      setting: 15.3,
      minCustPressure: 26.5,
    },
  ];

  return (
    <>
      <header className="header">
        <h3 className="title">Pressure Management</h3>
      </header>
      <ServiceAreaDetails
        {...serviceAreas[0]}
        onGoBack={() => {
          setSelectedArea(undefined);
        }}
      />
      {/* {selectedArea === undefined ? (
        <ListServiceAreas
          serviceAreas={serviceAreas}
          onSelectArea={setSelectedArea}
        />
      ) : (
        <ServiceAreaDetails
          {...serviceAreas[selectedArea]}
          onGoBack={() => {
            setSelectedArea(undefined);
          }}
        />
      )} */}
    </>
  );
}

export default App;
