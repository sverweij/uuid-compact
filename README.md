## Goal

Represent UUIDs with compact base64url encoding

e.g. `1a664e13-ac6a-4365-937d-9e6e8193322e` (36 characters) => `GmZOE6xqQ2WTfZ5ugZMyLg` (22 characters).

> [!NOTE]
> Not published to npm due to overwhelming triviality.

## Usage

```typescript
import { encode, decode, isValidUUID, isValidCompactUUID } from "uuid-compact";
// this package does not provide a way to generate UUID's, but you can use the
// use e.g. the node:crypto module to generate UUIDv4's (which is what most
// of us use anyway), or the 'uuid' package from npm to generate any of the other
// variants from RFC4122.
import { randomUUID } from "node:crypto";

const lUUID = randomUUID();
console.log("Original UUID:", lUUID);
// 1a664e13-ac6a-4365-937d-9e6e8193322e

const lCompactUUID = encode(lUUID);
console.log("Shortened:", lCompactUUID);
// GmZOE6xqQ2WTfZ5ugZMyLg

const lUUIDAgain = decode(lCompactUUID);
console.log("Shortened id decoded back to UUID:", lUUIDAgain);
// 1a664e13-ac6a-4365-937d-9e6e8193322e

// If you're not sure where either the source of the UUID or the short form can be
// trusted to always have valid UUID's, or shortened ones, you can use the `isValidUUID`
// and `isValidBase64URL` functions to check if the input is valid like so:

let shortenedMaybe: string = "";
if (isValidUUID(lUUID)) {
  shortenedMaybe = encode(lUUID);
  console.log(shortenedMaybe);
} else {
  throw new Error("Not a valid UUID");
}

let backToUUIDMaybe: string = "";
if (isValidCompactUUID(lCompactUUID)) {
  backToUUIDMaybe = decode(lCompactUUID);
  console.log(backToUUIDMaybe);
} else {
  throw new Error("Not a valid base64url string");
}
```

## The issue

UUID's are 128 bits long, and are typically represented as 32 hexadecimal characters,
interspersed with dashes, making for a total of 36 characters. This is not ideal
for some use cases; URLs, QR codes or (yes) SMSs.

Removing the dashes, and using a base higher than base16 will shorten the
representation, retain the number of bits, as well as the entropy. Some approaches:

- Use base64url encoding, which will shorten the representation to 22 characters
  and keeps it safe for use in URLs.
- use base58 encoding, which will shorten the representation as well, but leaves out
  the characters `0`, `O`, `I` and `l` to avoid confusion. Useful if humans need
  to type the UUID's in.
- Use base32, base58 or base64url encoding, but reshuffle the bits so the resulting
  sting gains useful properties. Like always starting with a letter, so it can be used
  for identifiers. The (now expired) ietf draft
  [Compact UUIDs for Constrained Grammars](https://datatracker.ietf.org/doc/draft-taylor-uuid-compact/)
  has this aim. Drawback is the implementation is a tad more complex than the
  other options.
- Use an ever higher base, such as base85 or base128, which will shorten the representation
  even further, but at the cost of using more characters that might not safe for
  use in URL's and/ or human consumption

## The solution

The simplest solution that seems to work looks to be base64url encoding, which
will shorten the representation to 22 characters and keeps it safe for use in URL's.
This is what the `encode` and `decode` functions in this repository do right now.