import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import DNBLVerifyEmail from '@/components/EmailVerificationMail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { firstName, email, otp } = await request.json();
    console.log("Received data:", { firstName, email, otp });

    if (!firstName || !email || !otp) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "D'Nobles Limited Fashion House <noreply@denobleslimited.com>",
      to: email,
      subject: 'Your OTP for DNBL Fashion House Store',
      react: DNBLVerifyEmail({ firstName, otp }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
