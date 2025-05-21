import { NextResponse } from 'next/server';
import { generateVerificationCode, sendVerificationEmail } from '@/lib/email';

export async function GET(request: Request) {
  // Check for query parameters
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  // Check if environment is development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ 
      success: false, 
      message: 'This endpoint is only available in development mode' 
    }, { status: 403 });
  }
  
  // Validate email
  if (!email) {
    return NextResponse.json({ 
      success: false, 
      message: 'Please provide an email parameter' 
    }, { status: 400 });
  }
  
  try {
    // Generate test code and send test email
    const testCode = generateVerificationCode();
    console.log(`Sending test email with code: ${testCode} to ${email}`);
    
    const success = await sendVerificationEmail(email, testCode);
    
    return NextResponse.json({
      success,
      code: testCode, // Include the code in the response for testing
      message: success 
        ? `Test email sent to ${email} with code ${testCode}` 
        : `Failed to send test email to ${email}`,
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to send test email',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 