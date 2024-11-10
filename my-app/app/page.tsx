// app/page.tsx
import React from 'react';
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to IntelliSearch!</h1>
      <p>This is the homepage of the news digest app.</p>
      <Link href="/about-us"> About Us</Link>
      <MainTextField />
    </div>
  );
}


export function MainTextField() {
  return (
    <div>
      Hello World
    </div>
  );
}

export function DropdownMenu(){
  return (
    <div>
      Dropdown Menu for news genre.
    </div>
  )
}

export function TimeFrame(){
  return (
    <div> 
      Timeframe for the news you want. 
    </div>
  )
}

export function SubmitButton(){
  return (
    <button>Submit: click here to get the news you want.</button>
  )
}

export function SummarizeContent(){
  return (
    <button>Summarize Content: click here to get the news you want summarized using AI.</button>
  )
}
