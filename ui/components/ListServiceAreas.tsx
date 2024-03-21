import "./ServiceArea.css";

import React, { FunctionComponent } from "react";
import ServiceArea from "./ServiceArea";
//import type { ServiceAreaProps } from "./ServiceArea";

import type { ServiceAreaInfo } from "../../plugin/types";

interface ListServiceAreasProps {
  serviceAreas: ServiceAreaInfo[];
  onSelectArea: (index: number) => void;
  onHighlightAssets: (id: string[]) => void;
  onMoveToAssets: (id: string[]) => void;
}

const ListServiceAreas: FunctionComponent<ListServiceAreasProps> = ({
  serviceAreas,
  onSelectArea,
  onHighlightAssets,
  onMoveToAssets,
}) => {
  return (
    <>
      {serviceAreas.map((area, index) => (
        <React.Fragment key={area.id}>
          <ServiceArea
            valveId={area.id}
            currentTime={area.currentTime}
            setting={area.currentSetting}
            minCustPressure={area.minCustomerPressure}
            pipesInServiceArea={area.pipesInServiceArea}
            onSelectArea={() => onSelectArea(index)}
            onHighlightAssets={onHighlightAssets}
            onMoveToAssets={onMoveToAssets}
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
