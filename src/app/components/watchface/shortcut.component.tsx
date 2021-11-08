import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { Shortcut } from "../../model/json.gts2minit.model";
import { WatchImage } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";

interface IProps {
  title: string,
  shortcut: Shortcut,
  onUpdate(shorcut: Shortcut): void
  onDelete(): void,
  disableIcon?: boolean
}

const ShortCutComponent: FC<IProps> = ({title, shortcut, onUpdate, onDelete, disableIcon}) => {
  
  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: shortcut.Element?.TopLeftX ? shortcut.Element.TopLeftX : 0, onChange: onChangeTopLeftX },
        { title: 'Y', type: BlockType.Number, nvalue: shortcut.Element?.TopLeftY ? shortcut.Element.TopLeftY : 0, onChange: onChangeTopLeftY },
        { title: 'Width', type: BlockType.Number, nvalue: shortcut.Element?.BottomRightX ? shortcut.Element?.BottomRightX - shortcut.Element.TopLeftX : 0, onChange: onChangeWidth },
        { title: 'Height', type: BlockType.Number, nvalue: shortcut.Element?.BottomRightY ? shortcut.Element?.BottomRightY - shortcut.Element.TopLeftY : 0, onChange: onChangeHeight },
      ]
    }
  ], [shortcut]) // eslint-disable-line react-hooks/exhaustive-deps


  function onChangeImage(im: WatchImage) {
    const s = {...shortcut};
    s.Icon = im.json
    onUpdate(s)
  }

  function onChangeTopLeftX(val: number) {
    const s = {...shortcut};
    s.Element.TopLeftX = val
    onUpdate(s)
  }
  function onChangeTopLeftY(val: number) {
    const s = {...shortcut};
    s.Element.TopLeftY = val
    onUpdate(s)
  }
  function onChangeWidth(val: number) {
    const s = {...shortcut};
    s.Element.BottomRightX = s.Element.TopLeftX ? s.Element.TopLeftX + val : val
    onUpdate(s)
  }
  function onChangeHeight(val: number) {
    const s = {...shortcut};
    s.Element.BottomRightY = s.Element.TopLeftY ? s.Element.TopLeftY + val : val
    onUpdate(s)
  }

  return (
    <Card className="activity w-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        Shortcut: {shortcut.ShortcutType}
        <button className="btn btn-outline-danger" type="button" onClick={onDelete}>Delete</button>
      </Card.Header>
        <Card.Body>
          { ! disableIcon ?
          <ImageComponent
            title='Icon'
            image={new WatchImage(shortcut.Icon)}
            onUpdate={onChangeImage}
          /> : '' }
          <BlocksArrayComponent ar={ar} />           
        </Card.Body>
    </Card>
  );
};


export default ShortCutComponent;
