import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { ImageSet, ImageSetAnimation } from "../../model/json.gts2minit.model";
import { WatchImageSet } from "../../model/watchFace.gts2mini.model";
import ImageSetComponent from "./imageSet.component";


const AnimationComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function onChangeFrameInterval(index: number, val: number) {
    const w = {...watchface};
    w.animation.imageSetAnimation[index].FrameInterval = val
    setWatchface(w)
  }
  function onChangePlayTimes(index: number, val: number) {
    const w = {...watchface};
    w.animation.imageSetAnimation[index].PlayTimes = val
    setWatchface(w)
  }
  function onChangeRepeat(index: number, val: boolean) {
    const w = {...watchface};
    w.animation.imageSetAnimation[index].Repeat = val
    setWatchface(w)
  }

  function updateImageSet(index: number, d: WatchImageSet) {
    const w = {...watchface};
    w.animation.imageSetAnimation[index].ImageProgress = d.json
    setWatchface(w)
  }

  function onDelete(index: number) {
    if ( window.confirm('Would you delete animation ' + (index + 1))) {
      const w = {...watchface}
      w.animation.imageSetAnimation.splice(index, 1)
      setWatchface(w)
    }
  }
  function addAnimation() {
    const w = {...watchface}
    let newAnimation = new ImageSetAnimation()
    newAnimation.FrameInterval = 0
    newAnimation.ImageProgress = new ImageSet()
    newAnimation.Repeat = true
    newAnimation.PlayTimes = 1
    w.animation.imageSetAnimation.push(newAnimation)
    setWatchface(w)
  }

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.animation.collapsed = !w.animation.collapsed;
          setWatchface(w);
        }}>
        Animation
        <button className="btn btn-outline-success" type="button" onClick={addAnimation}>Add</button>
      </Card.Header>
      {!watchface.animation.collapsed ? (
        <Card.Body>
          { watchface.animation.imageSetAnimation.length >= 0 ? watchface.animation.imageSetAnimation.map( (item, index ) => 
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center"> 
                Animation {index + 1}
                <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onDelete(index)} >Delete</button>
              </Card.Header>
              <BlocksArrayComponent ar={[
                    {
                      blocks: [
                        { title: 'frame interval (msec)', type: BlockType.Number, nvalue: item.FrameInterval, min: 1, onChange: (val) => onChangeFrameInterval(index, val) },
                        { title: 'play times', type: BlockType.Number, nvalue: item.PlayTimes, min: 1, max: 255, onChange: (val) => onChangePlayTimes(index, val) },
                        { title: 'repeat', type: BlockType.Checkbox, checked: item.Repeat, onChange: (val) => onChangeRepeat(index, val) },
                      ]
                    }
              ]} />
              <ImageSetComponent
                title='Image progress'
                imageSet={new WatchImageSet(null, item.ImageProgress)}
                onUpdate={(is) => updateImageSet(index, is)}
              />
            </Card>
          ) : 'no animation added' 
          }
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default AnimationComponent;
