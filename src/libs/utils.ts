import { verifyPasswordHashInterface } from "@/interface/data-interface";
import { Schema } from "@/types/form-types";
import { Url } from "next/dist/shared/lib/router/router";
import crypto from "crypto";

export const getActiveClass = (pathname: string, path: Url): boolean => {
  return pathname === path;
};

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validateSchema<T extends Record<string, any>>(
  schema: Schema<T>,
  body: any,
):
  | { data: T; valid: true }
  | { errors: Record<keyof T, string>; valid: false } {
  const errors: Partial<Record<keyof T, string>> = {};
  const data: Partial<T> = {};

  for (const key in schema) {
    const validator = schema[key];
    const value = body[key];

    // Missing required field
    if (value === undefined) {
      errors[key as keyof T] = "Required field is missing";
      continue;
    }

    const error = validator(value);
    if (error) {
      errors[key as keyof T] = error;
    } else {
      data[key as keyof T] = value;
    }
  }

  const valid = Object.keys(errors).length === 0;

  if (valid) {
    // Now TS knows data is fully typed
    return { data: data as T, valid: true };
  } else {
    return { errors: errors as Record<keyof T, string>, valid: false };
  }
}

export async function verifyPasswordHash(
  data: verifyPasswordHashInterface,
): Promise<boolean> {
  const hash = await generateHashPassword(data.inputPassword, data.salt);

  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(data.hashPassword, "hex"),
  );
}

export async function generateHashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export async function generateSessionToken(): Promise<string> {
  return crypto.randomBytes(32).toString("hex");
}

export async function generateIdToken(): Promise<string> {
  return crypto.randomUUID().replace(/-/g, "");
}

export async function generateCryptoHash(token: string): Promise<string> {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function genereteSixRandomCode(): Promise<string> {
  return crypto.randomInt(100000, 1000000).toString();
}

export async function generateSalt(): Promise<string> {
  return crypto.randomBytes(16).toString("hex");
}

export async function generateHash(
  prefix: string,
  token: string,
  salt: string,
): Promise<string> {
  return crypto
    .pbkdf2Sync(`${prefix} ${token}`, salt, 1000, 64, "sha256")
    .toString("hex");
}

export async function verifyHash(
  prefix: string,
  original: string,
  originalHash: string,
  salt: string,
): Promise<boolean> {
  const hash = await generateHash(prefix, original, salt);
  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(originalHash, "hex"),
  );
}
