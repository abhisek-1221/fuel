import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { age, gender, accent, nativeLanguage, location } = await request.json();

    // Validate required fields
    if (!age || !gender || !accent || !nativeLanguage || !location) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (existingUser) {
      // User already exists, return success so they can proceed to test page
      return NextResponse.json({ user: existingUser, message: 'User already exists' }, { status: 200 });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        clerkUserId: userId,
        age: parseInt(age),
        gender,
        accent,
        nativeLanguage,
        location,
        totalPoints: 0,
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
