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
        { title: 'X', type: BlockType.Number, nvalue: shortcut.json?.TopLeftX ? shortcut.json.TopLeftX : 0, onChange: onChangeTopLeftX },
        { title: 'Y', type: BlockType.Number, nvalue: shortcut.json?.TopLeftY ? shortcut.json.TopLeftY : 0, onChange: onChangeTopLeftY },
        { title: 'Width', type: BlockType.Number, nvalue: shortcut.json?.BottomRightX ? shortcut.json?.BottomRightX - shortcut.json.TopLeftX : 0, onChange: onChangeWidth },
        { title: 'Height', type: BlockType.Number, nvalue: shortcut.json?.BottomRightY ? shortcut.json?.BottomRightY - shortcut.json.TopLeftY : 0, onChange: onChangeHeight },
      ]
    }
  ], [shortcut]) // eslint-disable-line react-hooks/exhaustive-deps


  function onChangeTopLeftX(val: number) {
    const s = {...shortcut};
    s.json.TopLeftX = val
    onUpdate(s)
  }
  function onChangeTopLeftY(val: number) {
    const s = {...shortcut};
    s.json.TopLeftY = val
    onUpdate(s)
  }
  function onChangeWidth(val: number) {
    const s = {...shortcut};
    s.json.BottomRightX = s.json.TopLeftX ? s.json.TopLeftX + val : val
    onUpdate(s)
  }
  function onChangeHeight(val: number) {
    const s = {...shortcut};
    s.json.BottomRightY = s.json.TopLeftY ? s.json.TopLeftY + val : val
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
