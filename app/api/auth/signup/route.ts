import { NextRequest, NextResponse } from 'next/server';
import { cosmic } from '@/lib/cosmic';
import { hashPassword, generateToken } from '@/lib/auth';
import type { AuthUser } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, companyName, phone } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await cosmic.objects
      .find({ type: 'users', 'metadata.email': email })
      .props(['id'])
      .depth(1)
      .limit(1);

    if (existingUser.objects.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await cosmic.objects.insertOne({
      title: name,
      type: 'users',
      metadata: {
        email,
        password: hashedPassword,
        role: 'advertiser',
        status: 'active',
        company_name: companyName || '',
        phone: phone || '',
        verified: false,
        spending_limit: 1000,
        created_at: new Date().toISOString(),
      }
    });

    const authUser: AuthUser = {
      id: newUser.object.id,
      email,
      role: 'advertiser',
      name
    };

    const token = generateToken(authUser);

    const response = NextResponse.json({
      user: authUser,
      token
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}