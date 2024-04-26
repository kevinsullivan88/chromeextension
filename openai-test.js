import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
import OpenAI from "openai";

// Access the API key from environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Ensure the API key is loaded
if (!apiKey) {
  console.error("API key is not set. Please check your environment variables.");
  process.exit(1);  // Exit if the API key is not found
}

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();