'use client';

import { useContext } from 'react';
import { MessagesContext } from '@/contexts/messages';
import { MarkdownLite } from '@/components/markdown-lite';
import { cn } from '@/lib/utils';

export const ChatMessages = () => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div className="flex h-full w-full flex-col-reverse gap-5 overflow-y-auto border border-solid border-[#fff] bg-[#2B2F3B]">
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => {
        return (
          <div className="chat-message" key={`${message.id}-${message.id}`}>
            <div
              className={cn('flex items-end', {
                'justify-end': message.isUserMessage,
              })}
            >
              <div
                className={cn(
                  'mx-2 flex max-w-xs flex-col space-y-2 overflow-x-hidden text-sm',
                  {
                    'order-1 items-end': message.isUserMessage,
                    'order-2 items-start': !message.isUserMessage,
                  }
                )}
              >
                <p
                  className={cn('rounded-lg px-4 py-2', {
                    'bg-blue-600 text-white': message.isUserMessage,
                    'bg-gray-200 text-gray-900': !message.isUserMessage,
                  })}
                >
                  <MarkdownLite text={message.text} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
