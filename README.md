# CLI Chatbot

A multi-turn command-line chatbot powered by the Gemini 3.5 Flash Lite API. Built as part of the Talent-Index Mini Hack Cohort 3 - Week 1.

## What it does

- Chat with Gemini directly from your terminal
- Remembers the full conversation history within a session
- Handles API errors and rate limits gracefully without crashing
- Type `exit` to quit

## Prerequisites

- Node.js v18 or higher
- A Gemini API key from [aistudio.google.com](https://aistudio.google.com)

## Setup

1. Clone the repository

```bash
git clone https://github.com/your-username/cli-chatbot.git
cd cli-chatbot
```

1. Install dependencies

```bash
npm install
```

1. Create your `.env` file and add your Gemini API key

```bash
echo "GEMINI_API_KEY=your_key_here" > .env
```

## Usage

```bash
npm start
```

```
CLI Chatbot — type 'exit' to quit

You: What is the Avalanche C-Chain?
Gemini: It's the EVM-compatible chain in the Avalanche network...

You: exit
```

## Project Structure

```
cli-chatbot/
├── .env              ← your API key (never committed)
├── .gitignore
├── chat.js           ← main chatbot logic
├── package.json
└── package-lock.json
```

## Tech Stack

- [Gemini API](https://ai.google.dev) — Google's generative AI
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) — official Node.js SDK
- [dotenv](https://www.npmjs.com/package/dotenv) — loads API key from `.env`
- Node.js built-in `readline` — handles terminal input

## How it works

Every message you send is added to a `history` array. The full history is sent to the Gemini API on every turn, which is what gives the chatbot memory of the conversation. When the session ends, the history is cleared.

## License

MIT
