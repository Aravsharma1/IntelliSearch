"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams(); // Hook to access query parameters in the URL
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    const sendWelcomeEmail = async () => {
      // Get the session_id from the query parameters
      const sessionId = searchParams.get("session_id");
      if (!sessionId) return; // If no session ID, do nothing

      try {
        // Make a POST request to the API to send the welcome email
        const res = await fetch("/api/send-welcome-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }), // Pass the session ID to the API
        });

        // Check if the response is successful
        if (!res.ok) {
          console.error("Failed to send welcome email");
        }
      } catch (error) {
        console.error("Error sending welcome email:", error); // Log any errors
      }
    };

    sendWelcomeEmail(); // Trigger the function on component mount
  }, [searchParams]); // Dependency array ensures the effect runs when searchParams changes

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Subscription Successful!</h1>
      <p>Thank you for subscribing to IntelliSearch Pro.</p>
      <p>Check your inbox for a welcome email!</p>
      <button onClick={() => router.push("/")}>Go to Homepage</button> {/* Navigate to the homepage */}
    </div>
  );
}
