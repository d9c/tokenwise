'use client';

import { useContext } from 'react';
import { MessagesContext } from '@/contexts/messages';
import { MarkdownLite } from '@/components/markdown-lite';
import { Bot, User } from 'lucide-react';

export const ChatMessages = () => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div className="w-full overflow-y-auto">
      <div className="mx-auto w-[48rem]">
        <div className="flex flex-col-reverse gap-9">
          <div className="flex-1 flex-grow" />
          {inverseMessages.map((message, index) => (
            <div className="chat-message flex gap-2" key={index}>
              <div className="w-[24px]">
                {message.isUserMessage ? <User size={24} /> : <Bot size={24} />}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                  {message.isUserMessage ? 'User' : 'ChatGPT'}
                </span>
                <span className="text-sm">
                  <MarkdownLite text={message.text} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
