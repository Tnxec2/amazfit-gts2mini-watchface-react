import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchIconSet } from "../../model/watchFace.gts2mini.model";
import { TimeSpans } from "../../model/json.gts2minit.model";
import IconSetComponent from "./iconSet.component";
import TimeSpanComponent from "./timespan.component";

const HourlyImagesComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);


  function updateIconSet(h: WatchIconSet) {
    const w = {...watchface};
    w.time.hourlyImages.iconSet = h;

    while (w.time.hourlyImages.iconSet.json.Coordinates.length > w.time.hourlyImages.timeSpans.length) {
      addTimeSpan();
    }
    setWatchface(w);
  }
  
  function updateTimeSpan(t: TimeSpans, i: number) {
    const w = {...watchface};
    w.time.hourlyImages.timeSpans = w.time.hourlyImages.timeSpans.map((item, index) => {
      if (index === i) return t; else return item;
    });
    setWatchface(w);
  }

  function addTimeSpan(){
    const w = {...watchface};
    if (!w.time.hourlyImages.timeSpans) w.time.hourlyImages.timeSpans = []
    let last = w.time.hourlyImages.timeSpans.length > 0 ? w.time.hourlyImages.timeSpans[w.time.hourlyImages.timeSpans.length-1] : null
    w.time.hourlyImages.timeSpans.push({
      StartHour: last ? last.StopHour+1 : 0,
      StartMin: 0,
      StopHour: last ? last.StopHour+1 : 0,
      StopMin: 59,
    })
    setWatchface(w);
  }

  function deleteTimespan(index: number) {
    
    const w = {...watchface};
    setWatchface(w);
  }

  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.time.hourlyImages.collapsed = !watchface.time.hourlyImages.collapsed;
          setWatchface(w);
        }}
      >
        Hourly Images
      </Card.Header>
      <Card.Body className={`${watchface.time.hourlyImages.collapsed ? "collapse" : ""}`}>
        <IconSetComponent 
          title="IconSet"
          iconSet={{...watchface.time.hourlyImages.iconSet}}
          onUpdate={updateIconSet}
          onDeleteCoordinate={deleteTimespan}
        />
        { watchface.time.hourlyImages.iconSet.enabled ? 
        <Card className="mt-1">
          <Card.Header>
            Time Spans
          </Card.Header>
          { watchface.time.hourlyImages.timeSpans.map((timespan, index) => 
            <TimeSpanComponent 
              index={index}
              timeSpan={{...timespan}}
              onUpdate={(e) => updateTimeSpan(e, index)}
          />) }
        </Card>: '' }
          
      </Card.Body>
    </Card>
  );

};
export default HourlyImagesComponent;
