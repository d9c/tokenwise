'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ApiKeyContext } from '@/contexts/api-key';
import { Github, KeyRound } from 'lucide-react';

export const Login = () => {
  const [key, setKey] = useState('');
  const { setApiKey } = useContext(ApiKeyContext);

  const router = useRouter();

  const handleOnClick = () => {
    if (!key.startsWith('sk-')) {
      window.alert('Invalid API Key. Please check your key and try again.');
      setKey('');
      return;
    }
    setApiKey(key);
    router.push('/chat');
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-sm">
        <span className="font-bold">
          Enter your{' '}
          <a
            href="https://platform.openai.com/"
            target="_blank"
            className="text-[#10A37F] underline"
          >
            OpenAI API
          </a>{' '}
          key:
        </span>
        <div className="mt-2 flex">
          <div className="flex items-center rounded-s-md bg-gray-600 px-3 text-sm">
            <KeyRound size={16} />
          </div>
          <input
            type="password"
            placeholder="API key"
            value={key}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleOnClick();
            }}
            onChange={(e) => setKey(e.target.value)}
            className="rounded-none rounded-e-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleOnClick}
          className="mt-2 rounded-lg border border-gray-600 bg-gray-700 px-5 py-2.5 text-center text-sm text-gray-400 hover:bg-gray-600 hover:text-white focus:outline-none"
        >
          Start
        </button>
      </div>

      <div className="mt-6 text-center text-sm">
        <span className="font-bold">How does this work?</span>
        <p className="max-w-sm">
          You can simply enter your own OpenAI API key and start chatting with
          any text-based AI model, paying only for what you use.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center text-center text-sm">
        <span className="font-bold">Source Code</span>
        <a
          href="https://github.com/d9c/tokenwise"
          target="_blank"
          title="GitHub Repository"
        >
          <Github size={28} />
        </a>
      </div>
    </div>
  );
};
