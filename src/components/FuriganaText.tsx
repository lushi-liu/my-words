'use client';

import { useState, useEffect } from 'react';
import kuromoji from 'kuromoji';

const hasKanji = (str: string) => /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(str);

export default function FuriganaText({ text }: { text: string }) {
  const [html, setHtml] = useState(text);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    kuromoji.builder({ dicPath: '/dict' }).build((err, tokenizer) => {
      if (err || !mounted) return;
      setReady(true);

      try {
        const tokens = tokenizer.tokenize(text);
        let result = '';

        tokens.forEach((token: any) => {
          const surface = token.surface_form || '';
          const reading = (token.reading || '')
            .toLowerCase()
            .replace(/・/g, '')
            .replace(/[ァ-ヶー]/g, (m: string) =>
              String.fromCharCode(m.charCodeAt(0) - 0x60)
            );

          if (hasKanji(surface) && reading && reading !== surface) {
            result += `<ruby>${surface}<rt>${reading}</rt></ruby>`;
          } else {
            result += surface;
          }
        });

        setHtml(result);
      } catch {
        setHtml(text);
      }
    });

    return () => {
      mounted = false;
    };
  }, [text]);

  return (
    <span
      className="leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
