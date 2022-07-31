export interface IDevice {
  width: number,
  height: number,
  deviceId: number,
  title: string,
}

export class Constant {
  static readonly version = "1.4.6"
  static readonly DEVICE_KEY = "com.kontranik.gts2editor.device";
  static readonly NONE = "None";
  static readonly startImageIndex = 0;
  static readonly default_device_id = 73;


  static readonly devices = {
    gts2minie: { width: 306, height: 354, deviceId: 73, title: 'Gts2 mini' },
    bipu: { width: 302, height: 320, deviceId: 71, title: 'Bip U' },
  }
}
