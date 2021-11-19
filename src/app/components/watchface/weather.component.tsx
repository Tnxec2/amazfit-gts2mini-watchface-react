import { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType, IRow } from "../../model/blocks.model";
import { ShortcutElement } from "../../model/json.gts2minit.model";
import { WatchImageSet, WatchNumber } from "../../model/watchFace.gts2mini.model";
import ImageSetComponent from "./imageSet.component";
import WatchNumberComponent from "./number.component";


const WeatherComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  const arCurrent = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Minus', type: BlockType.SelectFile, nvalue: watchface.weather.current.minus, onChange: onChangeCurrentMinus },
        { title: 'NoData', type: BlockType.SelectFile, nvalue: watchface.weather.current.nodata, onChange: onChangeCurrentNoData },
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: watchface.weather.current.suffix, onChange: onChangeCurrentSuffix },
      ]
    },
    {
      blocks: [
        { title: 'Shorcut', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: watchface.weather.current.shortcut.json?.TopLeftX ? watchface.weather.current.shortcut.json.TopLeftX : 0, onChange: onChangeCurrentShortCutX },
        { title: 'Y', type: BlockType.Number, nvalue: watchface.weather.current.shortcut.json?.TopLeftY ? watchface.weather.current.shortcut.json.TopLeftY : 0, onChange: onChangeCurrentShortCutY },
        { title: 'Width', type: BlockType.Number, nvalue: watchface.weather.current.shortcut.json?.BottomRightX && watchface.weather.current.shortcut.json?.TopLeftX  ? watchface.weather.current.shortcut.json?.BottomRightX - watchface.weather.current.shortcut.json?.TopLeftX : 0, onChange: onChangeCurrentShortCutWidth },
        { title: 'Height', type: BlockType.Number, nvalue: watchface.weather.current.shortcut.json?.BottomRightY && watchface.weather.current.shortcut.json?.TopLeftY  ? watchface.weather.current.shortcut.json?.BottomRightY - watchface.weather.current.shortcut.json?.TopLeftY : 0, onChange: onChangeCurrentShortCutHeight },
      ]
    }
  ], [watchface.weather.current]) // eslint-disable-line react-hooks/exhaustive-deps

  const arLowest = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Minus', type: BlockType.SelectFile, nvalue: watchface.weather.lowest.minus, onChange: onChangeLowestMinus },
        { title: 'NoData', type: BlockType.SelectFile, nvalue: watchface.weather.lowest.nodata, onChange: onChangeLowestNoData },
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: watchface.weather.lowest.suffix, onChange: onChangeLowestSuffix },
      ]
    },
    {
      blocks: [
        { title: 'Shorcut', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: watchface.weather.lowest.shortcut.json?.TopLeftX ? watchface.weather.lowest.shortcut.json.TopLeftX : 0, onChange: onChangeLowestShortCutX },
        { title: 'Y', type: BlockType.Number, nvalue: watchface.weather.lowest.shortcut.json?.TopLeftY ? watchface.weather.lowest.shortcut.json.TopLeftY : 0, onChange: onChangeLowestShortCutY },
        { title: 'Width', type: BlockType.Number, nvalue: watchface.weather.lowest.shortcut.json?.BottomRightX && watchface.weather.lowest.shortcut.json?.TopLeftX  ? watchface.weather.lowest.shortcut.json?.BottomRightX - watchface.weather.current.shortcut.json?.TopLeftX : 0, onChange: onChangeLowestShortCutWidth },
        { title: 'Height', type: BlockType.Number, nvalue: watchface.weather.lowest.shortcut.json?.BottomRightY && watchface.weather.lowest.shortcut.json?.TopLeftY  ? watchface.weather.lowest.shortcut.json?.BottomRightY - watchface.weather.current.shortcut.json?.TopLeftY : 0, onChange: onChangeLowestShortCutHeight },
      ]
    }
  ], [watchface.weather.lowest]) // eslint-disable-line react-hooks/exhaustive-deps

  const arHighest = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Minus', type: BlockType.SelectFile, nvalue: watchface.weather.highest.minus, onChange: onChangeHighestMinus },
        { title: 'NoData', type: BlockType.SelectFile, nvalue: watchface.weather.highest.nodata, onChange: onChangeHighestNoData },
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: watchface.weather.highest.suffix, onChange: onChangeHighestSuffix },
      ]
    },
    {
      blocks: [
        { title: 'Shorcut', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: watchface.weather.highest.shortcut.json?.TopLeftX ? watchface.weather.highest.shortcut.json.TopLeftX : 0, onChange: onChangeHighestShortCutX },
        { title: 'Y', type: BlockType.Number, nvalue: watchface.weather.highest.shortcut.json?.TopLeftY ? watchface.weather.highest.shortcut.json.TopLeftY : 0, onChange: onChangeHighestShortCutY },
        { title: 'Width', type: BlockType.Number, nvalue: watchface.weather.highest.shortcut.json?.BottomRightX && watchface.weather.highest.shortcut.json?.TopLeftX  ? watchface.weather.highest.shortcut.json?.BottomRightX - watchface.weather.current.shortcut.json?.TopLeftX : 0, onChange: onChangeHighestShortCutWidth },
        { title: 'Height', type: BlockType.Number, nvalue: watchface.weather.highest.shortcut.json?.BottomRightY && watchface.weather.highest.shortcut.json?.TopLeftY  ? watchface.weather.highest.shortcut.json?.BottomRightY - watchface.weather.current.shortcut.json?.TopLeftY : 0, onChange: onChangeHighestShortCutHeight },
      ]
    }
  ], [watchface.weather.highest]) // eslint-disable-line react-hooks/exhaustive-deps

  const arOnelineMinMax = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Minus', type: BlockType.SelectFile, nvalue: watchface.weather.oneLineMinus, onChange: onChangeOneLineMinus },
        { title: 'Delimiter', type: BlockType.SelectFile, nvalue: watchface.weather.oneLineDelimiter, onChange: onChangeOneLineDelimiter },
        { title: 'Degrees', type: BlockType.SelectFile, nvalue: watchface.weather.oneLineDegrees, onChange: onChangeOneLineDegrees },
      ]
    }
  ], [watchface.weather]) // eslint-disable-line react-hooks/exhaustive-deps

function onChangeHighestMinus(val: number) {
    const w = {...watchface};
    w.weather.highest.minus = val
    setWatchface(w)
  }
  function onChangeHighestNoData(val: number) {
    const w = {...watchface};
    w.weather.highest.nodata = val
    setWatchface(w)
  }
  function onChangeHighestSuffix(val: number) {
    const w = {...watchface};
    w.weather.highest.suffix = val
    setWatchface(w)
  }
  function onChangeHighestShortCutX(val: number) {
    const w = {...watchface};
    if ( !w.weather.highest.shortcut.json) w.weather.highest.shortcut.json = new ShortcutElement()
    w.weather.highest.shortcut.json.TopLeftX = val
    setWatchface(w)
  }
  function onChangeHighestShortCutY(val: number) {
    const w = {...watchface};
    if ( !w.weather.highest.shortcut.json) w.weather.highest.shortcut.json = new ShortcutElement()
    w.weather.highest.shortcut.json.TopLeftY = val
    setWatchface(w)
  }
  function onChangeHighestShortCutWidth(val: number) {
    const w = {...watchface};
    if ( !w.weather.highest.shortcut.json) w.weather.highest.shortcut.json = new ShortcutElement()
    w.weather.highest.shortcut.json.BottomRightX = w.weather.highest.shortcut.json.TopLeftX + val
    setWatchface(w)
  }
  function onChangeHighestShortCutHeight(val: number) {
    const w = {...watchface};
    if ( !w.weather.highest.shortcut.json) w.weather.highest.shortcut.json = new ShortcutElement()
    w.weather.highest.shortcut.json.BottomRightY = w.weather.highest.shortcut.json.TopLeftY + val
    setWatchface(w)
  }


  function onChangeCurrentMinus(val: number) {
    const w = {...watchface};
    w.weather.current.minus = val
    setWatchface(w)
  }
  function onChangeCurrentNoData(val: number) {
    const w = {...watchface};
    w.weather.current.nodata = val
    setWatchface(w)
  }
  function onChangeCurrentSuffix(val: number) {
    const w = {...watchface};
    w.weather.current.suffix = val
    setWatchface(w)
  }
  function onChangeCurrentShortCutX(val: number) {
    const w = {...watchface};
    if ( !w.weather.current.shortcut.json) w.weather.current.shortcut.json = new ShortcutElement()
    w.weather.current.shortcut.json.TopLeftX = val
    setWatchface(w)
  }
  function onChangeCurrentShortCutY(val: number) {
    const w = {...watchface};
    if ( !w.weather.current.shortcut.json) w.weather.current.shortcut.json = new ShortcutElement()
    w.weather.current.shortcut.json.TopLeftY = val
    setWatchface(w)
  }
  function onChangeCurrentShortCutWidth(val: number) {
    const w = {...watchface};
    if ( !w.weather.current.shortcut.json) w.weather.current.shortcut.json = new ShortcutElement()
    w.weather.current.shortcut.json.BottomRightX = w.weather.current.shortcut.json.TopLeftX + val
    setWatchface(w)
  }
  function onChangeCurrentShortCutHeight(val: number) {
    const w = {...watchface};
    if ( !w.weather.current.shortcut.json) w.weather.current.shortcut.json = new ShortcutElement()
    w.weather.current.shortcut.json.BottomRightY = w.weather.current.shortcut.json.TopLeftY + val
    setWatchface(w)
  }
  function onChangeLowestMinus(val: number) {
    const w = {...watchface};
    w.weather.lowest.minus = val
    setWatchface(w)
  }
  function onChangeLowestNoData(val: number) {
    const w = {...watchface};
    w.weather.lowest.nodata = val
    setWatchface(w)
  }
  function onChangeLowestSuffix(val: number) {
    const w = {...watchface};
    w.weather.lowest.suffix = val
    setWatchface(w)
  }
  function onChangeLowestShortCutX(val: number) {
    const w = {...watchface};
    if ( !w.weather.lowest.shortcut.json) w.weather.lowest.shortcut.json = new ShortcutElement()
    w.weather.lowest.shortcut.json.TopLeftX = val
    setWatchface(w)
  }
  function onChangeLowestShortCutY(val: number) {
    const w = {...watchface};
    if ( !w.weather.lowest.shortcut.json) w.weather.lowest.shortcut.json = new ShortcutElement()
    w.weather.lowest.shortcut.json.TopLeftY = val
    setWatchface(w)
  }
  function onChangeLowestShortCutWidth(val: number) {
    const w = {...watchface};
    w.weather.lowest.shortcut.json.BottomRightX = w.weather.lowest.shortcut.json.TopLeftX + val
    setWatchface(w)
  }
  function onChangeLowestShortCutHeight(val: number) {
    const w = {...watchface};
    if ( !w.weather.lowest.shortcut.json) w.weather.lowest.shortcut.json = new ShortcutElement()
    w.weather.lowest.shortcut.json.BottomRightY = w.weather.lowest.shortcut.json.TopLeftY + val
    setWatchface(w)
  }

  function udpateCurrent(d: WatchNumber) {
    const w = {...watchface};
    w.weather.current.imageNumber = d
    setWatchface(w)
  }
  function udpateLowest(d: WatchNumber) {
    const w = {...watchface};
    w.weather.lowest.imageNumber = d
    setWatchface(w)
  }
  function udpateHighes(d: WatchNumber) {
    const w = {...watchface};
    w.weather.highest.imageNumber = d
    setWatchface(w)
  }

  function updateIcon(d: WatchImageSet) {
    const w = {...watchface};
    w.weather.icon = d
    setWatchface(w)
  }

  function updateOneLineMinMax(d: WatchNumber) {
    const w = {...watchface};
    w.weather.oneLineMinMax = d
    setWatchface(w)
  }
  function onChangeOneLineMinus(val: number) {
    const w = {...watchface};
    w.weather.oneLineMinus = val
    setWatchface(w)
  }
  function onChangeOneLineDelimiter(val: number) {
    const w = {...watchface};
    w.weather.oneLineDelimiter = val
    setWatchface(w)
  }
  function onChangeOneLineDegrees(val: number) {
    const w = {...watchface};
    w.weather.oneLineDegrees = val
    setWatchface(w)
  }

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.weather.collapsed = !w.weather.collapsed;
          setWatchface(w);
        }}>
        Weather
      </Card.Header>
      {!watchface.weather.collapsed ? (
        <Card.Body>
          <ImageSetComponent
            title='Icon'
            imageSet={{...watchface.weather.icon}}
            onUpdate={updateIcon}
          />
          <WatchNumberComponent
            title='Current'
            digit={{...watchface.weather.current.imageNumber}}
            onUpdate={udpateCurrent}
            followDisabled={true}
          />
          { watchface.weather.current.imageNumber.enabled ? <Card>
            <BlocksArrayComponent ar={arCurrent} />
          </Card> : '' }
          <WatchNumberComponent
            title='Lowest'
            digit={{...watchface.weather.lowest.imageNumber}}
            onUpdate={udpateLowest}
            followDisabled={true}
          />
          { watchface.weather.lowest.imageNumber.enabled ? <Card>
            <BlocksArrayComponent ar={arLowest} />
          </Card> : '' }
          <WatchNumberComponent
            title='Highest'
            digit={{...watchface.weather.highest.imageNumber}}
            onUpdate={udpateHighes}
            followDisabled={true}
          />
          { watchface.weather.highest.imageNumber.enabled ? <Card>
            <BlocksArrayComponent ar={arHighest} />
          </Card> : ''}

          <WatchNumberComponent
            title='One line min/max'
            digit={{...watchface.weather.oneLineMinMax}}
            onUpdate={updateOneLineMinMax}
            followDisabled={true}
            />
          { watchface.weather.oneLineMinMax.enabled ? <Card>
            <BlocksArrayComponent ar={arOnelineMinMax} />
          </Card> : ''}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default WeatherComponent;
