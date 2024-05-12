import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const emailType = searchParams?.get("type");
    const token = searchParams?.get("token");
    let user;
    if (emailType === "emailValidation") {
      user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: {
          $gt: Date.now()
        }
      });
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 500 }
        );
      }
      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();
      const url = `${process.env.NEXTAUTH_URL}/verify-email`
      return NextResponse.redirect(url);

    } else if (emailType === "resetPassword") {
      user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpiry: {
          $gt: Date.now()
        }
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 500 }
        );
      }
      await user.save();
      const resetPasswordUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}&verified=true`
      return NextResponse.redirect(resetPasswordUrl);
    }
    return NextResponse.json(
      { message: "Email został zweryfikowany, przejdź do strony logowania" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error", error },
      { status: 500 }
    );
  }
}
