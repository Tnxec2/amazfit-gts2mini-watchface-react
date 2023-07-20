import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchImage, WatchShortcut } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";

interface IProps {
  title: string,
  shortcut: WatchShortcut,
  onUpdate(shorcut: WatchShortcut): void
  onDelete(): void,
  disableIcon?: boolean
}

const ShortCutComponent: FC<IProps> = ({title, shortcut, onUpdate, onDelete, disableIcon}) => {
  
  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: shortcut.element?.json?.TopLeftX ? shortcut.element?.json.TopLeftX : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: shortcut.element?.json?.TopLeftY ? shortcut.element?.json.TopLeftY : 0, onChange: onChangeY },
        { title: 'BottomRightX', type: BlockType.Number, nvalue: shortcut.element?.json?.BottomRightX ? shortcut.element?.json?.BottomRightX : 0, onChange: onChangeBottomRightX },
        { title: 'BottomRightY', type: BlockType.Number, nvalue: shortcut.element?.json?.BottomRightY ? shortcut.element?.json?.BottomRightY : 0, onChange: onChangeBottomRightY },
      ]
    }
  ], [shortcut]) // eslint-disable-line react-hooks/exhaustive-deps


  function onChangeImage(im: WatchImage) {
    const s = {...shortcut};
    s.icon = im
    onUpdate(s)
  }

  function onChangeX(val: number) {
    const d = {...shortcut};
    
    let width = d.element.json.BottomRightX && d.element.json.TopLeftX ? d.element.json.BottomRightX - d.element.json.TopLeftX : 1
    d.element.json.TopLeftX = val;
    d.element.json.BottomRightX = val + width
    onUpdate(d);
  }

  function onChangeY(val: number) {
    const d = {...shortcut};
    let height = d.element.json.BottomRightY && d.element.json.TopLeftY ? d.element.json.BottomRightY - d.element.json.TopLeftY : 1
    d.element.json.TopLeftY = val;
    d.element.json.BottomRightY = val + height
    onUpdate(d);
  }

  function onChangeBottomRightX(val: number) {
    const s = {...shortcut};
    s.element.json.BottomRightX = val
    onUpdate(s)
  }
  function onChangeBottomRightY(val: number) {
    const s = {...shortcut};
    s.element.json.BottomRightY = val
    onUpdate(s)
  }

  return (
    <Card className="activity w-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        Shortcut: {shortcut.type}
        <button className="btn btn-outline-danger" type="button" onClick={onDelete}>Delete</button>
      </Card.Header>
        <Card.Body>
          { ! disableIcon ?
          <ImageComponent
            title={ shortcut.icon.enabled ? 'Icon' : 'Icon ⚠ shortcut works only with activated icon'}
            image={{...shortcut.icon}}
            onUpdate={onChangeImage}
          /> : '' }
          <BlocksArrayComponent ar={ar} />           
        </Card.Body>
    </Card>
  );
};


export default ShortCutComponent;
