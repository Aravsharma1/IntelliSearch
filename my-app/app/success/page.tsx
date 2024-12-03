"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function SuccessContent() {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
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
          // Trigger email sending
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
    return <p>Loading...</p>; // Show a loading message or spinner
  }

  if (!isValid) {
    return null; // Do not render anything for invalid sessions
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
