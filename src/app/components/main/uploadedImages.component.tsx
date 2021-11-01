import { FC, useContext } from "react";
import { IWatchContext, WatchfaceContext } from "../../context";


const UploadedImagesomponent: FC = () => {
  const { images } = useContext<IWatchContext>(WatchfaceContext);

  return (
    <div className="container d-flex justify-content-center">
      { images.length > 0 ? 
      <div>
        <h2>number of images: {images.length} </h2>
        <ul className="list-group blocks" style={{width: "100%"}}>
          {images.map( (img) => 
              <li
              key={img.id}
              value={img.id}
              className="list-group-item fileitem"
            >
              {<img src={img.image.src} alt={img.name} width={30} />}
              {img.name}
            </li>
          )}
        </ul>
        </div>
    : <div>
      no uploaded images
    </div>
    }
    </div>
  );
};

export default UploadedImagesomponent;
