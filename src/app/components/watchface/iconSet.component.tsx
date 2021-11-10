import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchIconSet } from "../../model/watchFace.gts2mini.model";

interface IProps {
  title: string;
  iconSet: WatchIconSet;
  onUpdate(iconSet: WatchIconSet): void;
}

const IconSetComponent: FC<IProps> = ({ title, iconSet, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, nvalue: iconSet.json.ImageIndex, onChange: onChangeImageIndex },
      ]
    },
  ], [iconSet]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeImageIndex(index: number) {
    const ip = { ...iconSet };
    ip.json.ImageIndex = index;
    onUpdate(ip);
  }

  function addCoordinates() {
    const ip = { ...iconSet };
    if (!ip.json.Coordinates) ip.json.Coordinates = []
    let lastCoords = ip.json.Coordinates[ip.json.Coordinates.length-1]
    ip.json.Coordinates.push( {
      X: lastCoords.X,
      Y: lastCoords.Y,
    })
    onUpdate(ip);
  }

  function deleteCoordinates(index: number) {
    if ( window.confirm('Are you sure to delete this?')) {
      const ip = { ...iconSet };
      ip.json.Coordinates.splice(index, 1);
      onUpdate(ip);
    }
  }

  function onChangeX(index: number, val: number) {
    const ip = { ...iconSet };
    if (!ip.json.Coordinates) ip.json.Coordinates = []
    ip.json.Coordinates[index].X = val
    onUpdate(ip);
  }

  function onChangeY(index: number, val: number) {
    const ip = { ...iconSet };
    if (!ip.json.Coordinates) ip.json.Coordinates = []
    ip.json.Coordinates[index].X = val
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
              checked={iconSet.enabled}
              onChange={() => {
                const ic = { ...iconSet };
                if (!ic.json.Coordinates) ic.json.Coordinates = []
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {iconSet.enabled ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
          <button className="btn btn-outline-success" type="button" onClick={addCoordinates}>Add</button>
          { iconSet.json.Coordinates.map((item, index) => 
            <BlocksArrayComponent ar={[
              {
                blocks: [
                  { title: 'X', type: BlockType.Number, nvalue: item.X, onChange: (val) => onChangeX(index, val) },
                  { title: 'Y', type: BlockType.Number, nvalue: item.Y, onChange: (val) => onChangeY(index, val) },
                  { title: 'Del', type: BlockType.Button, disabled: iconSet.json.Coordinates.length === 0, className: 'btn-outline-danger', onClick: (e) => deleteCoordinates(index) },
                ]
              }
            ]} />
          ) }
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default IconSetComponent;
