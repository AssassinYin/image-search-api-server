import express from 'express';
import { WebhookRequestBody, MessageEvent, TextEventMessage } from '@line/bot-sdk';
import { lineConfig } from '@/config/line';

const router = express.Router();

// LINE webhook endpoint
router.post('/webhook', async (req: express.Request, res: express.Response) => {
  try {
    const events: WebhookRequestBody = req.body;
    
    // Process each event
    await Promise.all(events.events.map(async (event) => {
      if (event.type === 'message' && event.message.type === 'text') {
        const message = event.message;
        // Echo the message back
        await lineConfig.client.replyMessage(
          event.replyToken,
          [{
            type: 'text',
            text: `Echo: ${message.text}`
          }]
        );
      }
    }));

    res.status(200).end();
  } catch (error) {
    console.error('Error processing LINE webhook:', error);
    res.status(500).end();
  }
});

export const lineRouter = router; 