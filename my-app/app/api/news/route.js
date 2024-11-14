// app/api/news/route.js
import dotenv from "dotenv";
dotenv.config({ path: './.env' });

export async function GET(request) {
  const apiKey = process.env.news_apikey;
  const { searchParams } = new URL(request.url);

  // Retrieve category and date range from query parameters
  const category = searchParams.get('category') || 'technology'; // Default to 'technology'
  const from = searchParams.get('from'); // Start date for articles
  const to = searchParams.get('to'); // End date for articles

  // Construct the URL with query parameters
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&from=${from}&to=${to}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
