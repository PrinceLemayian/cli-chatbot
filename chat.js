// chat.js
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

const rl = readline.createInterface({ input, output });

const chat = model.startChat();

console.log("CLI Chatbot — type 'exit' to quit\n");

while (true) {
  const userInput = await rl.question("You: ");

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
