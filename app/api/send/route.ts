// import { EmailTemplate } from '@/components/EmailVerificationMail';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     console.log("body", body)
//     const {firstName, email, otp} = body;

//     // Check for missing fields
//     if (!firstName || !email || !otp) {
//       return Response.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const { data, error } = await resend.emails.send({
//       from: "D'Nobles Fashion House <noreply@denobleslimited.com>",
//       to: email,
//       subject: 'Your OTP for DNBL Fashion House',
//       react: EmailTemplate({ firstName, otp }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

import { EmailTemplate } from '@/components/EmailVerificationMail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { firstName, email, otp } = await request.json();
  try {
    // const body = await request.json();
    // console.log("body", body)
    // const {firstName, email, otp} = body;

    // Check for missing fields
    if (!firstName || !email || !otp) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "D'Nobles Limited Fashion House <noreply@denobleslimited.com>",
      to: `${email}`,
      subject: 'Your OTP for DNBL Fashion House Store',
      react: EmailTemplate({ firstName, otp }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
