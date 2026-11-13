import { EConsoleType, EConsoleHexColors } from "./types/types.js";
export default class Console {
  private getTimeStamp() : Date {
    return (new Date());
  }

  private print_into(
    type_console: EConsoleType,
    color: EConsoleHexColors,
    raw_date: Date,
    message: string,
  ) {
    // toLocaleString('pt-BR').replace(',', '');
    

  }
  public static log() {}
  public static error() {}
  public static warn() {}
  public static info() {}
}
