import { ChatMessages } from '@/components/chat-messages';
import { ChatInput } from '@/components/chat-input';

export default function Chat() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
