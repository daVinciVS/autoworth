import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const fakeDB: { username: string; password: string }[] = [];

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  fakeDB.push({ username, password: hashedPassword });

  return NextResponse.json({ message: 'User registered' });
}
