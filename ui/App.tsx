import { sendMessage } from "@qatium/plugin/ui";
import { Message } from "../plugin/types";
import ServiceArea from "./components/ServiceArea";
import "./App.css";
import { usePressureManagedAreas } from "./usePressureManagedAreas";

function App() {
  const pressureManagedAreas = usePressureManagedAreas();

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

  return (
    <>
      <header className="header">
        <h3 className="title">Pressure Management</h3>
      </header>
      <ServiceArea />
      <div
        role="separator"
        style={{ borderTop: "1px solid rgb(53, 53, 75)", margin: "0px -8px" }}
      ></div>
      <ServiceArea />
    </>
  );
}

export default App;
