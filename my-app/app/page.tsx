// app/page.tsx
import React from 'react';
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to IntelliSearch!</h1>
      <p>This is the homepage of the news digest app.</p>
      <Link href="/about-us"> About Us
      </Link>
    </div>
  );
}
