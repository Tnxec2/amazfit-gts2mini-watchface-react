import React, { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType, IRow } from "../../model/blocks.model";

const BackgroundComponent: FC = () => {
  const { watchface, setWatchface } = useContext<IWatchContext>(WatchfaceContext)

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Preview', type: BlockType.SelectFile, nvalue: watchface.background.previewIndex, onChange: onChangeBackgroundPreviewImage },
        { title: 'Background', type: BlockType.SelectFile, nvalue: watchface.background.imageIndex, onChange: onChangeBackgroundImageIndex },
      ]
    },
    {
      blocks: [
        { title: 'Color', type: BlockType.Color, svalue: watchface.background.color, onChange: onChangeBackgroundColor },
      ]
    }
  ], [watchface.background])  // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeBackgroundPreviewImage(index: number) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, previewIndex: index },
    });
  }

  function onChangeBackgroundImageIndex(index: number) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, imageIndex: index },
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
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default BackgroundComponent;
