import React, { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import Color from "../../shared/color";
import { LinearSettings, ProgressBar } from "../../model/json.model";
import { WatchProgressBar } from "../../model/watchFace.model";
import { BlockType, IRow, OptionsLineEndingLine } from "../../model/blocks.model";
import BlocksArrayComponent from "../../blocks/blocksArray.component";

interface IProps {
  progressBar: WatchProgressBar;
  onUpdate(progressBar: WatchProgressBar): void;
}

const ProgressbarLinearCodmponent: FC<IProps> = ({ progressBar, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: progressBar.jsonObj?.LinearSettings?.StartX ? progressBar.jsonObj.LinearSettings.StartX : 0, onChange: changeX },
        { title: 'Y', type: BlockType.Number, nvalue: progressBar.jsonObj?.LinearSettings?.StartY ? progressBar.jsonObj.LinearSettings.StartY : 0, onChange: changeY },
      ]
    },
    {
      blocks: [
        { title: 'Length', type: BlockType.Number, nvalue: progressBar.jsonObj?.LinearSettings?.EndX ? (progressBar.jsonObj.LinearSettings.EndX - progressBar.jsonObj.LinearSettings.StartX) : 0, onChange: changeLength },
        { title: 'Width', type: BlockType.Number, nvalue: progressBar.jsonObj?.Width ? progressBar.jsonObj.Width : 0, onChange: changeWidth, min: 0 },
      ]
    },
    {
      blocks: [
        { title: 'Foreground', type: BlockType.SelectFile, nvalue: progressBar.jsonObj?.ForegroundImageIndex, onChange: changeForegroundImageIndex },
        { title: 'Color', type: BlockType.Color, svalue: progressBar.jsonObj?.Color ? Color.colorRead(progressBar.jsonObj.Color) : Color.DEFAULT_COLOR, onChange: changeColor },
      ]
    },
    {
      blocks: [
        { title: 'Line ending', type: BlockType.Select, svalue: progressBar.jsonObj?.Flatness ? progressBar.jsonObj.Flatness.toString() : '0', onChange: changeLineEnding, selectOptions: OptionsLineEndingLine },
      ]
    },
    {
      blocks: [
        { title: 'Pointer', type: BlockType.SelectFile, nvalue: progressBar.jsonObj?.PointerImageIndex, onChange: changePointerImageIndex },
        { title: 'Background image', type: BlockType.SelectFile, nvalue: progressBar.jsonObj?.BackgroundImageIndex, onChange: changeBackgroundImageIndex },
      ]
    },
   ], [progressBar]) // eslint-disable-line react-hooks/exhaustive-deps

  
   function toggle() {
    const pb = { ...progressBar };
    pb.enabledLinear = !pb.enabledLinear;
    if (!pb.jsonObj)
      pb.jsonObj = new ProgressBar();
    if (!pb.jsonObj.LinearSettings)
      pb.jsonObj.LinearSettings = new LinearSettings();
    onUpdate(pb);
  }

  function changeX(val: number) {
    const d = { ...progressBar };
    d.jsonObj.LinearSettings.StartX = val;
    onUpdate(d);
  }

  function changeY(val: number) {
    const d = { ...progressBar };
    d.jsonObj.LinearSettings.StartY = val;
    d.jsonObj.LinearSettings.EndY = val;
    onUpdate(d);
  }

  function changeLength(val: number) {
    const d = { ...progressBar };
    let start = d.jsonObj?.LinearSettings?.StartX ? d.jsonObj.LinearSettings.StartX : 0
    d.jsonObj.LinearSettings.EndX = start + Math.abs(val);
    onUpdate(d);
  }

  function changeWidth(val: number) {
    const d = { ...progressBar };
    d.jsonObj.Width = Math.max(0, val);
    onUpdate(d)
  }

  function changeForegroundImageIndex(i: number) {
    const ip = { ...progressBar };
    ip.jsonObj.ForegroundImageIndex = i;
    onUpdate(ip);
  }

  function changeColor(color: string) {
    const d = { ...progressBar };
    d.jsonObj.Color = Color.colorWrite(color);
    onUpdate(d);
  }

  function changePointerImageIndex(i: number) {
    const ip = { ...progressBar };
    ip.jsonObj.PointerImageIndex = i;
    onUpdate(ip);
  }

  function changeBackgroundImageIndex(i: number) {
    const ip = { ...progressBar };
    ip.jsonObj.BackgroundImageIndex = i;
    onUpdate(ip);
  }


  function changeLineEnding(val: string) {
    const pBar = { ...progressBar };
    const value = parseInt(val);
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
              onChange={toggle}
            />
          </div>
        </div>
      </Card.Header>
      {progressBar.enabledLinear ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ProgressbarLinearCodmponent;
