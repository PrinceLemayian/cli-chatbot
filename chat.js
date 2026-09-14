// chat.js
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey.trim() === "") {
  console.error("Missing GEMINI_API_KEY. Add it to your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

const rl = readline.createInterface({ input, output });

const chat = model.startChat();

console.log("CLI Chatbot — type 'exit' to quit\n");

while (true) {
  const userInput = await rl.question("You: ");

  if (userInput.trim() === "") continue;
  if (userInput.trim().toLowerCase() === "exit") break;

  let response;
  try {
    const result = await chat.sendMessage(userInput);
    response = result.response.text();
  } catch (err) {
    if (err.status === 429) {
      console.log("\nRate limited — wait a moment and try again.\n");
    } else {
      console.error("\nAPI error:", err.message, "\n");
    }
    continue;
  }

  console.log(`\nGemini: ${response}\n`);
}

rl.close();
