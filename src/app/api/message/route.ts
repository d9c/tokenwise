import { MessageArraySchema } from '@/lib/validators/message';
import { chatbotPrompt } from '@/helpers/chatbot-prompt';
import {
  OpenAIStream,
  type ChatGPTMessage,
  type OpenAIStreamPayload,
} from '@/lib/openai-stream';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, apiKey } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);
  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? 'user' : 'system',
    content: message.text,
  }));

  outboundMessages.unshift({
    role: 'system',
    content: chatbotPrompt,
  });

  const payload: OpenAIStreamPayload = {
    model: 'gpt-4o',
    stream: true,
    messages: outboundMessages,
  };

  const stream = await OpenAIStream(apiKey, payload);

  return new Response(stream);
}
