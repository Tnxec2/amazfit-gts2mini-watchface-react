import React, { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchImage } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";

const BackgroundComponent: FC = () => {
  const { watchface, setWatchface } = useContext<IWatchContext>(WatchfaceContext)

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Color', type: BlockType.Color, svalue: watchface.background.color, onChange: onChangeBackgroundColor },
      ]
    }
  ], [watchface.background])  // eslint-disable-line react-hooks/exhaustive-deps

  function onChangePreview(i: WatchImage) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, preview: i },
    });
  }
  function onChangeImage(i: WatchImage) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, image: i },
    });
  }
  function onChangeFloatingLayer(i: WatchImage) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, floatingLayer: i },
    });
  }

  function onChangeBackgroundColor(value: string) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, color: value },
    });
  }

  return (
    <Card>
      <Card.Header
        className="clickable"
        onClick={() => {
          let w = { ...watchface };
          w.background.collapsed = !w.background.collapsed;
          setWatchface(w);
        }}
      >
        Background
      </Card.Header>
      {!watchface.background.collapsed ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
          <ImageComponent 
            title='Preview'
            image={watchface.background.preview}
            onUpdate={onChangePreview}
            />
          <ImageComponent 
            title='Background'
            image={watchface.background.image}
            onUpdate={onChangeImage}
            />
          <ImageComponent 
            title='Floating layer'
            image={watchface.background.floatingLayer}
            onUpdate={onChangeFloatingLayer}
            />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default BackgroundComponent;
