export class Constant {
  static readonly NONE = "None";
  static readonly startImageIndex = 1;
  static readonly width: number = 348;
  static readonly height: number = 442;
  static readonly deviceId: number = 65;

  static getImageIndex(index: number, max: number) {
    const resultIndex = index - Constant.startImageIndex;
    if (resultIndex >= max) {
      alert("Bad imageIndex: " + resultIndex);
      return 0;
    }
    return index;
  }
}
