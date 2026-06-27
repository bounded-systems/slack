import { test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertSeam } from "@bounded-systems/seam-check";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// @bounded-systems/slack: policy-gated, provenance-tracked Slack read surface.
// Prod files touch the policy gate, cas content-addressing, and the
// anchored-chain ledger only. The harness proves that edge and the no-ambient
// thesis; tests additionally exercise the anchored-chain-sqlite store.
test("@bounded-systems/slack upholds its seam claim", () => {
  assertSeam({
    root: SRC,
    prod: ["@bounded-systems/policy", "@bounded-systems/cas", "@bounded-systems/anchored-chain"],
    test: [
      "@bounded-systems/slack",
      "@bounded-systems/seam-check",
      "@bounded-systems/anchored-chain-sqlite",
      "node:fs",
    ],
  });
});
