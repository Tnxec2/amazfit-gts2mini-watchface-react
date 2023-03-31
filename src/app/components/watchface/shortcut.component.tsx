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
        { title: 'X', type: BlockType.Number, nvalue: shortcut.element?.json?.TopLeftX ? shortcut.element?.json.TopLeftX : 0, onChange: onChangeTopLeftX },
        { title: 'Y', type: BlockType.Number, nvalue: shortcut.element?.json?.TopLeftY ? shortcut.element?.json.TopLeftY : 0, onChange: onChangeTopLeftY },
        { title: 'Width', type: BlockType.Number, nvalue: shortcut.element?.json?.BottomRightX ? shortcut.element?.json?.BottomRightX - shortcut.element?.json.TopLeftX : 0, onChange: onChangeWidth },
        { title: 'Height', type: BlockType.Number, nvalue: shortcut.element?.json?.BottomRightY ? shortcut.element?.json?.BottomRightY - shortcut.element?.json.TopLeftY : 0, onChange: onChangeHeight },
      ]
    }
  ], [shortcut]) // eslint-disable-line react-hooks/exhaustive-deps


  function onChangeImage(im: WatchImage) {
    const s = {...shortcut};
    s.icon = im
    onUpdate(s)
  }

  function onChangeTopLeftX(val: number) {
    const s = {...shortcut};
    s.element.json.TopLeftX = val
    onUpdate(s)
  }
  function onChangeTopLeftY(val: number) {
    const s = {...shortcut};
    s.element.json.TopLeftY = val
    onUpdate(s)
  }
  function onChangeWidth(val: number) {
    const s = {...shortcut};
    s.element.json.BottomRightX = s.element.json.TopLeftX ? s.element.json.TopLeftX + val : val
    onUpdate(s)
  }
  function onChangeHeight(val: number) {
    const s = {...shortcut};
    s.element.json.BottomRightY = s.element.json.TopLeftY ? s.element.json.TopLeftY + val : val
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
            title='Icon'
            image={{...shortcut.icon}}
            onUpdate={onChangeImage}
          /> : '' }
          <BlocksArrayComponent ar={ar} />           
        </Card.Body>
    </Card>
  );
};


export default ShortCutComponent;
