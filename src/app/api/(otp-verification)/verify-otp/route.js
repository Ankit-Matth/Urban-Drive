import twilio from 'twilio';
import {NextRequest, NextResponse} from 'next/server';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_Service_SID;
const client = twilio(accountSid, authToken);

export async function POST(request) {
    try {
        const { phoneNumber, otp } = await request.json();

        const otpAsString = otp.join('');

        const verificationCheck = await client.verify.v2
        .services(serviceSid)
        .verificationChecks.create({
          code: otpAsString,
          to: "+"+phoneNumber,
        });
    
        if (verificationCheck.status === "approved") {
            return NextResponse.json({
                isOTPMatched: true,
                verificationCheckSuccess: true
            })
        } else {
            return NextResponse.json({
                isOTPMatched: false,
                verificationCheckSuccess: true
            })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            isOTPMatched: false,
            verificationCheckSuccess: false
        })
    }
}