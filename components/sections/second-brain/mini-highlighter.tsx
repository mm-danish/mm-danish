'use client';

import * as React from 'react';

interface HighlighterProps {
  code: string;
}

export function MiniHighlighter({ code }: HighlighterProps) {
  const highlight = (text: string) => {
    // 1. Escape HTML special characters first to prevent XSS and code breakage
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Define patterns in order of priority (Strings and Comments first to avoid keyword collisions)
    const patterns = [
      // Comments
      { regex: /(\/\/.*)/g, class: "text-neutral-500 italic" },
      // Strings
      { regex: /(['"`])(.*?)\1/g, class: "text-emerald-400" },
      // Keywords (using word boundaries)
      {
        regex: /\b(export|function|const|let|var|await|async|return|if|else|import|from|try|catch|throw|new|type|interface|class|default)\b/g,
        class: "text-blue-400 font-medium"
      },
      // Methods/Functions
      { regex: /(\w+)(?=\s*\()/g, class: "text-amber-300 font-medium" },
      // Numbers
      { regex: /\b(\d+)\b/g, class: "text-orange-400" }
    ];

    // 3. Use an intermediate map to avoid "replacing a replacement"
    // We'll mark sections as "done" using placeholders
    let result = escaped;
    const tokens: string[] = [];

    patterns.forEach((p, i) => {
      result = result.replace(p.regex, (match) => {
        const token = `__TOKEN_${i}_${tokens.length}__`;
        tokens.push(`<span class="${p.class}">${match}</span>`);
        return token;
      });
    });

    // 4. Restore tokens
    tokens.forEach((t, i) => {
      // Reconstruct the token key based on how it was generated
      // Actually simpler to just loop backwards or use a unique map
    });

    // Simpler way: Replace all tokens in the end
    for (let i = patterns.length - 1; i >= 0; i--) {
      const patternTokenBase = `__TOKEN_${i}_`;
      tokens.forEach((html, tokenIdx) => {
        result = result.replace(new RegExp(`__TOKEN_${i}_${tokenIdx}__`, 'g'), html);
      });
    }

    return result;
  };

  return (
    <pre className="p-4 text-[13px] font-mono text-neutral-300 leading-relaxed bg-[#0d1117] whitespace-pre-wrap break-words overflow-x-hidden border border-white/5 rounded-b-lg">
      <code
        className="block"
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </pre>
  );
}
