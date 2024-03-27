import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchSwitch } from "../../model/watchFace.gts2mini.model";

interface IProps {
  title: string;
  sw: WatchSwitch;
  onUpdate(sw: WatchSwitch): void;
}

const SwitchComponent: FC<IProps> = ({ title, sw, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image ON', type: BlockType.SelectFile, nvalue: sw.json.ImageIndexOn, onChange: onChangeImageOn },
        { title: 'Image OFF', type: BlockType.SelectFile, nvalue: sw.json.ImageIndexOff, onChange: onChangeImageOff },
      ]
    },
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: sw.json.Coordinates.X, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: sw.json.Coordinates.Y, onChange: onChangeY },
      ]
    }
  ], [sw]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeImageOn(index: number) {
    const ip = { ...sw };
    ip.json.ImageIndexOn = index;
    onUpdate(ip);
  }

  function onChangeImageOff(index: number) {
    const ip = { ...sw };
    ip.json.ImageIndexOff = index;
    onUpdate(ip);
  }

  function onChangeX(val: number) {
    const ip = { ...sw };
    ip.json.Coordinates.X = val;
    onUpdate(ip);
  }

  function onChangeY(val: number) {
    const ip = { ...sw };
    ip.json.Coordinates.Y = val;
    onUpdate(ip);
  }

  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={sw.enabled}
              onChange={() => {
                const ic = { ...sw };
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {sw.enabled ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default SwitchComponent;
