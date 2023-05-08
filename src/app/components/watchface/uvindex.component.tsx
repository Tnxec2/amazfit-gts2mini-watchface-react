import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { WatchImage, WatchNumber, WatchProgressAlt2, WatchShortcutElement } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import ProgressAlt2Component from "./progressAlt2.component";
import WatchShortCutComponent from "./watchshortcut.component";


const UvIndexComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);


  function onChangeNoData(val: number) {
    setWatchface({...watchface, weatherext: { ...watchface.weatherext, uvNoDataImageIndex: val}})
  }

  function onChangeNumber(val: WatchNumber) {
    const w = {...watchface};
    w.weatherext.uvNumber = val
    setWatchface(w)
  }

  function onChangeIcon(val: WatchImage) {
    const w = {...watchface};
    w.weatherext.uvIcon = val
    setWatchface(w)
  }

  function onChangeSuffix(val: number) {
    const w = {...watchface};
    w.weatherext.uvSuffixImageIndex = val
    setWatchface(w)
  }

  function updateShortcut(val: WatchShortcutElement) {
    const w = {...watchface};
    w.weatherext.uvShortcut = val
    setWatchface(w)
  }
  function updateProgress(val: WatchProgressAlt2) {
    const w = {...watchface};
    w.weatherext.uvProgress = val
    setWatchface(w)
  }

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.weatherext.collapsedUvIndex = !w.weatherext.collapsedUvIndex;
          setWatchface(w);
        }}>
        UV Index
      </Card.Header>
      {!watchface.weatherext.collapsedUvIndex ? (
        <Card.Body>

          <WatchNumberComponent
            title='Text'
            digit={{...watchface.weatherext.uvNumber}}
            onUpdate={onChangeNumber}
            followDisabled={true}
          />
          { watchface.weatherext.uvNumber.enabled ?
          <BlocksArrayComponent ar={[
            {
              blocks: [
                { title: 'Suffix', type: BlockType.SelectFile, nvalue: watchface.weatherext.uvSuffixImageIndex, onChange: onChangeSuffix },
                { title: 'No Data', type: BlockType.SelectFile, nvalue: watchface.weatherext.uvNoDataImageIndex, onChange: onChangeNoData },
              ]
            }
          ]}  /> : ''
        }
          <ImageComponent
            title='Icon'
            image={{...watchface.weatherext.uvIcon}}
            onUpdate={onChangeIcon}
            />
          <ProgressAlt2Component
            title="Progress"
            progress={{...watchface.weatherext.uvProgress}}
            onUpdate={updateProgress}
          />
          <WatchShortCutComponent
            title='UV Shortcut'
            shortcut={{...watchface.weatherext.uvShortcut}}
            onUpdate={updateShortcut}
          />
            
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default UvIndexComponent;
