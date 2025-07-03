import express from 'express';
import { Client, GatewayIntentBits, Events, TextChannel } from 'discord.js';
import { discordConfig } from '@/config/discord';

const router = express.Router();

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Discord bot event handlers
client.once(Events.ClientReady, () => {
  console.log('Discord bot is ready!');
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!echo')) {
    const content = message.content.slice(6).trim();
    await message.reply(content || 'Please provide a message to echo!');
  }
});

// Start Discord bot
client.login(discordConfig.token);

// Discord webhook endpoint
router.post('/webhook', async (req: express.Request, res: express.Response) => {
  try {
    const { channelId, message } = req.body;
    
    if (!channelId || !message) {
      return res.status(400).json({ error: 'Missing channelId or message' });
    }

    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      return res.status(400).json({ error: 'Invalid channel' });
    }

    await (channel as TextChannel).send(message);
    res.status(200).json({ status: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending Discord message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export const discordRouter = router; 