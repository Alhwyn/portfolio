'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
        p: ({ children }) => (
          <p className="leading-[1.75] text-neutral-900 text-[15px] mb-6">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 underline font-semibold dark:text-neutral-400 hover:text-blue-500"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
        h2: ({ children }) => (
          <h2 className="font-semibold text-gray-900 dark:text-neutral-100 text-2xl mb-6 mt-12 instrument-serif-regular">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-semibold text-gray-900 dark:text-neutral-100 text-xl mb-4 mt-8 instrument-serif-regular">
            {children}
          </h3>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-6 text-xl leading-loose text-gray-800 dark:text-neutral-300">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-6 text-xl leading-loose text-gray-800 dark:text-neutral-300">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="mb-2 leading-loose">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 dark:border-neutral-600 pl-4 my-6 italic leading-loose text-gray-600 dark:text-neutral-400">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm">
            {children}
          </code>
        ),
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
