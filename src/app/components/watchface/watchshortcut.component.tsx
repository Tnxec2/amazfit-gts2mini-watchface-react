import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchShortcutElement, } from "../../model/watchFace.gts2mini.model";

interface IProps {
  title: string,
  shortcut: WatchShortcutElement,
  onUpdate(shortcut: WatchShortcutElement): void
}

const WatchShortCutComponent: FC<IProps> = ({title, shortcut, onUpdate}) => {
  
  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: shortcut.json?.TopLeftX ? shortcut.json.TopLeftX : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: shortcut.json?.TopLeftY ? shortcut.json.TopLeftY : 0, onChange: onChangeY },
      ]
    },
    {
      blocks: [
        { title: 'BottomRightX', type: BlockType.Number, nvalue: shortcut.json?.BottomRightX ? shortcut.json?.BottomRightX : 0, onChange: onChangeBottomRightX },
        { title: 'BottomRightY', type: BlockType.Number, nvalue: shortcut.json?.BottomRightY ? shortcut.json?.BottomRightY : 0, onChange: onChangeBottomRightY },
      ]
    }
  ], [shortcut]) // eslint-disable-line react-hooks/exhaustive-deps


  function onChangeX(val: number) {
    const d = {...shortcut};
    
    let width = d.json.BottomRightX && d.json.TopLeftX ? d.json.BottomRightX - d.json.TopLeftX : 1
    d.json.TopLeftX = val;
    d.json.BottomRightX = val + width
    onUpdate(d);
  }

  function onChangeY(val: number) {
    const d = {...shortcut};
    let height = d.json.BottomRightY && d.json.TopLeftY ? d.json.BottomRightY - d.json.TopLeftY : 1
    d.json.TopLeftY = val;
    d.json.BottomRightY = val + height
    onUpdate(d);
  }
  function onChangeBottomRightX(val: number) {
    const s = {...shortcut};
    s.json.BottomRightX = val
    onUpdate(s)
  }
  function onChangeBottomRightY(val: number) {
    const s = {...shortcut};
    s.json.BottomRightY = val
    onUpdate(s)
  }

  return (
    <Card className="activity w-100">
      <Card.Header>
      <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={shortcut.enabled}
              onChange={() => {
                const sh = { ...shortcut };
                sh.enabled = !sh.enabled;
                onUpdate(sh);
              }}
            />
          </div>
        </div>
      </Card.Header>
      { shortcut.enabled ?
        <Card.Body>
          <BlocksArrayComponent ar={ar} />           
        </Card.Body> : '' }
    </Card>
  );
};


export default WatchShortCutComponent;
