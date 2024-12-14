import { NextResponse } from "next/server";
import Stripe from "stripe";
import AWS from "aws-sdk";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia", // Use the latest Stripe API version
});

// Configure AWS SDK for SES
AWS.config.update({
  region: "us-east-1", // AWS SES region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS access key ID from environment variables
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS secret access key from environment variables
});

const ses = new AWS.SES(); // Create an SES client instance

// POST API route to handle sending welcome emails
export async function POST(req: Request) {
  try {
    // Extract the session_id from the request body
    const { session_id } = await req.json();

    // Retrieve the checkout session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Check if the session is valid and contains the customer email
    if (!session || !session.customer_email) {
      return NextResponse.json(
        { error: "Invalid session or email not found" },
        { status: 400 } // Return 400 for a bad request
      );
    }

    const email = session.customer_email; // Extract the email from the session

    // Define email parameters for AWS SES
    const params = {
      Source: "your-email@example.com", // Verified sender email in SES
      Destination: {
        ToAddresses: [email], // Send email to the customer's email address
      },
      Message: {
        Subject: {
          Data: "Welcome to IntelliSearch Pro!", // Email subject line
        },
        Body: {
          Html: {
            Data: `
              <h1>Welcome to IntelliSearch Pro!</h1>
              <p>Hi ${email},</p>
              <p>Thank you for subscribing to IntelliSearch Pro. We’re thrilled to have you onboard!</p>
              <p>You can now enjoy personalized news updates, summaries, and seamless notifications.</p>
              <p>Let us know if you have any questions!</p>
              <p>Best regards,<br>The IntelliSearch Team</p>
            `, // Email body (HTML format)
          },
        },
      },
    };

    // Send the email using AWS SES
    await ses.sendEmail(params).promise();

    // Respond with a success message
    return NextResponse.json({ message: "Welcome email sent successfully!" });
  } catch (error) {
    console.error("Error sending welcome email:", error);

    // Respond with an error message if email sending fails
    return NextResponse.json(
      { error: "Failed to send welcome email" },
      { status: 500 } // Return 500 for internal server error
    );
  }
}
