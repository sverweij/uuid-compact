import { equal, match } from "node:assert/strict";
import { randomUUID, randomBytes } from "node:crypto";
import { describe, it } from "node:test";

import {
  toCompactUUID,
  toCanonicalUUID,
  isValidCompactUUID,
  isValidUUID,
} from "./uuid-compact.js";

function generateRandomBase64URL(): string {
  const randomBytesArray = randomBytes(16);
  const base64URL = randomBytesArray.toString("base64url");
  return base64URL;
}

const RANDOM_SAMPLES = new Array(42).fill(null).map(() => randomUUID());
const SAMPLES = [
  "00000000-0000-0000-0000-000000000000",
  "ffffffff-ffff-ffff-ffff-ffffffffffff",
  ...RANDOM_SAMPLES,
];

const RANDOM_BASE64URLS = new Array(42)
  .fill(null)
  .map(() => generateRandomBase64URL());

describe("transparently toCompacts random UUIDs", () => {
  for (const sample of SAMPLES) {
    it(`encoding and decoding ${sample} is idempotent`, () => {
      equal(toCanonicalUUID(toCompactUUID(sample)), sample);
    });

    it(`${sample} is a valid base64url string`, () => {
      equal(isValidCompactUUID(toCompactUUID(sample)), true);
    });

    it(`${sample} is a valid UUID`, () => {
      equal(isValidUUID(toCanonicalUUID(toCompactUUID(sample))), true);
    });
  }
});

describe("transparently toCanonicals random base64url strings", () => {
  for (const sample of RANDOM_BASE64URLS) {
    it(`encoding and decoding ${sample} is idempotent`, () => {
      equal(toCompactUUID(toCanonicalUUID(sample)), sample);
    });

    it(`toCanonical(${sample})=>${toCanonicalUUID(sample)} is something that _looks_ like a UUID`, () => {
      // note that a random base64url string is not guaranteed to be a valid UUID
      // hence the use of a naive regex here.
      const naiveUUIDRE =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      match(toCanonicalUUID(sample), naiveUUIDRE);
    });
  }
});

describe("isValidUUID", () => {
  it("returns true for a valid UUID", () => {
    equal(isValidUUID("00000000-0000-0000-0000-000000000000"), true);
  });

  it("returns false for a UUID missing the last character", () => {
    equal(isValidUUID("00000000-0000-0000-0000-00000000000"), false);
  });

  it("returns false for a subtly invalid UUID", () => {
    equal(isValidUUID("02bad511-874e-ad3b-c3d1-d556a2c5a6fe"), false);
  });

  it("returns false for an obviously invalid UUID", () => {
    equal(isValidUUID("¯\\_ (ツ)_/¯."), false);
  });
});

describe("isValid", () => {
  it("returns true for a valid shortened UUID", () => {
    equal(isValidCompactUUID("AAAAAAAAAAAAAAAAAAAAAA"), true);
  });

  it("returns false for a subtly invalid shortened UUID", () => {
    equal(isValidCompactUUID("AAAAAAAAAAAAAAAAAAAAA"), false);
  });

  it("returns false for an obviously invalid shortened UUID", () => {
    equal(isValidCompactUUID("¯\\_ (ツ)_/¯."), false);
  });
});
