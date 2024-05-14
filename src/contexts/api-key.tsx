import { createContext, type ReactNode, useState } from 'react';

export const ApiKeyContext = createContext<{
  apiKey: string;
  setApiKey: (apiKey: string) => void;
}>({
  apiKey: '',
  setApiKey: () => {},
});

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKey] = useState('');

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
