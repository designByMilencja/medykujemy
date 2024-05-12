import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import sendEmail from "@/lib/emailService";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    const isUserExist = await User.findOne({
      email
    });
    if (!isUserExist) {
      console.log("brak usera");
      return NextResponse.json(
        { error: "This email is no register" },
        { status: 500 }
      );
    }
    sendEmail({
      emailAddress: email,
      emailType: "resetPassword",
      userId: isUserExist?._id
    });
    return NextResponse.json(
      {
        message: "Success - request reset password send",
        success: true
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
