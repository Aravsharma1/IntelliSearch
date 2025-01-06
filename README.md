IntelliSearch: AI-Powered News Digest Application
Table of Contents
Introduction
Features
Tech Stack
Project Structure
Setup and Installation
Usage
Screenshots
Future Enhancements
License
Introduction
IntelliSearch is an AI-powered news aggregation and summarization tool designed to provide users with concise and targeted news content. The application leverages the News API to fetch articles and integrates OpenAI's GPT model to summarize selected news content. Users can filter articles by category and date range, view relevant news, and generate quick summaries for better insights.

Features
News Filtering:

Users can filter news by categories such as Technology, Entertainment, Sports, etc.
Specify a date range for the news articles they want.
Summarization:

Powered by OpenAI, the summarization feature allows users to quickly understand lengthy articles in just a few sentences.
Interactive UI:

User-friendly design with dropdowns and date selectors for seamless navigation.
Real-Time Data Fetching:

Articles are fetched dynamically from the News API based on user preferences.
Responsive Design:

Optimized for desktop and mobile devices.
Tech Stack
Frontend: React, Next.js, TailwindCSS
Backend: Node.js, OpenAI API, News API
Styling: Custom CSS (using a HomePage.module.css file)
Environment Management: dotenv
Project Structure
my-app/ ├── app/ │ ├── api/ │ │ ├── news/ │ │ │ ├── route.js (News API endpoint handler) │ │ ├── summarize/ │ │ │ ├── route.js (Summarization feature endpoint) │ ├── HomePage.module.css (CSS for the homepage) │ ├── page.tsx (Main frontend logic) ├── .env (API keys for News API and OpenAI) ├── .gitignore (Excludes sensitive and unnecessary files) ├── package.json (Dependencies and scripts) ├── README.md (Project documentation) └── public/ (Static assets)

Setup and Installation
Follow the steps below to get IntelliSearch running locally:

Clone the Repository: git clone https://github.com/your-username/IntelliSearch.git cd IntelliSearch/my-app

Install Dependencies: npm install

Setup Environment Variables: Create a .env file in the root directory and add your API keys: NEWS_API_KEY=your_news_api_key_here OPENAI_API_KEY=your_openai_api_key_here

Run the Development Server: npm run dev

The app will be available at http://localhost:3000
Usage
Select News Category: Use the dropdown menu to choose the type of news you want (e.g., Technology, Sports). Set Date Range:

Select the "From" and "To" dates to filter news articles within a specific timeframe.

View Articles: Click on the "Submit" button to fetch and display the articles.

Summarize Articles: Click the "Summarize" button next to an article to view a concise AI-generated summary.

Future functionality: in-progress!
User Accounts: allow users to save their preferences and bookmarked articles.
Automated email notifications: getting daily/weekly emails/messages of news.
Deployment
Screenshots
Screenshot 2024-11-16 at 5 19 22 AM Screenshot 2024-11-16 at 5 19 22 AM Screenshot 2024-11-16 at 5 19 22 AM Screenshot 2024-11-16 at 5 19 22 AM
