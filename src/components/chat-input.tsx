'use client';

import { useState, useContext, useRef } from 'react';
import { ApiKeyContext } from '@/contexts/api-key';
import { MessagesContext } from '@/contexts/messages';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { Message } from '@/lib/validators/message';
import { Loader2, CornerDownLeft } from 'lucide-react';
// import { toast } from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';

export const ChatInput = () => {
  const [input, setInput] = useState('');

  const { apiKey } = useContext(ApiKeyContext);

  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate: sendMessage, isPending } = useMutation({
    // mutationKey: ['sendMessage'],
    // Include message to later use it in onMutate
    mutationFn: async (_message: Message) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages, apiKey }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return response.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error('No stream');

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: '',
      };

      addMessage(responseMessage);
      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prevMessage) => prevMessage + chunkValue);
      }

      setIsMessageUpdating(false);
      setInput('');
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
    onError: (_, message) => {
      // toast.error('Something went wrong. Please try again.'); todo: fix toast not showing
      removeMessage(message.id);
      textareaRef.current?.focus();
    },
  });

  return (
    <div className="relative mt-4">
      <TextareaAutosize
        ref={textareaRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message: Message = {
              id: nanoid(),
              isUserMessage: true,
              text: input,
            };
            sendMessage(message);
          }
        }}
        rows={1}
        maxRows={4}
        value={input}
        autoFocus
        disabled={isPending}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a message..."
        className="block w-full resize-none rounded-lg border border-[#9b9b9b] bg-transparent py-3 pl-4 pr-14 text-sm text-white focus:outline-none disabled:opacity-50"
      />
      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <kbd className="inline-flex items-center rounded border border-gray-200 bg-white px-1 font-sans text-xs text-gray-400">
          {isPending ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <CornerDownLeft className="h-3 w-3" />
          )}
        </kbd>
      </div>
    </div>
  );
};
