This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# PoC AI RP

This project is a fun little PoC to work with character based chats using AI. It uses NextJS and Vercel's AI packages for interaction with a local (not included!) [OLLAMA server](https://ollama.com/). It uses [PnPM](https://pnpm.io/) as package manager cuz it's hella fast.

## Get started

1. Ensure you have ollama installed.
2. Run `ollama pull taozhiyuai/llama-3-8b-ultra-instruct:q2_k` to pull the model.
    - Note: This model string is hard-coded for testing purposes. Should be user-config _at some point_.
3. `pnpm i && pnpm dev` to install packages and start the dev server
4. The app is now up and running. It will automatically start the model once needed.

## Available pages

### Home

The [Home page](http://127.0.0.1:3000) contains a very simple chat ui which you can use to interact with the model.

### Library

[The Library](http://127.0.0.1:3000/library) to see a list of on-the-fly, AI generated charaters. This takes a while!

It's child-page should give you a character overview. It generates a character on-the-fly and caches that result. This should later be replaced with database logic.

### Character

TBD, structure for browsing (locally saved) characters or chats. Not sure which approach I want to go for, but will probably end up looking like a chat-app, opening conversations with characters.