// app/page.tsx
import React from 'react';
import Link from 'next/link';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className="container">
      <h1 className={styles.heading}>Welcome to IntelliSearch!</h1>
      <p className={styles.intro}>This is the homepage of the news digest app.</p>
      <div className={styles.buttonDropdownContainer}>
        <SubmitButton />
        <DropdownMenu />
        <TimeFrame />
      </div>
      <MainTextField />
      <SummarizeContent />
    </div>
  );
}

export function MainTextField() {
  return (
    <div className={styles.mainTextField}>
      Hello World
    </div>
  );
}

export function DropdownMenu3() {
  return (
    <div className={styles.dropdownMenu}>
      Dropdown Menu for news genre.
    </div>
  );
}

export function DropdownMenu(){
  return (
    <select name='NewsGenre' id = 'NewsGenre'>
      <option value="volvo">Technology</option>
    <option value="saab">Entertainment</option>
    <option value="mercedes">Geopolitics</option>
    <option value="audi">All</option>
    </select>
  )
}

export function TimeFrame() {
  return (
    <div className={styles.timeFrame}>
      Timeframe for the news you want.
    </div>
  );
}

export function SubmitButton() {
  return (
    <div className={styles.submitButton}>
      <button>Submit: click here to get the news you want.</button>
    </div>
  );
}

export function SummarizeContent() {
  return (
    <div className={styles.summarizeContent}>
      <button>Summarize Content: click here to get the news you want summarized using AI.</button>
    </div>
  );
}
