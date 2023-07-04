import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { WatchImage, WatchNumber, WatchProgressHumidity } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import ProgressHumidityComponent from "./progressHumidity.component";


const HumidityComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);


  function onChangeNumber(val: WatchNumber) {
    const w = {...watchface};
    w.weatherext.humidityNumber = val
    setWatchface(w)
  }

  function onChangeIcon(val: WatchImage) {
    const w = {...watchface};
    w.weatherext.humidityIcon = val
    setWatchface(w)
  }

  function onChangeSuffix(val: number) {
    const w = {...watchface};
    w.weatherext.humiditySuffix = val
    setWatchface(w)
  }

  function onChangeProgress(val: WatchProgressHumidity) {
    const w = {...watchface};
    w.weatherext.humidityProgress = val
    setWatchface(w)
  }

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.weatherext.collapsedHumidity = !w.weatherext.collapsedHumidity;
          setWatchface(w);
        }}>
        Humidity
      </Card.Header>
      {!watchface.weatherext.collapsedHumidity ? (
        <Card.Body>

          <WatchNumberComponent
            title='Text'
            digit={{...watchface.weatherext.humidityNumber}}
            onUpdate={onChangeNumber}
            followDisabled={true}
          />
          { watchface.weatherext.humidityNumber.enabled ?
          <BlocksArrayComponent ar={[
            {
              blocks: [
                { title: 'Suffix', type: BlockType.SelectFile, nvalue: watchface.weatherext.humiditySuffix, onChange: onChangeSuffix },
              ]
            }
          ]}  /> : ''
        }
          <ImageComponent
            title='Icon'
            image={{...watchface.weatherext.humidityIcon}}
            onUpdate={onChangeIcon}
            />
          <ProgressHumidityComponent
            title="Progress"
            progress={{...watchface.weatherext.humidityProgress}}
            onUpdate={onChangeProgress}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default HumidityComponent;
