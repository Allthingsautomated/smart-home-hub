import crypto from "crypto";
import { ENV } from "../env";

interface CredentialData {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  [key: string]: unknown;
}

/**
 * Encrypts credential data using AES-256-GCM
 * Returns a string in format: iv:authTag:encrypted
 */
export function encryptCredentials(data: CredentialData): string {
  if (!ENV.socialEncryptionKey) {
    throw new Error("SOCIAL_ENCRYPTION_KEY environment variable is not set");
  }

  // Convert hex string to buffer
  const key = Buffer.from(ENV.socialEncryptionKey, "hex");

  if (key.length !== 32) {
    throw new Error(
      "SOCIAL_ENCRYPTION_KEY must be 32 bytes (64 hex characters)"
    );
  }

  // Generate random initialization vector
  const iv = crypto.randomBytes(16);

  // Create cipher
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  // Encrypt the data
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");

  // Get authentication tag
  const authTag = cipher.getAuthTag();

  // Return in format: iv:authTag:encrypted
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/**
 * Decrypts credential data encrypted with encryptCredentials
 * Expects format: iv:authTag:encrypted
 */
export function decryptCredentials(encryptedData: string): CredentialData {
  if (!ENV.socialEncryptionKey) {
    throw new Error("SOCIAL_ENCRYPTION_KEY environment variable is not set");
  }

  try {
    const [ivHex, tagHex, encrypted] = encryptedData.split(":");

    if (!ivHex || !tagHex || !encrypted) {
      throw new Error("Invalid encrypted data format");
    }

    // Convert hex strings to buffers
    const key = Buffer.from(ENV.socialEncryptionKey, "hex");
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(tagHex, "hex");

    // Create decipher
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    // Decrypt
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted) as CredentialData;
  } catch (error) {
    throw new Error(`Failed to decrypt credentials: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Checks if a credential has expired
 */
export function isCredentialExpired(credential: CredentialData): boolean {
  if (!credential.expiresAt) {
    return false;
  }

  const expiresAt = new Date(credential.expiresAt);
  const now = new Date();

  return now > expiresAt;
}

/**
 * Checks if credential needs refresh (within 24 hours of expiry)
 */
export function needsRefresh(credential: CredentialData): boolean {
  if (!credential.expiresAt) {
    return false;
  }

  const expiresAt = new Date(credential.expiresAt);
  const now = new Date();
  const hoursUntilExpiry = (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60);

  return hoursUntilExpiry < 24;
}

/**
 * Updates credential expiration time
 */
export function updateCredentialExpiry(
  credential: CredentialData,
  expiresInSeconds: number
): CredentialData {
  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

  return {
    ...credential,
    expiresAt: expiresAt.toISOString(),
  };
}
