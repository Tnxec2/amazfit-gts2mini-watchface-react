import { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchImageSet, WatchNumber, WatchTextTemperature } from "../../model/watchFace.gts2mini.model";
import ImageSetComponent from "./imageSet.component";
import WatchNumberComponent from "./number.component";
import WeatherTemperatureComponent from "./weathertemperature.component";


const WeatherComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  const arOnelineMinMax = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Minus', type: BlockType.SelectFile, nvalue: watchface.weather.oneLineMinus, onChange: onChangeOneLineMinus },
        { title: 'Delimiter', type: BlockType.SelectFile, nvalue: watchface.weather.oneLineDelimiter, onChange: onChangeOneLineDelimiter },
        { title: 'Degrees', type: BlockType.SelectFile, nvalue: watchface.weather.oneLineDegrees, onChange: onChangeOneLineDegrees },
      ]
    }
  ], [watchface.weather]) // eslint-disable-line react-hooks/exhaustive-deps


  function udpateCurrent(d: WatchTextTemperature) {
    setWatchface({...watchface, weather: {...watchface.weather, current: d}})
  }
  function udpateLowest(d: WatchTextTemperature) {
    setWatchface({...watchface, weather: {...watchface.weather, lowest: d}})
  }
  function udpateHighes(d: WatchTextTemperature) {
    setWatchface({...watchface, weather: {...watchface.weather, highest: d}})
  }

  function updateIcon(d: WatchImageSet) {
    setWatchface({...watchface, weather: {...watchface.weather, icon: d}})
  }

  function updateOneLineMinMax(d: WatchNumber) {
    setWatchface({...watchface, weather: {...watchface.weather, oneLineMinMax: d}})
  }
  function onChangeOneLineMinus(d: number) {
    setWatchface({...watchface, weather: {...watchface.weather, oneLineMinus: d}})
  }
  function onChangeOneLineDelimiter(d: number) {
    setWatchface({...watchface, weather: {...watchface.weather, oneLineDelimiter: d}})
  }
  function onChangeOneLineDegrees(d: number) {
    setWatchface({...watchface, weather: {...watchface.weather, oneLineDegrees: d}})
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
          <WeatherTemperatureComponent
            title='Current'
            temp={{...watchface.weather.current}}
            onUpdate={udpateCurrent}
          />
          <WeatherTemperatureComponent
            title='Lowest'
            temp={{...watchface.weather.lowest}}
            onUpdate={udpateLowest}
          />
          <WeatherTemperatureComponent
            title='Highest'
            temp={{...watchface.weather.highest}}
            onUpdate={udpateHighes}
          />
          
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
