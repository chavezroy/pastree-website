import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseUrlStart: process.env.DATABASE_URL?.substring(0, 30),
    nodeEnv: process.env.NODE_ENV
  });
}
