import "./ServiceArea.css";

import { FunctionComponent } from "react";
import { MapPin, CogIcon, WarningIcon } from "./icons";

export interface ServiceAreaProps {
  valveId: string;
  isWarning: boolean;
  currentTime: string;
  setting: number | undefined;
  minCustPressure: number | undefined;
  onSelectArea: () => void;
  onHighlightAssets: (id: string[] | undefined) => void;
  onMoveToAssets: (id: string[]) => void;
}

const ServiceArea: FunctionComponent<ServiceAreaProps> = ({
  valveId,
  isWarning,
  currentTime,
  setting,
  minCustPressure,
  onSelectArea,
  onHighlightAssets,
  onMoveToAssets,
}) => {
  const hasData = setting !== undefined && minCustPressure !== undefined;
  return (
    <div
      className="valve-row-wrapper"
      onMouseOver={() => {
        onHighlightAssets([valveId]);
      }}
      onMouseLeave={() => {
        onHighlightAssets(undefined);
      }}
    >
      <div className="valve-row  valve-row-hover">
        <div className="valve-row-content">
          <div className="valve-row-header">
            <h3 className="valveId">{valveId}</h3>
            <button
              className="valve-row-button fly-valve-icon"
              onClick={() => {
                onMoveToAssets([valveId]);
              }}
            >
              <MapPin />
            </button>
            <button
              className={`valve-row-button fly-valve-icon`}
              onClick={onSelectArea}
            >
              <CogIcon />
            </button>
          </div>

          {isWarning && (
            <div className="valve-warning">
              <WarningIcon />
              <p>Customer pressure low</p>
            </div>
          )}

          {hasData ? (
            <div className="valve-row-details">
              <div className="details-left">
                <p className="details-text">Setting at {currentTime}</p>
                <div className="details-alignLeft">
                  <p className="value-bold">{setting.toFixed(1)}</p>
                  <p className="value-unit">m</p>
                </div>
              </div>
              <div className="details-right">
                <p className="details-text">Min. Cust. Pressure</p>
                <div className="details-alignRight">
                  <p className="value-bold">{minCustPressure.toFixed(1)}</p>
                  <p className="value-unit">m</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="details-text">PRV is not active at {currentTime}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceArea;
