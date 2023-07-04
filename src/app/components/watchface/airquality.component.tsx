import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchImage, WatchNumber, WatchProgressAirQ } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import ProgressAirQComponent from "./progressAirQ.component";


const AirQualityComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);


  function onChangeNumber(val: WatchNumber) {
    const w = {...watchface};
    w.weatherext.airQualityNumber = val
    setWatchface(w)
  }
  function onChangeIcon(val: WatchImage) {
    const w = {...watchface};
    w.weatherext.airQualityIcon = val
    setWatchface(w)
  }
  function onChangeProgress(val: WatchProgressAirQ) {
    const w = {...watchface};
    w.weatherext.airQualityProgress = val
    setWatchface(w)
  }

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.weatherext.collapsedAirQuality = !w.weatherext.collapsedAirQuality;
          setWatchface(w);
        }}>
        Air Quality
      </Card.Header>
      {!watchface.weatherext.collapsedAirQuality ? (
        <Card.Body>

          <WatchNumberComponent
            title='Text'
            digit={{...watchface.weatherext.airQualityNumber}}
            onUpdate={onChangeNumber}
            followDisabled={true}
          />
          <ImageComponent
            title='Icon'
            image={{...watchface.weatherext.airQualityIcon}}
            onUpdate={onChangeIcon}
            />
          <ProgressAirQComponent
            title='Air Quality Progress'
            progress={{...watchface.weatherext.airQualityProgress}}
            onUpdate={onChangeProgress}
            />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default AirQualityComponent;
