import { HTTPError } from "./HTTPError.js";

export function isNotFound(error: unknown): error is Error {
  return (
    error instanceof Error &&
    error.cause instanceof HTTPError &&
    error.cause.status === 404
  );
}
