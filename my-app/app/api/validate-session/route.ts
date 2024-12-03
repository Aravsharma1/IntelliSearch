import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ isValid: false }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return NextResponse.json({
        isValid: true,
        email: session.customer_email, // Return the email for the welcome email
      });
    } else {
      return NextResponse.json({ isValid: false });
    }
  } catch (error) {
    console.error("Error validating session:", error);
    return NextResponse.json({ isValid: false }, { status: 500 });
  }
}
