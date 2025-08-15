import { NextRequest, NextResponse } from 'next/server';
import { VapiClient } from '@vapi-ai/server-sdk';

const vapi = new VapiClient({
  token: process.env.VAPI_PRIVATE_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { assistantId, customerNumber, customerName } = body;

    // Validate required fields
    if (!assistantId) {
      return NextResponse.json(
        { error: 'Assistant ID is required' },
        { status: 400 }
      );
    }

    // Try the simple approach from documentation first
    console.log('Creating call with assistantId:', assistantId);

    // Create the call using the documentation approach
    const call = await vapi.calls.create({
      assistantId, // Pass only assistantId as per your requirement
    });

    // Handle both single call and batch response
    console.log("Call Server Log", call);
    const callId = 'id' in call ? call.id : null;
        
    return NextResponse.json({
      success: true,
      callId: callId,
      call,
    });
  } catch (error: any) {
    console.error('Error creating Vapi call:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create call',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
