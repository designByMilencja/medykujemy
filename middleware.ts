import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.search = `callbackUrl=${req.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/jobs", "/procedures", "/account"] };
