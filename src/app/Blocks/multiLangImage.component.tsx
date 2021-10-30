import { FC, useMemo } from "react";

import SelectFileListComponent from "../shared/selectFileList.component";
import { MultilangImage } from "../model/json.model";
import { LangCodeType } from "../model/types.model";

interface IProps {
  title: string;
  defaultcount: number;
  images: MultilangImage[];
  onUpdate(images: MultilangImage[]): void;
}

const MultilangImageComponent: FC<IProps> = ({ title, defaultcount, images, onUpdate }) => {

  const imageSetIndex = useMemo<number>(() => findImageIndex(images), [images])

  function findImageIndex(ar: MultilangImage[]): number {
    if (!ar) return null
    let index = ar.findIndex((item) => item.LangCode === LangCodeType.All.json)
    return index >= 0 ? index : 0
  }

  function onChangeImageIndex(index: number) {
    const d = [...images];
    if (!images[imageSetIndex]) {
      let length = images.push(new MultilangImage())
      images[length-1].LangCode = LangCodeType.All.json;
      images[length-1].ImageSet.ImageIndex = index;
      images[length-1].ImageSet.ImagesCount = defaultcount;
    } else {
      images[imageSetIndex].ImageSet.ImageIndex = index;
    }
    onUpdate(d);
  }

  return (
      <div className="input-group input-group-sm">
        <SelectFileListComponent
          title={title}
          imageIndex={images[imageSetIndex]?.ImageSet.ImageIndex}
          setSelectedFileIndex={onChangeImageIndex}
        />
      </div>
  );
};

export default MultilangImageComponent;
