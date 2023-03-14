import "bootstrap/dist/css/bootstrap.min.css";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import FileLoaderComponent from "./app/components/main/fileLoader.component";
import LeftSideComponent from "./app/components/main/leftside.component";
import RightSideComponent from "./app/components/main/rightside.component";
import { IImage } from "./app/model/image.model";

import { WatchState } from "./app/model/watchState";
import { WatchfaceContext } from "./app/context";
import { WatchFace } from "./app/model/watchFace.gts2mini.model";
import { Constant, IDevice } from "./app/shared/constant";
import { getDeviceFromStorage } from "./app/components/main/settings.component";

const App: FC = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [watchface, setWatchface] = useState<WatchFace>(new WatchFace());
  const [watchState, setWatchState] = useState<WatchState>(new WatchState());

  const [jsonName, setJsonName] = useState<string>(null);
  const [previewScreenNormal, setPreviewScreenNormal] = useState<boolean>(true);

  const [device, setDevice] = useState<IDevice>(Constant.devices.gts2mini);

  useEffect( () => {
    setDevice(getDeviceFromStorage())
  }, [])

  return (
    <WatchfaceContext.Provider
      value={{
        images,
        setImages,
        watchface,
        setWatchface,
        watchState,
        setWatchState,
        jsonName,
        setJsonName,
        previewScreenNormal,
        setPreviewScreenNormal,
        device,
        setDevice
      }}
    >
      <Container className="App d-flex flex-column min-vh-100 vh-100">
        <Row className="header">
          <FileLoaderComponent />
        </Row>
        <Row className="main">
          <Col xs={6} className="leftcol">
            <LeftSideComponent />
          </Col>
          <Col xs={6} className="rightcol">
            <RightSideComponent />
          </Col>
        </Row>
      </Container>
    </WatchfaceContext.Provider>
  );
};

export default App;
