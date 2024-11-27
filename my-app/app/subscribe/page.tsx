"use client";

import React from "react";
import styles from "./SubscribePage.module.css"; // Import CSS file for styling

export default function Subscribe() {
  // uncomment the following for future releases (stripe integration)
  // const handleSubscribe = async () => {
  //   try {
  //     const res = await fetch("/api/checkout", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: "user@example.com" }), // Replace with actual user email
  //     });
  //     const data = await res.json();
  //     if (data.url) {
  //       window.location.href = data.url; // Redirect to Stripe Checkout
  //     } else {
  //       alert("Failed to initiate subscription!");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Subscribe to <span className={styles.brand}>IntelliSearch Pro</span>
        </h1>
        <p className={styles.description}>
          Unlock exclusive features with IntelliSearch Pro, coming soon!
        </p>
        <div className={styles.benefitsContainer}>
          <div className={styles.benefit}>
            <img
              src="/icons/news-icon.png"
              alt="News updates"
              className={styles.icon}
            />
            <p>Personalized daily/weekly news updates</p>
          </div>
          <div className={styles.benefit}>
            <img
              src="/icons/summary-icon.png"
              alt="Curated summaries"
              className={styles.icon}
            />
            <p>Curated summaries tailored to your interests</p>
          </div>
          <div className={styles.benefit}>
            <img
              src="/icons/email-icon.png"
              alt="Email notifications"
              className={styles.icon}
            />
            <p>Seamless email notifications</p>
          </div>
        </div>
        <p className={styles.price}>
          <span>Only</span> <strong>$2.99/month</strong>
        </p>
{/*         
         <button onClick={handleSubscribe} className={styles.subscribeButton}>
          Subscribe Now
        </button> */}
      </div>
    </div>
  );
}
