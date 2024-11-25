import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json(); // Get user email or details
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email, // Attach the user email
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Use the Price ID from your .env
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`, // Redirect after successful payment
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`, // Redirect on cancellation
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create Stripe Checkout session" }, { status: 500 });
  }
}
