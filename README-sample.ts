import {
  toCompactUUID,
  toCanonicalUUID,
  isValidUUID,
  isValidCompactUUID,
} from "uuid-compact";
// this package does not provide a way to generate UUID's, but you can use the
// use e.g. the node:crypto module to generate UUIDv4's (which is what most
// of us use anyway), or the 'uuid' package from npm to generate any of the other
// variants from RFC4122.
import { randomUUID } from "node:crypto";

const lUUID = randomUUID();
console.log("Original UUID :", lUUID);
// 1a664e13-ac6a-4365-937d-9e6e8193322e

const lCompactUUID = toCompactUUID(lUUID);
console.log("Compacted UUID:", lCompactUUID);
// GmZOE6xqQ2WTfZ5ugZMyLg

const lUUIDAgain = toCanonicalUUID(lCompactUUID);
console.log("Compacted UUID back to Canonical UUID again:", lUUIDAgain);
// 1a664e13-ac6a-4365-937d-9e6e8193322e

// If you're not sure where either the source of the UUID or the short form can be
// trusted to always have valid UUID's, or shortened ones, you can use the `isValidUUID`
// and `isValidBase64URL` functions to check if the input is valid like so:

let compactedMaybe: string = "";
if (isValidUUID(lUUID)) {
  compactedMaybe = toCompactUUID(lUUID);
  console.log("Valid UUID; compacted:", compactedMaybe);
} else {
  throw new Error("Not a valid compact UUID");
}

let backToUUIDMaybe: string = "";
if (isValidCompactUUID(lCompactUUID)) {
  backToUUIDMaybe = toCanonicalUUID(lCompactUUID);
  console.log("Valid compact UUID; back to canonical:", backToUUIDMaybe);
} else {
  throw new Error("Not a valid compact UUID (base64url string)");
}
