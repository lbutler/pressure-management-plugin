import "./ServiceArea.css";

import React, { FunctionComponent } from "react";
import ServiceArea from "./ServiceArea";
import type { ServiceAreaProps } from "./ServiceArea";

interface ListServiceAreasProps {
  serviceAreas: ServiceAreaProps[];
  onSelectArea: (index: number) => void;
}

const ListServiceAreas: FunctionComponent<ListServiceAreasProps> = ({
  serviceAreas,
  onSelectArea,
}) => {
  return (
    <>
      {serviceAreas.map((area, index) => (
        <React.Fragment key={area.valveId}>
          <ServiceArea
            valveId={area.valveId}
            isWarning={area.isWarning}
            currentTime={area.currentTime}
            setting={area.setting}
            minCustPressure={area.minCustPressure}
            onSelectArea={() => onSelectArea(index)}
          />

          {index < serviceAreas.length - 1 && (
            <div
              role="separator"
              style={{
                borderTop: "1px solid rgb(53, 53, 75)",
                margin: "0px -8px",
              }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default ListServiceAreas;
