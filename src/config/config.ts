import * as dotenv from "dotenv";

dotenv.config();

type EnvSource = Record<string, string | undefined>;
type Parser<T> = (val: string) => T;

export type AppConfig = {
  app: {
    port: number;
    env: string;
    debug: boolean;
  }
};

function parseString(val: string): string {
  const normalizedValue = val.trim();

  if (normalizedValue === "") {
    throw new Error("Expected non-empty string");
  }

  return normalizedValue;
}

function parseBoolean(val: string): boolean {
  const normalizedValue = val.trim().toLowerCase();

  if (normalizedValue === "true") {
    return true;
  }

  if (normalizedValue === "false") {
    return false;
  }

  throw new Error(`Expected "true" or "false", got "${val}"`);
}

function parseNumber(val: string): number {
  const normalizedValue = val.trim();
  const parsedValue = Number(normalizedValue);

  if (normalizedValue === "" || Number.isNaN(parsedValue)) {
    throw new Error(`Expected valid number, got "${val}"`);
  }

  return parsedValue;
}

function getEnv<T>(
  env: EnvSource,
  name: string,
  parser: Parser<T>,
  defaultValue?: T,
): T {
  const raw = env[name];

  if (raw === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }

    throw new Error(`Missing required environment variable: ${name}`);
  }

  return parser(raw);
}

export function loadConfig(env: EnvSource): AppConfig {
  return {
    app: {
      port: getEnv(env, "PORT", parseNumber, 3000),
      env: getEnv(env, "NODE_ENV", parseString, "development"),
      debug: getEnv(env, "DEBUG", parseBoolean, false),
    }
  };
}

export const config = loadConfig(process.env);

