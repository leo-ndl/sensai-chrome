import { Sparkles } from 'lucide-react';
import React from 'react';

interface OutputDisplayProps {
  output: string;
  loading: boolean;
  successPulse: boolean;
}

function MarkdownContent({ content }: { content: string }) {
  // Simple markdown parser for common patterns
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    // @ts-ignore
    let codeBlockLang = '';

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLang = line.slice(3).trim();
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${index}`} className="bg-slate-950/70 rounded-lg p-3 my-2 overflow-x-auto border border-slate-700">
              <code className="text-sm text-cyan-300 font-mono">
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          );
          codeBlockContent = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-lg font-bold text-purple-300 mt-4 mb-2">{line.slice(4)}</h3>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-xl font-bold text-purple-300 mt-4 mb-2">{line.slice(3)}</h2>);
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-2xl font-bold text-purple-300 mt-4 mb-2">{line.slice(2)}</h1>);
      }
      // Lists
      else if (line.match(/^[\*\-]\s/)) {
        const content = parseInlineMarkdown(line.slice(2));
        elements.push(
          <li key={index} className="ml-4 my-1 text-gray-200">
            <span className="text-purple-400 mr-2">•</span>
            {content}
          </li>
        );
      }
      else if (line.match(/^\d+\.\s/)) {
        const content = parseInlineMarkdown(line.replace(/^\d+\.\s/, ''));
        elements.push(
          <li key={index} className="ml-4 my-1 text-gray-200 list-decimal list-inside">
            {content}
          </li>
        );
      }
      // Bold text in lines
      else if (line.match(/\*\*(.*?)\*\*/)) {
        elements.push(<p key={index} className="my-2 text-gray-200">{parseInlineMarkdown(line)}</p>);
      }
      // Inline code
      else if (line.includes('`')) {
        elements.push(<p key={index} className="my-2 text-gray-200">{parseInlineMarkdown(line)}</p>);
      }
      // Blockquotes
      else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-purple-500 pl-4 my-2 italic text-gray-300">
            {line.slice(2)}
          </blockquote>
        );
      }
      // Horizontal rule
      else if (line.match(/^---+$/)) {
        elements.push(<hr key={index} className="my-4 border-slate-600" />);
      }
      // Regular paragraph
      else if (line.trim()) {
        elements.push(<p key={index} className="my-2 text-gray-200">{parseInlineMarkdown(line)}</p>);
      }
      // Empty line
      else {
        elements.push(<div key={index} className="h-2" />);
      }
    });

    return elements;
  };

  const parseInlineMarkdown = (text: string) => {
    const parts: (string | React.JSX.Element)[] = [];
    let key = 0;

    // Handle inline code first
    const codeRegex = /`([^`]+)`/g;
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const beforeCode = text.slice(lastIndex, match.index);
        parts.push(...processTextFormatting(beforeCode, key));
        key += 100;
      }
      parts.push(
        <code key={`code-${key++}`} className="bg-slate-950/70 px-1.5 py-0.5 rounded text-cyan-300 text-sm font-mono">
          {match[1]}
        </code>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(...processTextFormatting(text.slice(lastIndex), key));
    }

    return parts.length > 0 ? parts : text;
  };

  const processTextFormatting = (text: string, startKey: number) => {
    const parts: (string | React.JSX.Element)[] = [];
    const boldRegex = /\*\*([^*]+)\*\*/g;
    
    let key = startKey;

    // Process bold
    let lastIndex = 0;
    let match;
    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <strong key={`bold-${key++}`} className="font-bold text-blue-300">
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  return <div className="markdown-content">{parseMarkdown(content)}</div>;
}

export function OutputDisplay({ output, loading, successPulse }: OutputDisplayProps) {
  if (!output) return null;

  return (
    <div className={`relative transition-all duration-500 ${successPulse ? 'scale-105' : 'scale-100'}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl opacity-20 blur-lg" />
      <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-700">
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-green-400" />
          AI Response
        </label>
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600 min-h-[100px] max-h-[300px] overflow-y-auto">
          <div className="text-sm leading-relaxed">
            <MarkdownContent content={output} />
          </div>
        </div>
        {!loading && output && (
          <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Response complete!</span>
          </div>
        )}
      </div>
    </div>
  );
}