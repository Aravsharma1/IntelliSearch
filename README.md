# IntelliSearch: AI-Powered News Digest Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Introduction

IntelliSearch is an AI-powered news aggregation and summarization tool designed to provide users with concise and targeted news content. The application leverages the News API to fetch articles and integrates OpenAI's GPT model to summarize selected news content. Users can filter articles by category and date range, view relevant news, and generate quick summaries for better insights.

---

## Features

1. **News Filtering**:
   - Users can filter news by categories such as Technology, Entertainment, Sports, etc.
   - Specify a date range for the news articles they want.

2. **Summarization**:
   - Powered by OpenAI, the summarization feature allows users to quickly understand lengthy articles in just a few sentences.

3. **Interactive UI**:
   - User-friendly design with dropdowns and date selectors for seamless navigation.

4. **Real-Time Data Fetching**:
   - Articles are fetched dynamically from the News API based on user preferences.

5. **Responsive Design**:
   - Optimized for desktop and mobile devices.

---

## Tech Stack

- **Frontend**: React, Next.js, TailwindCSS
- **Backend**: Node.js, OpenAI API, News API
- **Styling**: Custom CSS (using a `HomePage.module.css` file)
- **Environment Management**: dotenv

---

## Project Structure
my-app/
├── app/
│   ├── api/
│   │   ├── news/
│   │   │   ├── route.js (News API endpoint handler)
│   │   ├── summarize/
│   │   │   ├── route.js (Summarization feature endpoint)
│   ├── HomePage.module.css (CSS for the homepage)
│   ├── page.tsx (Main frontend logic)
├── .env (API keys for News API and OpenAI)
├── .gitignore (Excludes sensitive and unnecessary files)
├── package.json (Dependencies and scripts)
├── README.md (Project documentation)
└── public/ (Static assets)


---

## Setup and Installation

Follow the steps below to get IntelliSearch running locally:

1. Clone the Repository:
git clone https://github.com/your-username/IntelliSearch.git
cd IntelliSearch/my-app

2. Install Dependencies:
npm install

3. Setup Environment Variables: Create a .env file in the root directory and add your API keys:
NEWS_API_KEY=your_news_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

4. Run the Development Server:
npm run dev

- The app will be available at http://localhost:3000

## Usage ##

1. Select News Category: Use the dropdown menu to choose the type of news you want (e.g., Technology, Sports).
Set Date Range:

2. Select the "From" and "To" dates to filter news articles within a specific timeframe.

3. View Articles: Click on the "Submit" button to fetch and display the articles.

4. Summarize Articles: Click the "Summarize" button next to an article to view a concise AI-generated summary.

## Future functionality: in-progress! ## 

1. User Accounts: allow users to save their preferences and bookmarked articles.
2. Automated email notifications: getting daily/weekly emails/messages of news.
3. Deployment

## Screenshots ##
<img width="870" alt="Screenshot 2024-11-16 at 5 19 22 AM" src="https://github.com/user-attachments/assets/8fd23c09-6c9a-4edd-915b-0b2f06e7a686">
<img width="870" alt="Screenshot 2024-11-16 at 5 19 22 AM" src="https://github.com/user-attachments/assets/284e5ee6-24de-4964-96cc-a80081703f44">
<img width="870" alt="Screenshot 2024-11-16 at 5 19 22 AM" src="https://github.com/user-attachments/assets/ed095674-2220-4ab0-8312-ab38645d6912">
<img width="870" alt="Screenshot 2024-11-16 at 5 19 22 AM" src="https://github.com/user-attachments/assets/6c883a9e-0655-4e81-82a8-880d63bc2679">




