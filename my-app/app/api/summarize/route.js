import OpenAI from "openai"; // Import OpenAI client
import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config({ path: '../../../.env' }); // Loading the environment variables


// Create an OpenAI client instance with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is correctly set in .env
});
// Making a POST request
export async function POST(request) {
  try {
    // Parse the incoming request body to get the content to summarize
    const { content } = await request.json();

    // Validate that the content is provided
    if (!content || content.trim() === "") {
      return new Response(
        JSON.stringify({ error: "No content provided for summarization." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use OpenAI API to generate a summary
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Specify the OpenAI model
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Summarize this content: ${content}` },
      ],
    });

    // Extract the summary from the OpenAI response
    const summary = completion.choices[0].message.content;

    // Return the summary in the response
    return new Response(
      JSON.stringify({ summary }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error summarizing content:", error);

    // Return an error response if the API call fails
    return new Response(
      JSON.stringify({ error: "Failed to summarize content." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
