'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import DirectionToggle from './DirectionToggle';

export default function TranslatorCard() {
  const [direction, setDirection] = useState<'ja-to-en' | 'en-to-ja'>(
    'ja-to-en'
  );
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isJaToEn = direction === 'ja-to-en';

  const sourceLang = isJaToEn ? 'Japanese' : 'English';
  const targetLang = isJaToEn ? 'English' : 'Japanese';
  const sourcePlaceholder = isJaToEn
    ? 'ここに日本語を入力してください...'
    : 'Enter English text here...';
  const targetPlaceholder = isJaToEn
    ? 'Translation will appear here...'
    : '翻訳結果がここに表示されます...';

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);
    setTranslatedText('');

    // Placeholder simulation — replace with real API call
    try {
      await new Promise((r) => setTimeout(r, 1400));

      // In real app:
      // const res = await fetch('/api/translate', {
      //   method: 'POST',
      //   body: JSON.stringify({ text: sourceText, direction }),
      // });
      // const { translation } = await res.json();

      const simulated = isJaToEn
        ? `Simulated: "${sourceText}" → This is what your Japanese text would translate to in English.`
        : `Simulated: "${sourceText}" → これは英語のテキストが日本語に翻訳された例です。`;

      setTranslatedText(simulated);
    } catch {
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    // Flip direction and swap texts
    setDirection((prev) => (prev === 'ja-to-en' ? 'en-to-ja' : 'ja-to-en'));
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
  };

  return (
    <div className="bg-white-900/80 border-black-300/20 mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm">
      <div className="p-6 md:p-10">
        {/* Direction toggle */}
        <DirectionToggle
          direction={direction}
          onChange={setDirection}
          onSwap={handleSwap}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {/* Source (input) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-24 text-blue-dark font-bold">{sourceLang}</h2>
              <span className="text-14 text-white-500">
                {isJaToEn ? '日本語' : '英語'}
              </span>
            </div>
            <Textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={sourcePlaceholder}
            />
          </div>

          {/* Target (output) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-24 text-blue-light font-bold">
                {targetLang}
              </h2>
              <span className="text-14 text-white-500">
                {isJaToEn ? '英語' : '日本語'}
              </span>
            </div>
            <div
              className={`bg-black-300/5 border-black-300/20 text-18 text-black-200 min-h-[140px] w-full rounded-xl border px-5 py-4 whitespace-pre-wrap md:min-h-[180px]`}
            >
              {translatedText || (
                <span className="text-white-500 italic">
                  {targetPlaceholder}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-end">
          <Button
            variant="outline"
            size="md"
            onClick={handleClear}
            disabled={!sourceText && !translatedText}
          >
            Clear
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={handleTranslate}
            disabled={!sourceText.trim() || isLoading}
            className="min-w-[160px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Translating...
              </span>
            ) : (
              `Translate ${isJaToEn ? '→' : '←'}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
