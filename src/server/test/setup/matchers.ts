import { extendWithHTTPMatchers } from "@meow-meow-dev/server-utilities/test/matchers/http";
import { extendWithNeverthrowMatchers } from "@meow-meow-dev/server-utilities/test/matchers/neverthrow";
import { expect } from "vitest";

extendWithHTTPMatchers(expect);
extendWithNeverthrowMatchers(expect);
