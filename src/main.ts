const UUID_REGEX =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
const BASE64_REGEX = /^[A-Za-z0-9_-]{22}$/;

function octetsToUuid(pOctets: Uint8Array): string {
  const lUUIDAsHex = Array.from(pOctets)
    .map((pOctet) => pOctet.toString(16).padStart(2, "0"))
    .join("");

  return `${lUUIDAsHex.slice(0, 8)}-${lUUIDAsHex.slice(8, 12)}-${lUUIDAsHex.slice(12, 16)}-${lUUIDAsHex.slice(16, 20)}-${lUUIDAsHex.slice(20, 32)}`;
}

function uuidToOctets(pUUID: string): Uint8Array {
  const lUuidAsHex = pUUID.replace(/-/g, "");
  const lReturnValue = new Uint8Array(16);

  for (let i = 0; i < 16; i++) {
    lReturnValue[i] = parseInt(lUuidAsHex.substring(i * 2, i * 2 + 2), 16);
  }

  return lReturnValue;
}
export function isValidUUID(pUUID: string): boolean {
  return UUID_REGEX.test(pUUID);
}

export function isValidCompactUUID(pCompactUUID: string): boolean {
  return BASE64_REGEX.test(pCompactUUID);
}

export function encode(pUUID: string): string {
  return Buffer.from(uuidToOctets(pUUID)).toString("base64url");
}

export function decode(pCompactUUID: string): string {
  return octetsToUuid(Buffer.from(pCompactUUID, "base64url"));
}
