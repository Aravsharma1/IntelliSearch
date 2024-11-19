import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/firebaseConfig"

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Protect homepage
};
