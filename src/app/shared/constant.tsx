export class Constant {
  static readonly NONE = "None";
  static readonly startImageIndex = 0;
  static readonly width: number = 306;
  static readonly height: number = 354;
  static readonly deviceId: number = 73;

  static getImageIndex(index: number, max: number) {
    const resultIndex = index - Constant.startImageIndex;
    if (resultIndex >= max) {
      alert("Bad imageIndex: " + resultIndex);
      return 0;
    }
    return index;
  }
}
