import { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType, IRow } from "../../model/blocks.model";
import { Image, ShortcutElement } from "../../model/json.gts2minit.model";
import { digitTypes, WatchImageSet, WatchNumber } from "../../model/watchFace.gts2mini.model";
import WatchNumberComponent from "./number.component";
import ImageSetComponent from "./imageSet.component";


const BatteryComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Prefix', type: BlockType.SelectFile, nvalue: watchface.battery.text.json.PrefixImageIndex, onChange: onChangePrefix },
        { title: 'NoData', type: BlockType.SelectFile, nvalue: watchface.battery.text.json.NoDataImageIndex, onChange: onChangeNoData },
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: watchface.battery.text.json.SuffixImageIndex, onChange: onChangeSuffix },
      ]
    },
    {
      blocks: [
        { title: 'Shorcut', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: watchface.battery.text.json.Shortcut?.TopLeftX ? watchface.battery.text.json.Shortcut.TopLeftX : 0, onChange: onChangeShortCutX },
        { title: 'Y', type: BlockType.Number, nvalue: watchface.battery.text.json.Shortcut?.TopLeftY ? watchface.battery.text.json.Shortcut.TopLeftY : 0, onChange: onChangeShortCutY },
        { title: 'Width', type: BlockType.Number, nvalue: watchface.battery.text.json.Shortcut?.BottomRightX && watchface.battery.text.json.Shortcut?.TopLeftX  ? watchface.battery.text.json.Shortcut?.BottomRightX - watchface.battery.text.json.Shortcut?.TopLeftX : 0, onChange: onChangeShortCutWidth },
        { title: 'Height', type: BlockType.Number, nvalue: watchface.battery.text.json.Shortcut?.BottomRightY && watchface.battery.text.json.Shortcut?.TopLeftY  ? watchface.battery.text.json.Shortcut?.BottomRightY - watchface.battery.text.json.Shortcut?.TopLeftY : 0, onChange: onChangeShortCutHeight },
      ]
    },
    {
      blocks: [
        { title: 'Icon', type: BlockType.SelectFile, nvalue: watchface.battery.icon.json?.ImageIndex, onChange: onChangeIcon },
        { title: 'X', type: BlockType.Number, nvalue: watchface.battery.icon.json?.X ? watchface.battery.icon.json.X : 0, onChange: onChangeIconX },
        { title: 'Y', type: BlockType.Number, nvalue: watchface.battery.icon.json?.Y ? watchface.battery.icon.json.Y : 0, onChange: onChangeIconY },
      ]
    }
  ], [watchface.battery.text]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangePrefix(val: number) {
    const w = {...watchface};
    w.battery.text.json.PrefixImageIndex = val
    setWatchface(w)
  }
  function onChangeNoData(val: number) {
    const w = {...watchface};
    w.battery.text.json.NoDataImageIndex = val
    setWatchface(w)
  }
  function onChangeSuffix(val: number) {
    const w = {...watchface};
    w.battery.text.json.SuffixImageIndex = val
    setWatchface(w)
  }

  function onChangeIcon(val: number) {
    const w = {...watchface};
    if ( !w.battery.icon.json ) w.battery.icon.json = new Image()
    w.battery.icon.json.ImageIndex = val
    setWatchface(w)
  }
  function onChangeIconX(val: number) {
    const w = {...watchface};
    if ( !w.battery.icon.json ) w.battery.icon.json = new Image()
    w.battery.icon.json.X = val
    setWatchface(w)
  }
  function onChangeIconY(val: number) {
    const w = {...watchface};
    if ( !w.battery.icon.json ) w.battery.icon.json = new Image()
    w.battery.icon.json.Y = val
    setWatchface(w)
  }
  function onChangeShortCutX(val: number) {
    const w = {...watchface};
    if ( !w.battery.text.json.Shortcut) w.battery.text.json.Shortcut = new ShortcutElement()
    w.battery.text.json.Shortcut.TopLeftX = val
    setWatchface(w)
  }
  function onChangeShortCutY(val: number) {
    const w = {...watchface};
    if ( !w.battery.text.json.Shortcut) w.battery.text.json.Shortcut = new ShortcutElement()
    w.battery.text.json.Shortcut.TopLeftY = val
    setWatchface(w)
  }
  function onChangeShortCutWidth(val: number) {
    const w = {...watchface};
    if ( !w.battery.text.json.Shortcut) w.battery.text.json.Shortcut = new ShortcutElement()
    w.battery.text.json.Shortcut.BottomRightX = w.battery.text.json.Shortcut.TopLeftX + val
    setWatchface(w)
  }
  function onChangeShortCutHeight(val: number) {
    const w = {...watchface};
    if ( !w.battery.text.json.Shortcut) w.battery.text.json.Shortcut = new ShortcutElement()
    w.battery.text.json.Shortcut.BottomRightY = w.battery.text.json.Shortcut.TopLeftY + val
    setWatchface(w)
  }

  function udpateDigit(d: WatchNumber) {
    const w = {...watchface};
    w.battery.text.json.ImageNumber = d.json
    setWatchface(w)
  }
  function updateImageSet(d: WatchImageSet) {
    const w = {...watchface};
    w.battery.imageProgress = d
    setWatchface(w)
  }


  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.battery.collapsed = !w.battery.collapsed;
          setWatchface(w);
        }}>
        Battery
      </Card.Header>
      {!watchface.battery.collapsed ? (
        <Card.Body>
          <WatchNumberComponent
            title='Number'
            digit={new WatchNumber(watchface.battery.text.json.ImageNumber, digitTypes.battery)}
            onUpdate={udpateDigit}
          />
          <BlocksArrayComponent ar={ar} />
          <ImageSetComponent 
            title='Image set'
            imageSet={watchface.battery.imageProgress}
            onUpdate={updateImageSet}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default BatteryComponent;
