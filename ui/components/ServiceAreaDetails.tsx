import "./ServiceArea.css";

import { FunctionComponent } from "react";
import { MapPin, CogIcon, WarningIcon } from "./icons";

interface ServiceAreaProps {
  valveId: string;
  isWarning: boolean;
  currentTime: string;
  setting: number | undefined;
  minCustPressure: number | undefined;
  onGoBack: () => void;
}

const ServiceAreaDetails: FunctionComponent<ServiceAreaProps> = ({
  valveId,
  isWarning,
  currentTime,
  setting,
  minCustPressure,
  onGoBack,
}) => {
  const hasData = setting !== undefined && minCustPressure !== undefined;
  return (
    <div className="valve-row-wrapper">
      <div className="valve-row">
        <div className="valve-row-content">
          <div className="valve-row-header">
            <h3 className="valveId">{valveId}</h3>
            <button
              className="valve-row-button fly-valve-icon"
              style={{ opacity: 1 }}
            >
              <MapPin />
            </button>
            <button
              className={`valve-row-button fly-valve-icon ${
                !hasData ? "disable-icon-button" : ""
              }`}
              style={{ opacity: 1 }}
              disabled={!hasData}
              onClick={onGoBack}
            >
              Back
            </button>
          </div>

          {isWarning && (
            <div className="valve-warning">
              <WarningIcon />
              <p>Customer pressure low</p>
            </div>
          )}

          {hasData ? (
            <>
              <div className="section-header"> Key Pressures </div>
              <div className="pressure-row-details">
                <div className="details-left">
                  <p className="details-text">Max. Node Pressure</p>
                  <div className="details-alignLeft">
                    <p className="value-bold">{setting.toFixed(1)}</p>
                    <p className="value-unit">m</p>
                  </div>
                </div>
                <div className="details-right">
                  <p className="details-text">Location</p>
                  <div className="details-alignRight">
                    <p className="value-bold">J12234</p>
                  </div>
                </div>
                <div className="details-right map-pin-right">
                  <MapPin />
                </div>
              </div>

              <div className="pressure-row-details">
                <div className="details-left">
                  <p className="details-text">Max. Node Pressure</p>
                  <div className="details-alignLeft">
                    <p className="value-bold">{setting.toFixed(1)}</p>
                    <p className="value-unit">m</p>
                  </div>
                </div>
                <div className="details-right">
                  <p className="details-text">Location</p>
                  <div className="details-alignRight">
                    <p className="value-bold">J12234</p>
                  </div>
                </div>
                <div className="details-right map-pin-right">
                  <MapPin />
                </div>
              </div>
            </>
          ) : (
            <p className="details-text">PRV is not active at {currentTime}</p>
          )}
          <>
            <div className="section-header"> Key Pressures </div>
            <div className="key-pressures">
              <a className="key-pressure-link" role="link">
                <span className="key-pressure-type">Min Cust. Pressure:</span>
                <span className="key-pressure-type">J1234</span>

                <button
                  className="valve-row-button fly-valve-icon"
                  style={{ opacity: 1 }}
                >
                  <MapPin />
                </button>
              </a>
              <a className="key-pressure-link" role="link">
                <span className="key-pressure-type">Max Cust. Pressure:</span>
                <span className="key-pressure-type">J12sd34</span>

                <button
                  className="valve-row-button fly-valve-icon"
                  style={{ opacity: 1 }}
                >
                  <MapPin />
                </button>
              </a>
              <a className="key-pressure-link" role="link">
                <span className="key-pressure-type">Min Node Pressure:</span>
                <span className="key-pressure-type">J12sd34</span>

                <button
                  className="valve-row-button fly-valve-icon"
                  style={{ opacity: 1 }}
                >
                  <MapPin />
                </button>
              </a>
            </div>
            <div
              role="separator"
              style={{
                borderTop: "1px solid rgb(53, 53, 75)",
                margin: "0px -8px",
              }}
            ></div>
            <p className="details-text">
              Apply a new setting from {currentTime}
            </p>

            <div className="input-wrapper has-addon">
              <input
                className="number-input"
                type="text"
                id="demandSpikeInput"
                inputMode="numeric"
                placeholder="0"
                enterKeyHint="enter"
                aria-describedby="addon-demandSpikeInput"
                value="0"
              />
              <span className="input-addon">m</span>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreaDetails;
