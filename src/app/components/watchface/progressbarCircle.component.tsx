import React, { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow, OptionsLineEndingCircle } from "../../model/blocks.model";
import { AngleSettings, ProgressBar } from "../../model/json.model";
import { WatchProgressBar } from "../../model/watchFace.model";
import Color from "../../shared/color";

interface IProps {
  progressBar: WatchProgressBar;
  onUpdate(progressBar: WatchProgressBar): void;
}

const ProgressbarCircleCodmponent: FC<IProps> = ({ progressBar, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Center', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: progressBar.jsonObj?.AngleSettings?.X ? progressBar.jsonObj.AngleSettings.X : 0, onChange: changeX },
        { title: 'Y', type: BlockType.Number, nvalue: progressBar.jsonObj?.AngleSettings?.Y ? progressBar.jsonObj.AngleSettings.Y : 0, onChange: changeY },
      ]
    },
    {
      blocks: [
        { title: 'Radius', type: BlockType.Number, nvalue: progressBar.jsonObj?.AngleSettings?.Radius ? progressBar.jsonObj.AngleSettings.Radius : 0, onChange: changeRadius },
        { title: 'Width', type: BlockType.Number, nvalue: progressBar.jsonObj?.Width ? progressBar.jsonObj.Width : 0, onChange: changeWidth, min: 0, max: 100 },
      ]
    },
    {
      blocks: [
        { title: 'Start angle', type: BlockType.Number, nvalue: progressBar.jsonObj?.AngleSettings?.StartAngle ? progressBar.jsonObj.AngleSettings.StartAngle : 0, onChange: changeStartAngle },
        { title: 'End angle', type: BlockType.Number, nvalue: progressBar.jsonObj?.AngleSettings?.EndAngle ? progressBar.jsonObj.AngleSettings.EndAngle : 0, onChange: changeEndAngle },
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
        { title: 'Line ending', type: BlockType.Select, svalue: progressBar.jsonObj?.Flatness ? progressBar.jsonObj.Flatness.toString() : '0', onChange: changeLineEnding, selectOptions: OptionsLineEndingCircle },
      ]
    },
    {
      blocks: [
        { title: 'Pointer', type: BlockType.SelectFile, nvalue: progressBar.jsonObj?.PointerImageIndex, onChange: changePointerImageIndex },
        { title: 'Background image', type: BlockType.SelectFile, nvalue: progressBar.jsonObj?.BackgroundImageIndex, onChange: changeBackgroundImageIndex },
      ]
    },
   ], [progressBar]) // eslint-disable-line react-hooks/exhaustive-deps

  function changeLineEnding(val: string) {
    const pBar = { ...progressBar };
    pBar.jsonObj.Flatness = parseInt(val)
    onUpdate(pBar);
  }

  function toggle() {
    const pb = { ...progressBar };
    pb.enabledCircle = !pb.enabledCircle;
    if (!pb.jsonObj)
      pb.jsonObj = new ProgressBar();
    if (!pb.jsonObj.AngleSettings)
      pb.jsonObj.AngleSettings = new AngleSettings();
    onUpdate(pb);
  }

  function changeX(val: number) {
    const d = { ...progressBar };
    d.jsonObj.AngleSettings.X = val;
    onUpdate(d);
  }

  function changeY(val: number) {
    const d = { ...progressBar };
    d.jsonObj.AngleSettings.Y = val;
    onUpdate(d);
  }

  function changeRadius(val: number) {
    const d = { ...progressBar };
    d.jsonObj.AngleSettings.Radius = Math.abs(val);
    onUpdate(d);
  }

  function changeWidth(val: number) {
    const d = { ...progressBar };
    d.jsonObj.Width = Math.max(0, Math.min(val, 100));
    onUpdate(d)
  }

  function changeStartAngle(val: number) {
    const d = { ...progressBar };
    d.jsonObj.AngleSettings.StartAngle = val;
    onUpdate(d)
  }

  function changeEndAngle(val: number) {
    const d = { ...progressBar };
    d.jsonObj.AngleSettings.EndAngle = val;
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

  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">Progress circle</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={progressBar.enabledCircle}
              onChange={toggle}
            />
          </div>
        </div>
      </Card.Header>
      {progressBar.enabledCircle ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ProgressbarCircleCodmponent;
