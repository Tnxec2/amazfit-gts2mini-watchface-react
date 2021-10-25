import React, { FC, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import SelectFileListComponent from "../shared/selectFileList.component";

const BackgroundAODComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

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
          setCollapsed(!collapsed);
        }}
      >
        Background
      </Card.Header>
      {!collapsed ? (
        <Card.Body>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent
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
