import { FC, useContext } from 'react';
import { WatchImage, WatchWeekdayImages } from '../../model/watchFace.gts2mini.model';
import ImageComponent from './image.component';
import { Card } from 'react-bootstrap';
import { IWatchContext, WatchfaceContext } from '../../context';


const WeekdaysImagesComponent: FC = () => {

    const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

    function onUpdate(w: WatchWeekdayImages) {
      setWatchface({...watchface, weekdayImages: {...w}})
    }

    function updateMonday(image: WatchImage) {
      const p = {...watchface.weekdayImages};
      p.monday = image;
      onUpdate(p);
    }
    function updateTuesday(image: WatchImage) {
      const p = {...watchface.weekdayImages};
      p.tuesday = image;
      onUpdate(p);
    }
    function updateWednesday(image: WatchImage) {
      const p = {...watchface.weekdayImages};
      p.wednesday = image;
      onUpdate(p);
    }
    function updateThursday(image: WatchImage) {
      const p = {...watchface.weekdayImages};
      p.thursday = image;
      onUpdate(p);
    }
    function updateFriday(image: WatchImage) {
      const p = {...watchface.weekdayImages};
      p.friday = image;
      onUpdate(p);
    }
    function updateSat(image: WatchImage) {
      const p = {...watchface.weekdayImages};
      p.saturday = image;
      onUpdate(p);
    }
    function updateSun(image: WatchImage) {
      const p = {...watchface.weekdayImages};
      p.sunday = image;
      onUpdate(p);
    }


    return (
      <Card>
      <Card.Header
          onClick={() => {
            let w = {...watchface};
            w.weekdayImages.collapsed = !watchface.weekdayImages.collapsed;
            setWatchface(w);
          }}
        >
        Weekday Images
      </Card.Header>
      <Card.Body className={`${watchface.weekdayImages.collapsed ? "collapse" : ""}`}>

            <ImageComponent
              title='Monday'
              onUpdate={updateMonday}
              image={{...watchface.weekdayImages.monday}}
            />
            <ImageComponent
              title='Tuesday'
              onUpdate={updateTuesday}
              image={{...watchface.weekdayImages.tuesday}}
            />
            <ImageComponent
              title='Wednesday'
              onUpdate={updateWednesday}
              image={{...watchface.weekdayImages.wednesday}}
            />
            <ImageComponent
              title='Thursday'
              onUpdate={updateThursday}
              image={{...watchface.weekdayImages.thursday}}
            />
            <ImageComponent
              title='Friday'
              onUpdate={updateFriday}
              image={{...watchface.weekdayImages.friday}}
            />
            <ImageComponent
              title='Saturday'
              onUpdate={updateSat}
              image={{...watchface.weekdayImages.saturday}}
            />
            <ImageComponent
              title='Sunday'
              onUpdate={updateSun}
              image={{...watchface.weekdayImages.sunday}}
            />
        </Card.Body>
      </Card>
    );
};

export default WeekdaysImagesComponent