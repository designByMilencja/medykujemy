import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt";
import { UserRegister } from "@/types";
import sendEmail from "@/lib/emailService";

export async function POST(req: NextRequest) {
  try {
    const userData: UserRegister = await req.json();
    // spr czy wszystkie dane istnieja
    if (!userData?.email || !userData?.password || !userData?.name || !userData?.surname) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    // spr czy nie ma duplikacji
    const duplicate = await User.findOne({
      email: userData.email
    }).lean().exec();
    if (duplicate) {
      return NextResponse.json(
        { message: "This email is in database already" },
        { status: 409 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
      isVerified:false
    });
    sendEmail({
      emailAddress: userData.email,
      emailType: "emailValidation",
      userId: newUser?._id
    });
    return NextResponse.json(
      { message: "Success - user created" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", error },
      { status: 500 }
    );
  }
}
