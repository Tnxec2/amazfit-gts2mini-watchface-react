import React, { FC } from "react";
import { Card } from "react-bootstrap";
import Color from "../../shared/color";
import SelectFileListComponent from "../../shared/selectFileList.component";
import { LinearSettings, ProgressBar } from "../model/json.model";
import { WatchProgressBar } from "../model/watchFace.model";

interface IProps {
  progressBar: WatchProgressBar;
  onUpdate(progressBar: WatchProgressBar): void;
}

const ProgressbarLinearCodmponent: FC<IProps> = ({ progressBar, onUpdate }) => {
  function changeLineEnding(e: React.ChangeEvent<HTMLSelectElement>) {
    const pBar = { ...progressBar };
    const value = parseInt(e.target.value);
    if (!isNaN(value)) pBar.jsonObj.Flatness = value;
    else pBar.jsonObj.Flatness = 0;
    onUpdate(pBar);
  }
  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">Progress linear</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={progressBar.enabledLinear}
              onChange={() => {
                const pb = { ...progressBar };
                pb.enabledLinear = !pb.enabledLinear;
                if (!pb.jsonObj) pb.jsonObj = new ProgressBar();
                if (!pb.jsonObj.LinearSettings)
                  pb.jsonObj.LinearSettings = new LinearSettings();
                onUpdate(pb);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {progressBar.enabledLinear ? (
        <Card.Body>
          <div className="input-group input-group-sm flex-nowrap mb-1 mt-1">
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={progressBar.jsonObj.LinearSettings.StartX}
              onChange={(e) => {
                const d = { ...progressBar };
                const v = parseInt(e.target.value);
                if (!isNaN(v)) {
                  d.jsonObj.LinearSettings.StartX = v;
                  onUpdate(d);
                }
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={progressBar.jsonObj.LinearSettings.StartY}
              onChange={(e) => {
                const d = { ...progressBar };
                const v = parseInt(e.target.value);
                if (!isNaN(v)) {
                  d.jsonObj.LinearSettings.StartY = v;
                  d.jsonObj.LinearSettings.EndY = v;
                  onUpdate(d);
                }
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Length
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={
                progressBar.jsonObj.LinearSettings.EndX -
                progressBar.jsonObj.LinearSettings.StartX
              }
              onChange={(e) => {
                const d = { ...progressBar };
                const v = parseInt(e.target.value);
                if (!isNaN(v)) {
                  d.jsonObj.LinearSettings.EndX =
                    d.jsonObj.LinearSettings.StartX + v;
                  onUpdate(d);
                }
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Width
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={progressBar.jsonObj.Width}
              onChange={(e) => {
                const d = { ...progressBar };
                const v = parseInt(e.target.value);
                if (!isNaN(v)) {
                  d.jsonObj.Width = Math.max(0, v);
                  onUpdate(d);
                }
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">Image</span>
            <SelectFileListComponent
              setSelectedFileIndex={(i) => {
                const ip = { ...progressBar };
                ip.jsonObj.ForegroundImageIndex = i;
                onUpdate(ip);
              }}
              imageIndex={progressBar.jsonObj.ForegroundImageIndex}
            />
            <span className="input-group-text">Color</span>
            <div className="input-group-text">
              <input
                type="color"
                className="form-control form-control-sm"
                style={{ width: 40 }}
                value={Color.colorRead(progressBar.jsonObj.Color)}
                onChange={(e) => {
                  const d = { ...progressBar };
                  d.jsonObj.Color = Color.colorWrite(e.target.value);
                  onUpdate(d);
                }}
                defaultValue="#000000"
                title="Choose progress bar color"
              />
            </div>
            <span className="input-group-text" id="addon-wrapping">
              Line ending
            </span>
            <div className="input-group-text">
              <select
                className="form-select form-select-sm"
                onChange={changeLineEnding}
              >
                <option value="0" selected={progressBar.jsonObj.Flatness === 0}>
                  Circle
                </option>
                <option
                  value="180"
                  selected={progressBar.jsonObj.Flatness === 180}
                >
                  Flat
                </option>
              </select>
            </div>
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">Pointer</span>
            <SelectFileListComponent
              setSelectedFileIndex={(i) => {
                const ip = { ...progressBar };
                ip.jsonObj.PointerImageIndex = i;
                onUpdate(ip);
              }}
              imageIndex={progressBar.jsonObj.PointerImageIndex}
            />
            <span className="input-group-text">Background</span>
            <SelectFileListComponent
              setSelectedFileIndex={(i) => {
                const ip = { ...progressBar };
                ip.jsonObj.BackgroundImageIndex = i;
                onUpdate(ip);
              }}
              imageIndex={progressBar.jsonObj.BackgroundImageIndex}
            />
          </div>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ProgressbarLinearCodmponent;
