// src/auth/auth.service.ts
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

const JWT_SECRET = () => {
  return process.env.JWT_SECRET;
};

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  storepassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, storepassword);
}

export async function decodeToken(token: string): Promise<any | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET());
    return decoded;
  } catch (err) {
    console.error('Error decoding token:', err.message);
    return null;
  }
}

export async function createAccessToken(user: any): Promise<string | null> {
  try {
    const payload = user;
    return jwt.sign(payload, JWT_SECRET(), { expiresIn: '3d' });
  } catch (err) {
    console.error('Error signing token:', err.message);
    return null;
  }
}

export async function createRefreshToken(user: any): Promise<string | null> {
  try {
    const payload = user;
    return jwt.sign(payload, JWT_SECRET(), { expiresIn: '7d' });
  } catch (err) {
    console.error('Error signing token:', err.message);
    return null;
  }
}

export async function createToken(
  payload: string | object | Buffer,
  key: string,
  expiresIn: string,
) {
  try {
    return jwt.sign(payload, key, { expiresIn });
  } catch (err) {
    console.error('Error signing token:', err.message);
    return null;
  }
}

export async function verifyToken(
  token: string,
  key: string,
): Promise<any | null> {
  try {
    return jwt.verify(token, key);
  } catch (err) {
    console.error('Error verifying token:', err.message);
    return null;
  }
}

export async function decodeTokenWithoutSecret(token: string) {
  return jwt.decode(token);
}

export async function generateHexCode(count: number): Promise<string> {
  const byteCount = Math.ceil(count / 2);
  const randomString = randomBytes(byteCount).toString('hex').toUpperCase();
  return randomString.slice(0, count);
}

export async function generateCode(count: number): Promise<string> {
  let code = '';
  while (code.length < count) {
    code += Math.floor(Math.random() * 10);
  }
  return code.slice(0, count);
}
