import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const fakeDB: { username: string; password: string }[] = [];

const JWT_SECRET = 'yourSuperSecretKey'; // In real apps, use env vars

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = fakeDB.find((u) => u.username === username);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  return NextResponse.json({ token });
}
