const dotenv = require("dotenv");
dotenv.config({path: './.env'});
const apiKey = process.env.news_apikey;
const url = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${apiKey}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    console.log('Fetched Articles:', data.articles); // Access articles from the API response
  })
  .catch(error => {
    console.error('There was an error fetching the news:', error);
  });
