const colorRegex: RegExp = /^#[0-9A-F]{6}$/i;

export default class Color {
  static hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  static rgbToHex(r: number, g: number, b: number) {
    return (
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0")
    );
  }

  /**
   * Read amazfit hex color from Json to HTML-HEX-String
   */
  static colorRead(color: string) {
    if (!color) return null;
    if (color.length === 18)
      color = color.substring(0, 2) + color.substring(10, 18);
    if (color.length === 10) color = "#" + color.substring(4);
    //let old_color = this.hexToRgb(color);
    //let new_color = this.rgbToHex(old_color.r, old_color.g, old_color.b);
    return color;
  }

  /*
        Read from json 16 bit background amazfit color to 32 bit
    */
  static colorBackgroundRead(color: string): string {
    if (!color) return null;
    if (color.length === 18)
      color = color.substring(0, 2) + color.substring(8, 18);
    let firstByteS = color.substring(8, 10);
    let secondByteS = color.substring(10, 12);
    let firstByte = parseInt(firstByteS, 16);
    let secondByte = parseInt(secondByteS, 16);

    let r = 0;
    let g = 0;
    let b = 0;

    r = ((firstByte >> 3) & 0x1f) << 3;
    g = (((secondByte >> 5) & 0x7) | ((firstByte & 0x07) << 3)) << 2;
    b = (secondByte & 0x1f) << 3;

    let new_color = this.rgbToHex(r, g, b);

    console.log(color, new_color);
    
    return new_color;
  }

  /*
    from html-hex 32 bit color to 16 bit amazfit color 
    */
  static colorBackgroundWrite(hex: string): string {
    let h = this.hexToRgb(hex);

    let r = h.r;
    let g = h.g;
    let b = h.b;

    let temp_b = (b >> 3) & 0x1f;
    let temp_g = ((g >> 2) & 0x7) << 5;
    let secondByte = temp_b | temp_g;

    let temp_g2 = (g >> 5) & 0x07;
    let temp_r = ((r >> 3) & 0x1f) << 3;
    let firstByte = temp_g2 | temp_r;
    let firstByteS = firstByte.toString(16).padStart(2, '0').toUpperCase();
    let secondByteS = secondByte.toString(16).padStart(2, '0').toUpperCase();

    let new_color = "0xFFFF" + firstByteS + secondByteS;
    return new_color;
  }

  /*
    from html hex 32 bit color to 32 bit amazfit json hex color
  */
  static colorWrite(hex: string): string {
    let h = this.hexToRgb(hex);

    let r = h.r;
    let g = h.g;
    let b = h.b;

    let new_color =
      "0xFF" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0");
    return new_color;
  }

  static GFG_Fun(color: any) {
    return colorRegex.test(color);
  }
}
