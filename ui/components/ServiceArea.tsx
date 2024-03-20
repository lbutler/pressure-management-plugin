import "./ServiceArea.css";

function ServiceArea() {
  return (
    <>
      <div className="tank-row-wrapper">
        <a>
          <div className="tank-row">
            <div className="tank-row-padding">
              <div className="tank-row-title">
                <h1 className="tankId">Cocklebay</h1>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fly-tank-icon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 14C7 14 12 9 12 5C12 2.23858 9.76142 0 7 0C4.23858 0 2 2.23858 2 5C2 9 7 14 7 14ZM7 8C8.65685 8 10 6.65685 10 5C10 3.34315 8.65685 2 7 2C5.34315 2 4 3.34315 4 5C4 6.65685 5.34315 8 7 8Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div className="tank-row-details">
                <div className="tank-row-details-col">
                  <div className="tank-row-details-info">
                    <p className="tank-row-details-value-left">
                      Setting at 23:00
                    </p>
                  </div>
                  <div className="demand">
                    <p className="tank-row-details-value-left value-bold">
                      25.0
                    </p>
                    <p className="tank-row-details-value-left value-unit">m</p>
                  </div>
                </div>
                <div className="tank-row-details-col">
                  <div className="tank-row-details-info">
                    <p className="tank-row-details-value-right">
                      Min. Cust. Pressure
                    </p>
                  </div>
                  <div className="tank-row-details-info">
                    <p className="tank-row-details-value-right value-bold">
                      26 m
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

export default ServiceArea;
