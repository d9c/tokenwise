'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ApiKeyContext } from '@/contexts/api-key';
import { FaKey } from 'react-icons/fa';

export const Login = () => {
  const router = useRouter();

  const [key, setKey] = useState('');
  const { setApiKey } = useContext(ApiKeyContext);

  const validateKey = async (key: string) => {
    // Implement validation logic here
    return key.startsWith('sk-'); // Example validation
  };

  const handleOnClick = async () => {
    const isValid = await validateKey(key);
    if (isValid) {
      setApiKey(key);
      router.push('/chat');
      return;
    }
    // setError('Invalid API Key. Please check your key and try again.');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-white">
          Enter your{' '}
          <a
            href="https://platform.openai.com/"
            target="_blank"
            className="text-[#10A37F] underline"
          >
            <strong>OpenAI API</strong>
          </a>{' '}
          key:
        </span>

        <div className="flex">
          <span className="inline-flex items-center rounded-s-md border border-e-0 border-gray-600 bg-gray-600 px-3 text-sm text-gray-400">
            <FaKey size={14} />
          </span>
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
          className="rounded-lg border border-gray-600 bg-gray-700 px-5 py-2.5 text-center text-sm text-gray-400 hover:bg-gray-600 hover:text-white focus:outline-none"
        >
          Start
        </button>
      </div>

      <div className="mt-20">
        <span className="block text-center text-sm">How does this work?</span>
        <p className="max-w-sm text-center text-sm">
          Here, you can simply enter your own OpenAI API key and start chatting
          with any text-based AI model, but you're only going to{' '}
          <strong className="text-[#10A37F]">pay for what you use</strong>.
        </p>
      </div>

      <div className="mt-20">
        <span className="text-sm">*github link here*</span>
      </div>
    </div>
  );
};
