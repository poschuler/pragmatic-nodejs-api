import * as dotenv from "dotenv";
dotenv.config();

type Parser<T> = (val: string) => T;

function parseString(val: string): string {
  if (!val || val.trim() === "") {
    throw new Error("Expected non-empty string");
  }
  return val;
}

function parseNumber(val: string): number {
  if (!val || Number.isNaN(Number(val))) {
    throw new Error(`Expected valid number, got "${val}"`);
  }
  return Number(val);
}

function parseBoolean(val: string): boolean {
  if (val !== "true" && val !== "false") {
    throw new Error(`Expected "true" or "false", got "${val}"`);
  }
  return val === "true";
}

function getEnv<T>(name: string, parser: Parser<T>, defaultValue?: T): T {
  const raw = process.env[name];
  if (raw === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return parser(raw);
}

export const config = {
  app: {
    port: getEnv("PORT", parseNumber, 3000),
    env: getEnv("NODE_ENV", parseString, "development"),
    debug: getEnv("DEBUG", parseBoolean, false),
  },
};
