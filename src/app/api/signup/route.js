import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/utils/dbConfig';
import UserModel from '@/models/Users';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { phoneNumber, country, email, fullName, username, password, profilePic, userRole } = await request.json();

        connectDB();

        // Destructure only the required fields from country
        const { name: countryName, countryCode } = country;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new UserModel({
            phoneNumber,
            country: {
                name: countryName,
                countryCode
            },
            email,
            fullName,
            username,
            password: hashedPassword,
            role: userRole,
            profilePic
        });

        // Save the user to the database
        await newUser.save();

        return NextResponse.json({
            message: "User registered successfully."
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            message: "Error while registering new user."
        });
    }
}
