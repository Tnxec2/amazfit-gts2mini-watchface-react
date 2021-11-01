import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow, OptionsAlignment } from "../../model/blocks.model";
import { Image, ImageCoord, MultilangImage } from "../../model/json.model";
import { AlignmentType, FollowType, LangCodeType } from "../../model/types.model";
import { WatchCommonDigit } from "../../model/watchFace.model";

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

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, nvalue: digit.json?.Digit?.Image?.MultilangImage[imageSetIndex]?.ImageSet?.ImageIndex, onChange: onChangeImageIndex },
        { title: `Count: ${digit.json?.Digit?.Image?.MultilangImage[imageSetIndex]?.ImageSet?.ImagesCount}`, type: BlockType.Empty },
      ]
    },
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: digit.json.Digit?.Image?.X ? digit.json.Digit.Image.X : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: digit.json.Digit?.Image?.Y ? digit.json.Digit.Image.Y : 0, onChange: onChangeY },
      ]
    },
    {
      blocks: [
        { title: 'Unit', type: BlockType.SelectFile, nvalue: digit.json?.Digit?.Image?.MultilangImageUnit ? digit.json?.Digit?.Image?.MultilangImageUnit[unitImageSetIndex].ImageSet?.ImageIndex : null, onChange: onChangeUnit },
      ]
    },
    {
      disabled: !showNoData,
      blocks: [
        { title: 'No data', type: BlockType.SelectFile, nvalue: digit.json?.Digit?.Image?.NoDataImageIndex, onChange: onChangeNoData },
      ]
    },
    {
      disabled: !showDelimiter,
      blocks: [
        { title: 'Minus', type: BlockType.SelectFile, nvalue: digit.json?.Digit?.Image?.DelimiterImageIndex, onChange: onChangeDelimiter },
      ]
    },
    {
      disabled: !showDecimalPointer,
      blocks: [
        { title: 'Decimal pointer', type: BlockType.SelectFile, nvalue: digit.json?.Digit?.Image?.DecimalPointImageIndex, onChange: onChangeDecimalPointer },
      ]
    },
    {
      disabled: digit.json.Digit.DisplayFormAnalog,
      blocks: [
        { title: 'padding zero', type: BlockType.Checkbox, checked: digit.json?.Digit?.PaddingZero || paddingZeroFix, onChange: onChangePaddingZero, disabled: paddingZeroFix },
        { title: 'spacing', type: BlockType.Number, nvalue: digit.json?.Digit?.Spacing ? digit.json.Digit.Spacing : 0, onChange: onChangeSpacing },
      ]
    },
    {
      disabled: digit.json.Digit.DisplayFormAnalog,
      blocks: [
        { title: 'follow', type: BlockType.Checkbox, checked: digit.json?.CombingMode === FollowType.Follow.json, onChange: onChangeFollow, disabled: followDisabled },
        { title: 'alignment', type: BlockType.Select, svalue: AlignmentType.fromJson(digit.json?.Digit?.Alignment).toString(), selectOptions: OptionsAlignment,  onChange: onChangeAlignment },
      ]
    },
    {
      disabled: digit.json.Digit.DisplayFormAnalog,
      blocks: [
        { title: 'Separator', type: BlockType.SelectFile, nvalue: digit.json?.Separator?.ImageIndex, onChange: onChangeSeparator },
        { title: 'X', type: BlockType.Number, nvalue: digit.json.Separator?.Coordinates?.X ? digit.json.Separator.Coordinates.X : 0, onChange: onChangeSeparatorX },
        { title: 'Y', type: BlockType.Number, nvalue: digit.json.Separator?.Coordinates?.Y ? digit.json.Separator.Coordinates.Y : 0, onChange: onChangeSeparatorY },
      ]
    },
  ], [digit]) // eslint-disable-line react-hooks/exhaustive-deps

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

  function onChangeX(val: number) {
    const d = {...digit};
    d.json.Digit.Image.X = val;
    onUpdate(d);
  }

  function onChangeY(val: number) {
    const d = {...digit};
    d.json.Digit.Image.Y = val;
    onUpdate(d);
  }

  function onChangePaddingZero(checked: boolean) {
    const d = {...digit};
    d.json.Digit.PaddingZero = checked;
    onUpdate(d);
  }

  function onChangeAlignment(val: string) {
    const d = {...digit};
    d.json.Digit.Alignment = AlignmentType.toJson(parseInt(val));
    onUpdate(d);
  }

  function onChangeFollow(checked: boolean) {
    const d = {...digit};
    d.json.CombingMode = checked ? FollowType.Follow.json : FollowType.Single.json;
    onUpdate(d);
  }

  function onChangeSpacing(val: number) {
    const d = {...digit};
    d.json.Digit.Spacing = val;
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
    if (!index) d.json.Separator = null
    else {
      if ( !d.json.Separator) d.json.Separator = new ImageCoord()
      d.json.Separator.ImageIndex = index;
    }
    onUpdate(d);
  }

  function onChangeSeparatorX(val: number) {
    const d = {...digit};
    if ( !d.json.Separator) d.json.Separator = new ImageCoord()
    d.json.Separator.Coordinates.X = val;
    onUpdate(d);
  }

  function onChangeSeparatorY(val: number) {
    const d = {...digit};
    if ( !d.json.Separator) d.json.Separator = new ImageCoord()
    d.json.Separator.Coordinates.Y = val;
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
                  d.json.Digit.DisplayFormAnalog = d.con.displayAnalog
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
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ImageDigitComponent;
