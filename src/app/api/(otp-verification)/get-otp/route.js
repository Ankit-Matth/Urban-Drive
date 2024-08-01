import twilio from 'twilio';
import {NextRequest, NextResponse} from 'next/server';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_Service_SID;
const client = twilio(accountSid, authToken);
import connectDB from '@/utils/dbConfig';
import UserModel from '@/models/Users';

export async function POST(request) {
    try {
        const { phoneNumber, email } = await request.json();

        connectDB()

        let existingUser;
        if (phoneNumber) {
            existingUser = await UserModel.findOne({ phoneNumber });

            if (existingUser) {
              return NextResponse.json({
                  isOTPSent: false,
                  message: "The phone number you entered already exists."
              });
            }
        } else {
            existingUser = await UserModel.findOne({ email });

            if (existingUser) {
              return NextResponse.json({
                  isOTPSent: false,
                  message: "The email you entered already exists."
              });
            }
        }

        return NextResponse.json({
          isOTPSent: true
        });

        // if (phoneNumber) {
        //   const verification = await client.verify.v2
        //   .services(serviceSid)
        //   .verifications.create({
        //     channel: "sms",
        //     to: "+"+phoneNumber,
        //   });
      
        //   if (verification.status === "pending") {
        //       return NextResponse.json({
        //           isOTPSent: true
        //       })
        //   } else {
        //       throw new Error("Something went wrong");
        //   }
        // } else {
        //   const verification = await client.verify.v2
        //   .services(serviceSid)
        //   .verifications.create({
        //     channel: "email",
        //     to: email,
        //   });

        //   if (verification.status === "pending") {
        //     return NextResponse.json({
        //         isOTPSent: true
        //     })
        //   } else {
        //     throw new Error("Something went wrong");
        //   }
        // } 
    } catch (err) {
        console.log(err)
        return NextResponse.json({
          isOTPSent: false,
          message: err.message.toString(),
          error: err
        })
    }
}