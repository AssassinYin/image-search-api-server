# TypeScript LINE/Discord API Server

This is a TypeScript-based API server that integrates with both LINE and Discord platforms. It provides webhook endpoints for both services and includes basic bot functionality.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- LINE Bot account and credentials
- Discord Bot account and credentials

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # LINE Bot Configuration
   LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
   LINE_CHANNEL_SECRET=your_line_channel_secret

   # Discord Bot Configuration
   DISCORD_BOT_TOKEN=your_discord_bot_token
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_GUILD_ID=your_discord_guild_id
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

For development with hot-reload:
```bash
npm run dev
```

## API Endpoints

### LINE Bot
- `POST /api/line/webhook` - LINE webhook endpoint for receiving messages

### Discord Bot
- `POST /api/discord/webhook` - Send messages to Discord channels
  - Body: `{ "channelId": "channel_id", "message": "your message" }`

## Features

- LINE Bot integration with message echo functionality
- Discord Bot integration with basic command handling
- Express server with TypeScript
- Environment configuration
- Error handling middleware
- CORS and security headers

## Development

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the project
- `npm run lint` - Run ESLint
- `npm start` - Start production server
