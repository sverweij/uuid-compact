/**
 * Validates a UUID in canonical format
 *
 * @param pUUID a string with the UUID in canonical format
 * @returns true if the UUID is a valid one
 */
export declare function isValidUUID(pUUID: string): boolean;

/**
 * Validates a UUID in base64url format
 * @param pCompactUUID
 * @returns true if the compact UUID is a valid base64url encoded string of length 22
 */
export declare function isValidCompactUUID(pCompactUUID: string): boolean;

/**
 * encodes a canonical UUID string into a base64url string
 *
 * @param pUUID a string with the UUID in canonical format
 * @returns a string with the UUID in base64url format
 */
export declare function encode(pUUID: string): string;

/**
 * Decodes a base64url string into a canonical UUID string
 *
 * @param pCompactUUID a string with the UUID in base64url format
 * @returns a string with the UUID in canonical format
 */
export declare function decode(pCompactUUID: string): string;
