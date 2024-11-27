"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/firebaseConfig";
import styles from "../AuthPage.module.css"; // Shared CSS with Sign In

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to homepage after successful signup
    } catch (err: unknown) {
      if (err instanceof Error) {
        // If the error is an instance of Error, get the message
        setError(err.message);
      } else {
        // Fallback error message
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Sign Up</h1>
      <form className={styles.authForm} onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.authInput}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.authInput}
          required
        />
        {error && <p className={styles.authError}>{error}</p>}
        <button type="submit" className={styles.authButton}>
          Sign Up
        </button>
      </form>
      <p className={styles.redirectText}>
        Already have an account?{" "}
        <a href="/auth/signin" className={styles.redirectLink}>
          Sign in here
        </a>
      </p>
    </div>
  );
}
