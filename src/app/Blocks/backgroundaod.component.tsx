import React, { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import SelectFileListComponent from "../shared/selectFileList.component";

const BackgroundAODComponent: FC = () => {
  const { watchface, setWatchface }  = useContext<IWatchContext>(WatchfaceContext)

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
          <div className="input-group input-group-sm mb-1">
            <SelectFileListComponent
              title='Background'
              setSelectedFileIndex={onChangeBackgroundImageIndex}
              imageIndex={watchface.aod.backgroundImageIndex}
            />
          </div>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default BackgroundAODComponent;
