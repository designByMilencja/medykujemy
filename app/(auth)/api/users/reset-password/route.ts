import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { User } from "@/models/user.model"

export async function POST(req: NextRequest) {
  try {
    const { password, token } = await req.json()
    console.log(password, token)

    if (!password || !token) {
      return NextResponse.json({ message: "Something is missing" }, { status: 400 })
    }
    const isUserExist = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: {
        $gt: Date.now(),
      },
    })

    if (!isUserExist) {
      return NextResponse.json({ error: "Bad request" }, { status: 500 })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    isUserExist.password = hashedPassword
    isUserExist.resetPasswordToken = undefined
    isUserExist.resetPasswordTokenExpiry = undefined
    await isUserExist.save()

    return NextResponse.json({ message: "Success - password reset", status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
