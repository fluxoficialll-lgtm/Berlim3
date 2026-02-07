
/**
 * idGenerator
 *
 * Centralized utility for generating unique identifiers (UUIDs).
 * This ensures consistency and avoids potential collisions by using the
 * browser's built-in crypto API, which is a secure and standard method for
 * generating random UUIDs.
 *
 * Usage:
 * import { generateUniqueId } from '../utils/idGenerator';
 * const newId = generateUniqueId();
 */
export const generateUniqueId = (): string => {
  return crypto.randomUUID();
};
