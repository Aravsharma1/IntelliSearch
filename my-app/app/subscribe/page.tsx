"use client";

import React from "react";

export default function Subscribe() {
  const handleSubscribe = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@example.com" }), // Replace with actual user email
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        alert("Failed to initiate subscription!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0070f3",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Subscribe Now
    </button>
  );
}
