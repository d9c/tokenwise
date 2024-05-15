import { ChatMessages } from '@/components/chat-messages';
import { ChatInput } from '@/components/chat-input';

export default function Chat() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="px-2 py-2 text-xs">
        <span>header</span>
      </div>

      <ChatMessages />
      <ChatInput />

      <div className="px-2 py-2 text-xs">
        <span>footer</span>
      </div>
    </div>
  );
}
