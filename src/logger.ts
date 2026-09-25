export type LogEntry = {
  level: "info" | "warn";
  event: string;
  [field: string]: unknown;
};

export type Logger = (entry: LogEntry) => void;

export const silentLogger: Logger = () => {};

/** Writes one JSON line per entry, the format the ops dashboard ingests. */
export function jsonLinesLogger(write: (line: string) => void): Logger {
  return (entry) => write(JSON.stringify({ ts: new Date().toISOString(), ...entry }));
}
