import { createContext, type ReactNode, useState } from 'react';
import { nanoid } from 'nanoid';
import type { Message } from '@/lib/validators/message';

export const MessagesContext = createContext<{
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  isMessageUpdating: boolean;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  isMessageUpdating: false,
  setIsMessageUpdating: () => {},
});

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      text: 'Hello, world!',
      isUserMessage: false,
    },
  ]);

  const [isMessageUpdating, setIsMessageUpdating] = useState(false);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            text: updateFn(message.text),
          };
        }
        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        isMessageUpdating,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
