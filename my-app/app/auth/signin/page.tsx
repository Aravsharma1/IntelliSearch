"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/firebaseConfig";
import styles from "../AuthPage.module.css"; // Add a new CSS file for auth pages

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to homepage
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Check if err is an instance of the Error class
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Sign In</h1>
      <form className={styles.authForm} onSubmit={handleSignin}>
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
          Sign In
        </button>
      </form>
      <p className={styles.redirectText}>
        Need to create a new account?{" "}
        <a href="/auth/signup" className={styles.redirectLink}>
          Sign up here
        </a>
      </p>
    </div>
  );
}
