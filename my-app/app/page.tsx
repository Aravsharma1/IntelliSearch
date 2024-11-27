"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./HomePage.module.css";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import firebaseConfig from "@/app/firebaseConfig"; // Ensure your Firebase config is correct
import Link from "next/link";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface Article {
  title: string;
  description: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("technology");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [summary, setSummary] = useState("");
  const [articlesFetched, setArticlesFetched] = useState(false);
  const [user, setUser] = useState<any>(null); // Track logged-in user
  const summaryRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is authenticated
      } else {
        router.push("/auth/signin"); // Redirect unauthenticated users
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/auth/signin");
  };

  const fetchArticles = () => {
    setLoading(true);
    setArticlesFetched(false);

    const query = new URLSearchParams({
      category,
      from: fromDate,
      to: toDate,
    }).toString();

    fetch(`/api/news?${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
        setArticlesFetched(true);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleSummarize = async () => {
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: articles.map((a) => a.title).join(". ") }),
      });

      const data = await response.json();
      setSummary(data.summary);

      if (summaryRef.current) {
        summaryRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error summarizing content:", error);
    }
  };

  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <Link href="/subscribe"> <button>Get Access to IntelliSearch Pro</button> </Link>
          <button className={styles.logoutButton}>Welcome, {user?.email}!</button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to IntelliSearch!</h1>
        <p className={styles.subtitle}>This is the homepage of the news digest app.</p>
       


        <div className={styles.formContainer}>
          <label>
            <select
              className={styles.dropdown}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="technology">Technology</option>
              <option value="entertainment">Entertainment</option>
              <option value="business">Business</option>
              <option value="sports">Sports</option>
              <option value="science">Science</option>
              <option value="health">Health</option>
            </select>
          </label>

          <label>
            From:
            <input
              className={styles.dateInput}
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>

          <label>
            To:
            <input
              className={styles.dateInput}
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>

          <button className={styles.submitButton} onClick={fetchArticles}>
            Submit
          </button>

          {articlesFetched && (
            <button
              className={styles.summarizeButton}
              onClick={handleSummarize}
              disabled={!articles.length}
            >
              Summarize Content
            </button>
          )}
        </div>

        {/* Summary Section */}
        {summary && (
          <div ref={summaryRef} className={styles.summaryContainer}>
            <h2 className={styles.summaryTitle}>Summary</h2>
            <p className={styles.summaryText}>{summary}</p>
          </div>
        )}

        {/* Articles Section */}
        {loading ? (
          <p className={styles.loadingText}>Loading news...</p>
        ) : (
          <div className={styles.articlesContainer}>
            {articles.length > 0 ? (
              <ul>
                {articles
                  .filter(
                    (article) =>
                      article.title !== "[Removed]" &&
                      article.description !== "[Removed]"
                  )
                  .map((article, index) => (
                    <li key={index} className={styles.articleItem}>
                      <h3 className={styles.articleTitle}>{article.title}</h3>
                      <p className={styles.articleDescription}>
                        {article.description}
                      </p>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No articles found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
