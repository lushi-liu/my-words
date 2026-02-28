'use client';

import { useState, useEffect, useRef } from 'react';
import kuromoji from 'kuromoji';

const hasKanji = (str: string) => /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(str);

export default function FuriganaText({ text }: { text: string }) {
  const [html, setHtml] = useState(text);
  const hasRun = useRef(false);

  return (
    <span
      className="leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
