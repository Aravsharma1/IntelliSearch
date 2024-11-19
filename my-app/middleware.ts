import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/firebaseConfig"

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function middleware(req: NextRequest) {
  
  const token = req.cookies.get("authToken");
  console.log("Auth token:", token); // Debugging

  if (!token) {
    console.log("Redirecting to /auth/signin...");
    return NextResponse.next();
    // temporary workaround: return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/"], // Protect homepage
};
