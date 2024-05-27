'use client';

import { useContext } from 'react';
import { MessagesContext } from '@/contexts/messages';

import { User, Bot } from 'lucide-react';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type CodeProps = {
  children?: any;
  className?: any;
  node?: any;
};

export const ChatMessages = () => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <>
      {inverseMessages.length > 0 ? (
        <div className="h-full w-full overflow-y-auto py-6">
          <div className="mx-auto w-[48rem]">
            <div className="flex flex-col-reverse gap-9">
              <div className="flex-1 flex-grow" />
              {inverseMessages.map((message, index) => (
                <div className="chat-message flex gap-2" key={index}>
                  <div className="w-[24px]">
                    {message.isUserMessage ? (
                      <User size={24} />
                    ) : (
                      <Bot size={24} />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">
                      {message.isUserMessage ? 'User' : 'ChatGPT'}
                    </span>
                    <div className="text-sm">
                      <Markdown
                        components={{
                          a: (props) => {
                            return (
                              <a
                                href={props.href}
                                target="_blank"
                                className="font-semibold text-[#10A37F] underline"
                              >
                                {props.children}
                              </a>
                            );
                          },
                          code({
                            children,
                            className,
                            node,
                            ...rest
                          }: CodeProps) {
                            const match = /language-(\w+)/.exec(
                              className || ''
                            );
                            return match ? (
                              <SyntaxHighlighter
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                className="my-3"
                                style={vs2015}
                                {...rest}
                              />
                            ) : (
                              <code {...rest} className={className}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {message.text}
                      </Markdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-sm">No messages yet</span>
        </div>
      )}
    </>
  );
};
