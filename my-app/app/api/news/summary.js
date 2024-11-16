import { config } from "dotenv";
import { resolve } from "path";

// Use absolute path to load the .env file
config({ path: resolve(process.cwd(), ".env") });

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY); // Debugging
console.log("NEWS_API_KEY:", process.env.NEWS_API_KEY);     // Debugging