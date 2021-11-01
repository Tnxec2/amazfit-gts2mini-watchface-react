import React, { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType, IRow } from "../../model/blocks.model";

const BackgroundAODComponent: FC = () => {
  const { watchface, setWatchface }  = useContext<IWatchContext>(WatchfaceContext)

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Background', type: BlockType.SelectFile, nvalue: watchface.aod.backgroundImageIndex, onChange: onChangeBackgroundImageIndex },
      ]
    },
  ], [watchface.aod.backgroundImageIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeBackgroundImageIndex(index: number) {
    setWatchface({
      ...watchface,
      aod: { ...watchface.aod, backgroundImageIndex: index },
    });
  }

  return (
    <Card>
      <Card.Header
        className="clickable"
        onClick={() => {
          let w = {...watchface};
          w.aod.backgroundCollapsed = !w.aod.backgroundCollapsed;
          setWatchface(w);
        }}
      >
        Background
      </Card.Header>
      {!watchface.aod.backgroundCollapsed ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default BackgroundAODComponent;
