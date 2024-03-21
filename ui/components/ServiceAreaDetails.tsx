import "./ServiceArea.css";

import { useState } from "react";
import { FunctionComponent } from "react";
import { MapPin, WarningIcon } from "./icons";

import type { ServiceAreaInfo } from "../../plugin/types";

interface ServiceAreaDetailsProps {
  serviceArea: ServiceAreaInfo;
  onGoBack: () => void;
  onHighlightAssets: (id: string[]) => void;
  onMoveToAssets: (id: string[]) => void;
  onSetValveSetting: (id: string, value: number) => void;
}

interface KeyPressureDetailsProps {
  title: string;
  value: number;
  locationId: string;
  onHighlightAssets: (id: string[]) => void;
  onMoveToAssets: (id: string[]) => void;
}

const KeyPressureDetails: FunctionComponent<KeyPressureDetailsProps> = ({
  title,
  value,
  locationId,
  onHighlightAssets,
  onMoveToAssets,
}) => {
  return (
    <div
      className="pressure-row-details valve-row-hover"
      onMouseOver={() => {
        onHighlightAssets([locationId]);
      }}
      onMouseLeave={() => {
        onHighlightAssets([]);
      }}
    >
      <div className="details-left">
        <p className="details-text">{title}</p>
        <div className="details-alignLeft">
          <p className="value-bold">{value.toFixed(1)}</p>
          <p className="value-unit">m</p>
        </div>
      </div>
      <div className="details-right">
        <p className="details-text">Location</p>
        <div className="details-alignRight">
          <p className="value-bold">{locationId}</p>
        </div>
      </div>
      <div
        className="details-right map-pin-right  valve-row-button"
        onClick={() => {
          onMoveToAssets([locationId]);
        }}
      >
        <MapPin />
      </div>
    </div>
  );
};

const ServiceAreaDetails: FunctionComponent<ServiceAreaDetailsProps> = ({
  serviceArea,
  onGoBack,
  onHighlightAssets,
  onMoveToAssets,
  onSetValveSetting,
}) => {
  const [inputValue, setInputValue] = useState(serviceArea.currentSetting);
  const isWarning =
    serviceArea.minCustomerPressure !== undefined &&
    serviceArea.minCustomerPressure < 20;

  const handleChange = (e) => {
    if (isNaN(e.target.value)) {
      setInputValue(serviceArea.currentSetting);
      return;
    }
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSetValveSetting(serviceArea.id, inputValue);
    }
  };

  const handleBlur = () => {
    onSetValveSetting(serviceArea.id, inputValue);
  };

  const hasData =
    serviceArea.currentSetting !== undefined &&
    serviceArea.minCustomerPressure !== undefined;
  return (
    <div className="valve-row-wrapper">
      <div className="valve-row">
        <div className="valve-row-content">
          <div className="valve-row-header">
            <h3 className="valveId">{serviceArea.id}</h3>
            <button
              className="valve-row-button fly-valve-icon"
              style={{ opacity: 1 }}
            >
              <MapPin />
            </button>
            <button
              className={`valve-row-button fly-valve-icon`}
              style={{ opacity: 1 }}
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
              <KeyPressureDetails
                title="Min. Cust. Pressure"
                value={serviceArea.minCustomerPressure}
                locationId={serviceArea.minCustomerId}
                onHighlightAssets={onHighlightAssets}
                onMoveToAssets={onMoveToAssets}
              />
              <KeyPressureDetails
                title="Max. Cust. Pressure"
                value={serviceArea.maxCustomerPressure}
                locationId={serviceArea.maxCustomerId}
                onHighlightAssets={onHighlightAssets}
                onMoveToAssets={onMoveToAssets}
              />
              <KeyPressureDetails
                title="Min. Area Pressure"
                value={serviceArea.minNodePressure}
                locationId={serviceArea.minNodeId}
                onHighlightAssets={onHighlightAssets}
                onMoveToAssets={onMoveToAssets}
              />

              <KeyPressureDetails
                title="Max. Area Pressure"
                value={serviceArea.maxNodePressure}
                locationId={serviceArea.maxNodeId}
                onHighlightAssets={onHighlightAssets}
                onMoveToAssets={onMoveToAssets}
              />
            </>
          ) : (
            <p className="details-text">
              PRV is not active at {serviceArea.currentTime}
            </p>
          )}
          <>
            <div
              role="separator"
              style={{
                borderTop: "1px solid rgb(53, 53, 75)",
                margin: "12px 0px",
              }}
            ></div>

            <div className="section-header" style={{ paddingBottom: "8px" }}>
              {" "}
              Valve setting{" "}
            </div>
            <p className="details-text" style={{ paddingBottom: "8px" }}>
              Apply a new setting from {serviceArea.currentTime}
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
                value={inputValue}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
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
