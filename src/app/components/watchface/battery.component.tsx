import { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchIconSet, WatchImage, WatchImageSet, WatchNumber, WatchScale, WatchShortcutElement } from "../../model/watchFace.gts2mini.model";
import IconSetComponent from "./iconSet.component";
import ImageComponent from "./image.component";
import ImageSetComponent from "./imageSet.component";
import WatchNumberComponent from "./number.component";
import ScaleComponent from "./scale.component";
import WatchShortCutComponent from "./watchshortcut.component";


const BatteryComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Prefix', type: BlockType.SelectFile, nvalue: watchface.battery.text.prefix, onChange: onChangePrefix },
        { title: 'NoData', type: BlockType.SelectFile, nvalue: watchface.battery.text.noData, onChange: onChangeNoData },
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: watchface.battery.text.suffix, onChange: onChangeSuffix },
      ]
    },
  ], [watchface.battery.text]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangePrefix(val: number) {
    const w = {...watchface};
    w.battery.text.prefix = val
    setWatchface(w)
  }
  function onChangeNoData(val: number) {
    const w = {...watchface};
    w.battery.text.noData = val
    setWatchface(w)
  }
  function onChangeSuffix(val: number) {
    const w = {...watchface};
    w.battery.text.suffix = val
    setWatchface(w)
  }

  function updateIcon(icon: WatchImage) {
    const w = {...watchface};
    w.battery.icon = icon
    setWatchface(w)
  }

  function updateShortcut(sh: WatchShortcutElement) {
    const w = {...watchface};
    w.battery.text.shortcut = sh
    w.battery.text.enabled = w.battery.text.imageNumber.enabled || w.battery.text.shortcut.enabled
    setWatchface(w)
  }


  function udpateDigit(d: WatchNumber) {
    const w = {...watchface};
    w.battery.text.imageNumber = d
    w.battery.text.enabled = w.battery.text.imageNumber.enabled || w.battery.text.shortcut.enabled
    setWatchface(w)
  }

  function updateImageSet(d: WatchImageSet) {
    const w = {...watchface};
    w.battery.imageProgress = d
    setWatchface(w)
  }
  function updateIconSet(d: WatchIconSet) {
    const w = {...watchface};
    w.battery.iconSetProgress = d
    setWatchface(w)
  }
  function updateScale(d: WatchScale) {
    const w = {...watchface};
    w.battery.scale = d
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
            digit={{...watchface.battery.text.imageNumber}}
            onUpdate={udpateDigit}
            followDisabled={true}
            showDataType={false}
            showDelimiter={false}
            showPrefix={false}
          />
          <BlocksArrayComponent ar={ar} />
          <ImageComponent
            title='Icon'
            image={{...watchface.battery.icon}}
            onUpdate={updateIcon}
          />
          <WatchShortCutComponent
            title='Shortcut'
            shortcut={{...watchface.battery.text.shortcut}}
            onUpdate={updateShortcut}
          />
          <ImageSetComponent 
            title='Image set'
            imageSet={{...watchface.battery.imageProgress}}
            onUpdate={updateImageSet}
          />
          <IconSetComponent
            title='Icon set'
            iconSet={{...watchface.battery.iconSetProgress}}
            onUpdate={updateIconSet}
            />
          <ScaleComponent
            title='Pointer scale'
            scale={{...watchface.battery.scale}}
            onUpdate={updateScale}
            />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default BatteryComponent;
