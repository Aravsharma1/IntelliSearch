"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const searchParams = useSearchParams(); // Hook to access query params
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        setIsValid(false);
        setLoading(false);
        router.push("/"); // Redirect if no session ID is present
        return;
      }

      try {
        const res = await fetch(`/api/validate-session?session_id=${sessionId}`);
        const data = await res.json();

        if (data.isValid) {
          setIsValid(true);
          // Trigger email sending or other actions here if needed
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email, // Email from the session
              message: "Thank you for subscribing to IntelliSearch Pro!",
            }),
          });
        } else {
          router.push("/"); // Redirect invalid sessions
        }
      } catch (error) {
        console.error("Error validating session:", error);
        router.push("/"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [router, searchParams]);

  if (loading) {
    return <p>Loading...</p>; // Optionally show a spinner or loading message
  }

  if (!isValid) {
    return null; // Do not render anything if session is invalid
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Subscription Successful!</h1>
      <p>Thank you for subscribing to IntelliSearch Pro.</p>
      <p>Check your inbox for a welcome email!</p>
      <button onClick={() => router.push("/")}>Go to Homepage</button>
    </div>
  );
}
