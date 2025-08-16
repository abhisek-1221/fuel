import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        totalPoints: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ totalPoints: user.totalPoints });
  } catch (error) {
    console.error('Error fetching user points:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { points } = await request.json();

    if (typeof points !== 'number') {
      return NextResponse.json({ error: 'Points must be a number' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        clerkUserId: userId,
      },
      data: {
        totalPoints: {
          increment: points,
        },
      },
    });

    return NextResponse.json({ totalPoints: user.totalPoints });
  } catch (error) {
    console.error('Error updating user points:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
