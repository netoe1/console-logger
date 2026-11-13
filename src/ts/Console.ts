import { inspect } from "node:util";
import { EConsoleType, EConsoleHexColors } from "./types/types.js";

const ANSI_RESET = "\x1b[0m";
const ANSI_GRAY = "\x1b[90m";

const FALLBACK_COLORS: Record<EConsoleType, string> = {
  [EConsoleType.ERROR]: "\x1b[31m",
  [EConsoleType.WARNING]: "\x1b[33m",
  [EConsoleType.INFO]: "\x1b[34m",
  [EConsoleType.SUCCESS]: "\x1b[32m",
  [EConsoleType.LOG]: "\x1b[37m",
};

export default class Console {
  private static getTimeStamp(): Date {
    return new Date();
  }

  private static resolveColor(
    color: EConsoleHexColors,
    type: EConsoleType,
  ): string {
    if (!color) {
      return FALLBACK_COLORS[type];
    }

    if (color.startsWith("\x1b[")) {
      return color;
    }

    const hex = color.replace(/^#/, "");
    if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      return `\x1b[38;2;${r};${g};${b}m`;
    }

    return FALLBACK_COLORS[type];
  }

  private static formatMessages(messages: unknown[]): string {
    return messages
      .map((item) =>
        typeof item === "string"
          ? item
          : inspect(item, {
              colors: true,
              depth: null,
              breakLength: 80,
            }),
      )
      .join(" ");
  }

  private static print_into(
    type_console: EConsoleType,
    color: EConsoleHexColors,
    raw_date: Date,
    ...messages: unknown[]
  ): void {
    const formattedDate = raw_date.toLocaleString("pt-BR").replace(",", "");
    const ansiColor = this.resolveColor(color, type_console);
    const label = `[${type_console.toUpperCase()}]`;
    const body = this.formatMessages(messages);
    const output = `${ANSI_GRAY}[${formattedDate}]${ANSI_RESET} ${ansiColor}${label}${ANSI_RESET} ${body}`;

    switch (type_console) {
      case EConsoleType.ERROR:
        console.error(output);
        break;
      case EConsoleType.WARNING:
        console.warn(output);
        break;
      case EConsoleType.INFO:
        console.info(output);
        break;
      default:
        console.log(output);
        break;
    }
  }

  public static log(...messages: unknown[]): void {
    this.print_into(
      EConsoleType.LOG,
      EConsoleHexColors.WHITE,
      this.getTimeStamp(),
      ...messages,
    );
  }

  public static error(...messages: unknown[]): void {
    this.print_into(
      EConsoleType.ERROR,
      EConsoleHexColors.RED,
      this.getTimeStamp(),
      ...messages,
    );
  }

  public static warn(...messages: unknown[]): void {
    this.print_into(
      EConsoleType.WARNING,
      EConsoleHexColors.YELLOW,
      this.getTimeStamp(),
      ...messages,
    );
  }

  public static info(...messages: unknown[]): void {
    this.print_into(
      EConsoleType.INFO,
      EConsoleHexColors.BLUE,
      this.getTimeStamp(),
      ...messages,
    );
  }

  public static success(...messages: unknown[]): void {
    this.print_into(
      EConsoleType.SUCCESS,
      EConsoleHexColors.GREEN,
      this.getTimeStamp(),
      ...messages,
    );
  }
}