import { inspect, stripVTControlCharacters } from "node:util";
import { EConsoleType, EConsoleHexColors } from "./types/types.js";

const ANSI_RESET = "\x1b[0m";
const ANSI_BOLD = "\x1b[1m";
const ANSI_DARK_GRAY = "\x1b[90m"; // Equivalente ao Fore.LIGHTBLACK_EX do Colorama

const FALLBACK_COLORS: Record<EConsoleType, string> = {
  [EConsoleType.ERROR]: "\x1b[31m",
  [EConsoleType.WARNING]: "\x1b[33m",
  [EConsoleType.INFO]: "\x1b[36m",
  [EConsoleType.SUCCESS]: "\x1b[32m",
  [EConsoleType.LOG]: "\x1b[37m",
  [EConsoleType.DEBUG]: "\x1b[35m",
};

export default class Console {
  private static debugIsActive = true;

  private static getTimeStamp(): Date {
    return new Date();
  }

  private static getCallerFile(): string {
    const stack = new Error().stack;
    if (!stack) return "unknown";

    const lines = stack.split("\n").slice(1);
    for (const line of lines) {
      if (
        line.includes("Console.ts") ||
        line.includes("Console.js") ||
        line.includes("node:internal")
      ) {
        continue;
      }

      const match = line.match(
        /(?:\(|at\s+)(?:file:\/\/)?([^\s()]+?):\d+:\d+\)?$/,
      );
      if (match?.[1]) {
        return match[1].split(/[/\\]/).pop() ?? "unknown";
      }
    }

    return "unknown";
  }

  private static hexToAnsi(hexColor: string): string | null {
    const hex = hexColor.replace(/^#/, "");
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return null;
    }

    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    return `\x1b[38;2;${r};${g};${b}m`;
  }

  private static resolveColor(
    color: EConsoleHexColors,
    type: EConsoleType,
  ): string {
    const rawColor: string = color;

    if (!rawColor) {
      return FALLBACK_COLORS[type];
    }

    if (rawColor.startsWith("\x1b[")) {
      return rawColor;
    }

    return this.hexToAnsi(rawColor) ?? FALLBACK_COLORS[type];
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
    const filename = this.getCallerFile();
    const ansiColor = this.resolveColor(color, type_console);
    const label = type_console.toUpperCase().padEnd(8);
    const body = this.formatMessages(messages);

    const output =
      `${ANSI_DARK_GRAY}${formattedDate}${ANSI_RESET} ` +
      `${ANSI_BOLD}${ansiColor}${label}${ANSI_RESET} ` +
      `${ANSI_DARK_GRAY}[${filename}]${ANSI_RESET} ` +
      `${body}`;

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

    const _rawText = `${formattedDate} ${label} [${filename}] ${stripVTControlCharacters(body)}`;
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

  public static debug(...messages: unknown[]): void {
    if (this.debugIsActive) {
      this.print_into(
        EConsoleType.DEBUG,
        EConsoleHexColors.PURPLE,
        this.getTimeStamp(),
        ...messages,
      );
    }
  }

  public static setDebugMode(state: boolean): void {
    this.debugIsActive = state;
  }

  public static isDebugModeActive(): boolean {
    return this.debugIsActive;
  }
}