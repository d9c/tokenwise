'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiKeyProvider } from '@/contexts/api-key';
import { MessagesProvider } from '@/contexts/messages';

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ApiKeyProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </ApiKeyProvider>
    </QueryClientProvider>
  );
};
