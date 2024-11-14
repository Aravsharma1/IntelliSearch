// app/page.tsx

"use client";

import React, { useState } from 'react';
import styles from './HomePage.module.css';

interface Article {
  title: string;
  description: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('technology');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchArticles = () => {
    setLoading(true);

    const query = new URLSearchParams({
      category,
      from: fromDate,
      to: toDate,
    }).toString();

    fetch(`/api/news?${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        return response.json();
      })
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to IntelliSearch!</h1>
      <p className={styles.subtitle}>This is the homepage of the news digest app.</p>

      <div className={styles.formContainer}>
        <label>
          <select className={styles.dropdown} value={category} onChange={(e) => setCategory(e.target.value)}>
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

        <button className={styles.submitButton} onClick={fetchArticles}>Submit: click here to get the news you want.</button>
      </div>

      {loading ? (
        <p className={styles.loadingText}>Loading news...</p>
      ) : (
        <div className={styles.articlesContainer}>
          {articles.length > 0 ? (
            <ul>
              {articles.map((article, index) => (
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
    </div>
  );
}
