// app/layout.tsx
import React from 'react';
import './globals.css'; // Importing global styles for the entire app


export default function RootLayout({ children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}


