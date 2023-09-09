export interface IDevice {
  width: number,
  height: number,
  deviceId: number,
  title: string,
  countEditable?: boolean,
}

export class Constant {
  static readonly version = "1.7.22"
  static readonly DEVICE_KEY = "com.kontranik.gts2editor.device";
  static readonly NONE = "None";
  static readonly startImageIndex = 0;
  static readonly default_device_id = 73;



  static readonly devices = {
    gts2mini: { width: 306, height: 354, deviceId: 73, title: 'Gts2 mini', countEditable: true } as IDevice,
    bipu: { width: 302, height: 320, deviceId: 71, title: 'Bip U', countEditable: true } as IDevice,
    bip3: { width: 240, height: 280, deviceId: 71, title: 'Bip 3', countEditable: true } as IDevice,
  }
}
