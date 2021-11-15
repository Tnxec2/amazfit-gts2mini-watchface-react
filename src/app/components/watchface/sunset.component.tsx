import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchImage, WatchNumber, WatchShortcutElement } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import WatchShortCutComponent from "./watchshortcut.component";

const SunsetComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);


  function updateSunsetOneLine(h: WatchNumber) {
    const w = {...watchface};
    w.time.sunset.sunsetOneLine = h;
    setWatchface(w);
  }
  function updateSunsetIcon(h: WatchImage) {
    const w = {...watchface};
    w.time.sunset.sunsetIcon = h;
    setWatchface(w);
  }
  function updateSunsetShortcut(h: WatchShortcutElement) {
    const w = {...watchface};
    w.time.sunset.sunsetShortcut = h;
    setWatchface(w);
  }

  function updateSunRiseOneLine(h: WatchNumber) {
    const w = {...watchface};
    w.time.sunset.sunriseOneLine = h;
    setWatchface(w);
  }
  function updateSunRiseIcon(h: WatchImage) {
    const w = {...watchface};
    w.time.sunset.sunriseIcon = h;
    setWatchface(w);
  }
  function updateSunRiseShortcut(h: WatchShortcutElement) {
    const w = {...watchface};
    w.time.sunset.sunriseShortcut = h;
    setWatchface(w);
  }
  
  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.time.sunset.collapsed = !watchface.time.sunset.collapsed;
          setWatchface(w);
        }}
      >
        Sunrise / Sunset
      </Card.Header>
      <Card.Body className={`${watchface.time.sunset.collapsed ? "collapse" : ""}`}>
      <WatchNumberComponent
          title="Sunrise OneLine"
          digit={watchface.time.sunset.sunriseOneLine}
          onUpdate={updateSunRiseOneLine}
          followDisabled={true}
          showDelimiter={true}
          showPrefix={true}
          paddingDisabled={true}
        />
        <ImageComponent 
          title='Sunrise icon'
          image={watchface.time.sunset.sunsetIcon}
          onUpdate={updateSunRiseIcon}
        />
        <WatchShortCutComponent 
          title='Sunrise shortcut'
          shortcut={watchface.time.sunset.sunsetShortcut}
          onUpdate={updateSunRiseShortcut}
        />

        <WatchNumberComponent
          title="Sunset OneLine"
          digit={watchface.time.sunset.sunsetOneLine}
          onUpdate={updateSunsetOneLine}
          followDisabled={true}
          showDelimiter={true}
          showPrefix={true}
          paddingDisabled={true}
        />
        <ImageComponent 
          title='Sunset icon'
          image={watchface.time.sunset.sunsetIcon}
          onUpdate={updateSunsetIcon}
        />
        <WatchShortCutComponent 
          title='Sunset shortcut'
          shortcut={watchface.time.sunset.sunsetShortcut}
          onUpdate={updateSunsetShortcut}
        />
      </Card.Body>
    </Card>
  );
};
export default SunsetComponent;
