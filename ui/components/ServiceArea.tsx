import "./ServiceArea.css";

import { MapPin, CogIcon } from "./icons";

function ServiceArea() {
  return (
    <div className="tank-row-wrapper">
      <div className="tank-row">
        <div className="tank-row-content">
          <div className="tank-row-header">
            <h3 className="tankId">Cocklebay</h3>
            <button className="tank-row-button fly-tank-icon">
              <MapPin />
            </button>
            <button className="tank-row-button  fly-tank-icon">
              <CogIcon />
            </button>
          </div>
          <div className="tank-row-details">
            <div className="details-left">
              <p className="details-text">Setting at 23:00</p>
              <div className="details-alignLeft">
                <p className="value-bold">25.0</p>
                <p className="value-unit">m</p>
              </div>
            </div>
            <div className="details-right">
              <p className="details-text">Min. Cust. Pressure</p>
              <div className="details-alignRight">
                <p className="value-bold">26.3</p>
                <p className="value-unit">m</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceArea;
