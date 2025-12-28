import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MarkdownRenderer = ({ content, className = '' }) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700" {...props} />,
          p: ({ node, ...props }) => <p className="mt-4 mb-4 text-gray-700 leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mt-4 mb-4 ml-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside mt-4 mb-4 ml-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-2 text-gray-700" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-50 italic" {...props} />,
          code: ({ node, inline, ...props }) => {
            if (inline) {
              return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />;
            }
            return <code className="block bg-gray-100 p-4 rounded my-4 overflow-x-auto font-mono text-sm" {...props} />;
          },
          pre: ({ node, ...props }) => <pre className="bg-gray-100 p-4 rounded my-4 overflow-x-auto" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          table: ({ node, ...props }) => (
            <table className="min-w-full border-collapse border border-gray-300 my-4" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-4 py-2" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;