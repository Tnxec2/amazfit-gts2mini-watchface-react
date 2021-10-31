import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import { Image, MultilangImage } from "../model/json.model";
import { AlignmentType, FollowType, LangCodeType } from "../model/types.model";
import { WatchCommonDigit } from "../model/watchFace.model";
import SelectFileListComponent from "../shared/selectFileList.component";

interface IProps {
  title: string;
  digit: WatchCommonDigit;
  onUpdate(digit: WatchCommonDigit): void;
  showNoData?: boolean;
  showDecimalPointer?: boolean;
  showDelimiter?: boolean;
  paddingZeroFix?: boolean;
  followDisabled?: boolean;
  onCopyFromNormal?(): void
}

const ImageDigitComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
  showNoData,
  showDecimalPointer,
  showDelimiter,
  paddingZeroFix,
  followDisabled,
  onCopyFromNormal
}) => {

  const imageSetIndex = useMemo<number>(() => findImageIndex(digit.json?.Digit?.Image?.MultilangImage), [digit])
  const unitImageSetIndex = useMemo<number>(() => findImageIndex(digit.json?.Digit?.Image?.MultilangImageUnit), [digit])

  function findImageIndex(ar: MultilangImage[]): number {
    if (!ar) return null
    let index = ar.findIndex((item) => item.LangCode === LangCodeType.All.json)
    return index >= 0 ? index : 0
  }

  function onChangeImageIndex(index: number) {
    const d = {...digit};
    if (!d.json.Digit.Image.MultilangImage) {
      d.json.Digit.Image.MultilangImage = []
    }
    if (!d.json.Digit.Image.MultilangImage[imageSetIndex]) {
      let length = d.json.Digit.Image.MultilangImage.push(new MultilangImage())
      d.json.Digit.Image.MultilangImage[length-1].LangCode = LangCodeType.All.json;
      d.json.Digit.Image.MultilangImage[length-1].ImageSet.ImageIndex = index;
      d.json.Digit.Image.MultilangImage[length-1].ImageSet.ImagesCount = d.con.count;
    } else {
      d.json.Digit.Image.MultilangImage[imageSetIndex].ImageSet.ImageIndex = index;
    }
    onUpdate(d);
  }

  function onChangeUnit(index: number) {
    const d = {...digit};
    if (!d.json.Digit.Image.MultilangImageUnit) {
      d.json.Digit.Image.MultilangImageUnit = []
    }
    if (!d.json.Digit.Image.MultilangImageUnit[imageSetIndex]) {
      let length = d.json.Digit.Image.MultilangImageUnit.push(new MultilangImage())
      d.json.Digit.Image.MultilangImageUnit[length-1].LangCode = LangCodeType.All.json;
      d.json.Digit.Image.MultilangImageUnit[length-1].ImageSet.ImageIndex = index;
      d.json.Digit.Image.MultilangImageUnit[length-1].ImageSet.ImagesCount = 1;
    } else {
      d.json.Digit.Image.MultilangImageUnit[imageSetIndex].ImageSet.ImageIndex = index;
    }
    onUpdate(d);
  }

  function onChangeX(e) {
    const d = {...digit};
    d.json.Digit.Image.X = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeY(e) {
    const d = {...digit};
    d.json.Digit.Image.Y = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangePaddingZero(e) {
    const d = {...digit};
    d.json.Digit.PaddingZero = !d.json.Digit.PaddingZero;
    onUpdate(d);
  }

  function onChangeAlignment(e) {
    const d = {...digit};
    d.json.Digit.Alignment = AlignmentType.toJson(parseInt(e.target.value));
    onUpdate(d);
  }

  function onChangeFollow(e) {
    const d = {...digit};
    d.json.CombingMode = d.json.CombingMode !== FollowType.Single.json ? FollowType.Single.json : FollowType.Follow.json;
    onUpdate(d);
  }

  function onChangeSpacing(e) {
    const d = {...digit};
    d.json.Digit.Spacing = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeNoData(index: number) {
    const d = {...digit};
    d.json.Digit.Image.NoDataImageIndex = index;
    onUpdate(d);
  }

  function onChangeDelimiter(index: number) {
    const d = {...digit};
    d.json.Digit.Image.DelimiterImageIndex = index;
    onUpdate(d);
  }

  function onChangeDecimalPointer(index: number) {
    const d = {...digit};
    d.json.Digit.Image.DecimalPointImageIndex = index;
    onUpdate(d);
  }

  function onChangeSeparator(index: number) {
    const d = {...digit};
    d.json.Separator.ImageIndex = index;
    onUpdate(d);
  }

  function onChangeSeparatorX(e) {
    const d = {...digit};
    d.json.Separator.Coordinates.X = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeSeparatorY(e) {
    const d = {...digit};
    d.json.Separator.Coordinates.Y = parseInt(e.target.value);
    onUpdate(d);
  }



  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={digit.enabledImage}
              onChange={() => {
                const d = { ...digit };
                d.enabledImage = !d.enabledImage;
                d.enabled = d.enabledImage || d.enabledSystemFont
                if ( !d.json.Digit.Image) {
                  d.json.Digit.Image = new Image()
                  let digitimage = new MultilangImage()
                  digitimage.ImageSet.ImagesCount = d.con.count
                  d.json.Digit.Image.MultilangImage[0] = digitimage
                }
                onUpdate(d);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {digit.enabledImage ? (
        <Card.Body>
          { !onCopyFromNormal ? '' : <div style={{clear:'both'}}><button className='btn btn-sm btn-secondary mb-1' style={{float:'right'}} onClick={onCopyFromNormal}>Copy from normal screen</button></div> }
          <div className="input-group input-group-sm mb-1 ">
            <SelectFileListComponent
              title='ImageIndex'
              setSelectedFileIndex={onChangeImageIndex}
              imageIndex={digit.json?.Digit?.Image?.MultilangImage[imageSetIndex]?.ImageSet?.ImageIndex}
            />
            <span className="input-group-text">count: {digit.json?.Digit?.Image?.MultilangImage[imageSetIndex]?.ImageSet?.ImagesCount}</span>
            </div>
            <div className="input-group input-group-sm mb-1 ">
            <span className="input-group-text" >
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={digit.json.Digit?.Image?.X ? digit.json.Digit.Image.X : 0}
              onChange={onChangeX}
            />
            <span className="input-group-text" >
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={digit.json.Digit?.Image?.Y ? digit.json.Digit.Image.Y : 0}
              onChange={onChangeY}
            />
          </div>
          {!digit.json.Digit.DisplayFormAnalog ? (
            <div className="input-group input-group-sm">
              <SelectFileListComponent
                title='Unit'
                setSelectedFileIndex={onChangeUnit}
                imageIndex={digit.json?.Digit?.Image?.MultilangImageUnit ? digit.json?.Digit?.Image?.MultilangImageUnit[unitImageSetIndex].ImageSet?.ImageIndex : null}
              />
            </div>
          ) : (
            ""
          )}
          {showNoData ? (
            <div className="input-group input-group-sm">
              <SelectFileListComponent
                title='NoData'
                setSelectedFileIndex={onChangeNoData}
                imageIndex={digit.json?.Digit?.Image?.NoDataImageIndex}
              />
            </div>
          ) : (
            ""
          )}
          {showDelimiter ? (
            <div className="input-group input-group-sm">
              <SelectFileListComponent
                title='Minus'
                setSelectedFileIndex={onChangeDelimiter}
                imageIndex={digit.json?.Digit?.Image?.DelimiterImageIndex}
              />
            </div>
          ) : (
            ""
          )}
          {showDecimalPointer ? (
            <div className="input-group input-group-sm">
              <SelectFileListComponent
                title='Decimal pointer'
                setSelectedFileIndex={onChangeDecimalPointer}
                imageIndex={digit.json?.Digit?.Image?.DecimalPointImageIndex}
              />
            </div>
          ) : (
            ""
          )}
          {!digit.json.Digit.DisplayFormAnalog ? (
            <>
              <div className="input-group input-group-sm mt-1">
                <span className="input-group-text" >
                  padding zero
                </span>
                <div className="input-group-text">
                  <input
                    className="form-check-input form-check-input-sm"
                    type="checkbox"
                    disabled={paddingZeroFix}
                    checked={digit.json?.Digit?.PaddingZero || paddingZeroFix}
                    onChange={onChangePaddingZero}
                  />
                </div>
                <span className="input-group-text" >
                  spacing
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={digit.json?.Digit?.Spacing ? digit.json.Digit.Spacing : 0}
                  onChange={onChangeSpacing}
                />
              </div>
              <div className="input-group input-group-sm mt-1">
                <span className="input-group-text" >
                  follow
                </span>
                <div className="input-group-text">
                  <input
                    className="form-check-input form-check-input-sm"
                    type="checkbox"
                    checked={digit.json?.CombingMode === FollowType.Follow.json}
                    onChange={onChangeFollow}
                    disabled={followDisabled}
                  />
                </div>
                <span className="input-group-text" >
                  alignment
                </span>

                <select
                  value={AlignmentType.fromJson(digit.json?.Digit?.Alignment)}
                  className="form-select form-select-sm"
                  onChange={onChangeAlignment}
                >
                  <option value="0">
                    Left
                  </option>
                  <option value="1">
                    Center
                  </option>
                  <option value="2">
                    Right
                  </option>
                </select>

              </div>

              <div className="input-group input-group-sm mt-1">
                <SelectFileListComponent
                  title='Separator'
                  setSelectedFileIndex={onChangeSeparator}
                  imageIndex={digit.json?.Separator?.ImageIndex}
                />
                <span className="input-group-text" >
                  X
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={digit.json.Separator?.Coordinates?.X ? digit.json.Separator.Coordinates.X : 0}
                  onChange={onChangeSeparatorX}
                />
                <span className="input-group-text" >
                  Y
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={digit.json.Separator?.Coordinates?.Y ? digit.json.Separator.Coordinates.Y : 0}
                  onChange={onChangeSeparatorY}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ImageDigitComponent;
