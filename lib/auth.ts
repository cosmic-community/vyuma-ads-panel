import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/lib/cosmic';
import type { AuthUser, User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-minimum-32-characters';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<{ user: AuthUser; token: string } | null> {
  const user = await getUserByEmail(email);
  
  if (!user || !user.metadata.password) {
    return null;
  }
  
  const isValid = await verifyPassword(password, user.metadata.password);
  
  if (!isValid) {
    return null;
  }
  
  const authUser: AuthUser = {
    id: user.id,
    email: user.metadata.email,
    role: user.metadata.role,
    name: user.title
  };
  
  const token = generateToken(authUser);
  
  return { user: authUser, token };
}

// Developer login with hardcoded credentials
export function authenticateDeveloper(username: string, password: string): { user: AuthUser; token: string } | null {
  if (username === 'HARSHA9949' && password === 'HARSHA9949') {
    const developerUser: AuthUser = {
      id: 'developer-admin',
      email: 'developer@vyuma.com',
      role: 'developer',
      name: 'Developer Admin'
    };
    
    const token = generateToken(developerUser);
    
    return { user: developerUser, token };
  }
  
  return null;
}

export function getTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
  
  return cookies['auth-token'] || null;
}