import React, { FC, ReactElement, useContext, useState } from "react";
import { Constant } from "./constant";
import { IWatchContext, WatchfaceContext } from "../context";
import "./selectFileList.css";
interface IProps {
  title: string,
  value: number;
  onChange(id: number): void;
}

const SelectFileListComponent: FC<IProps> = ({
  title,
  value: imageIndex,
  onChange: onChange,
}) => {
  const { images } = useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function onFileSelected(id: number) {
    onChange(id);
    setCollapsed(true);
  }

  function onRemove() {
    onFileSelected(null);
  }

  const options: ReactElement[] = [];

  options.push(
    <option key={"None"} value={"None"}>
      {" "}
    </option>
  );

  if (images) {
    for (var i = 0; i < images.length; i++) {
      let img = images[i];

      options.push(
        <li
          key={img.id}
          value={img.id}
          className="list-group-item fileitem"
          onClick={() => onFileSelected(img.id)}
        >
          {<img src={img.image.src} alt={img.name} width={30} />}
          {img.name}
        </li>
      );
    }
  }
  
  return (
    <>
      <span className="input-group-text">{title}</span>
      <div className="input-group-text dropdown">
        <div>
          {imageIndex !== null &&
          imageIndex !== undefined &&
          images[imageIndex - Constant.startImageIndex]
            ? images[imageIndex - Constant.startImageIndex].name
            : "None"}
        </div>
        {collapsed ? (
          ""
        ) : (
          <ul className="list-group dropdown-content">{options}</ul>
        )}
      </div>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
        disabled={!images || images.length === 0}
      >
        + 
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={onRemove}
        disabled={!imageIndex}
      >
        x
      </button>
    </>
  );
};

export default SelectFileListComponent;
