import {
  createParser,
  type ParsedEvent,
  type ReconnectInterval,
} from 'eventsource-parser';

export type ChatGPTAgent = 'user' | 'system';

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  stream: boolean;
}

export const OpenAIStream = async (
  apiKey: string,
  payload: OpenAIStreamPayload
) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let counter = 0;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            console.log('json:', json);

            const text = json.choices[0].delta?.content || '';
            console.log('text:', text);

            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }

            const queue = encoder.encode(text);
            controller.enqueue(queue);

            counter++;
          } catch (err) {
            controller.error(err);
          }
        }
      };

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
