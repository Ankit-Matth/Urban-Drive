import twilio from 'twilio';
import {NextRequest, NextResponse} from 'next/server';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_Service_SID;
const client = twilio(accountSid, authToken);

export async function POST(request) {
    try {
        const { phoneNumber } = await request.json();
       
        const verification = await client.verify.v2
        .services(serviceSid)
        .verifications.create({
          channel: "sms",
          to: "+"+phoneNumber,
        });
    
        if (verification.status === "pending") {
            return NextResponse.json({
                isOTPSent: true
            })
        } else {
            throw new Error("Something went wrong");
        }
    } catch (err) {
        return NextResponse.json({
            isOTPSent: false
        })
    }
}