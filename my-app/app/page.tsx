"use client";

import React, { useState } from "react";
import styles from "./HomePage.module.css";

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
  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState("");

  const fetchArticles = () => {
    setLoading(true);

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
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleSummarize = () => {
    setSummarizing(true);
    setError("");
    setSummary("");

    const contentToSummarize = articles
      .map((article) => `${article.title} - ${article.description}`)
      .join("\n");

    if (!contentToSummarize.trim()) {
      setError("No content available for summarization.");
      setSummarizing(false);
      return;
    }

    fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: contentToSummarize }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to summarize content.");
        }
        return response.json();
      })
      .then((data) => {
        setSummary(data.summary || "No summary available.");
        setSummarizing(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error summarizing content.");
        setSummarizing(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to IntelliSearch!</h1>
      <p className={styles.subtitle}>Get the latest updates from tech, entertainment, business and more.</p>

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

        <div className={styles.buttonContainer}>
          <button
            className={styles.submitButton}
            onClick={fetchArticles}
          >
            Submit
          </button>
          <button
            className={styles.summarizeButton}
            onClick={handleSummarize}
            disabled={summarizing}
          >
            {summarizing ? "Summarizing..." : "Summarize"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className={styles.loadingText}>Loading news...</p>
      ) : (
        <div className={styles.articlesContainer}>
    {articles.length > 0 ? (
      <ul>
        {articles
          .filter((article) => 
            article.title !== "[Removed]" && article.description !== "[Removed]"
          )
          .map((article, index) => (
            <li key={index} className={styles.articleItem}>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleDescription}>{article.description}</p>
            </li>
          ))}
      </ul>
    ) : (
      <p>No articles found.</p>
    )}
  </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {summary && (
        <div className={styles.summaryContainer}>
          <h2 className={styles.summaryTitle}>Summary:</h2>
          <p className={styles.summaryText}>{summary}</p>
        </div>
      )}
    </div>
  );
}
