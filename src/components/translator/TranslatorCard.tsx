'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';

export default function TranslatorCard() {
  const [japanese, setJapanese] = useState('');
  const [english, setEnglish] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!japanese.trim()) return;

    setIsLoading(true);

    // Placeholder — replace with real API call
    // e.g. DeepL, Google Translate API, Groq + Llama, OpenAI, etc.
    try {
      // Simulated delay + fake result
      await new Promise((r) => setTimeout(r, 1200));
      setEnglish(
        'This is a simulated translation.\n\nIn real implementation, connect to:\n• DeepL API\n• Google Cloud Translation\n• OpenAI / Groq / local model'
      );
    } catch (err) {
      setEnglish('Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setJapanese('');
    setEnglish('');
  };

  return (
    <div className="bg-white-900/80 border-black-300/20 mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm">
      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {/* Japanese input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-24 text-blue-dark font-bold">Japanese</h2>
              <span className="text-14 text-white-500">日本語</span>
            </div>
            <Textarea
              value={japanese}
              onChange={(e) => setJapanese(e.target.value)}
              placeholder="ここに日本語を入力してください..."
            />
          </div>

          {/* English output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-24 text-blue-light font-bold">English</h2>
              <span className="text-14 text-white-500">英語</span>
            </div>
            <div
              className={`bg-black-300/5 border-black-300/20 text-18 text-black-200 min-h-[140px] w-full rounded-xl border px-5 py-4 whitespace-pre-wrap md:min-h-[180px]`}
            >
              {english || (
                <span className="text-white-500 italic">
                  Translation will appear here...
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
            disabled={!japanese && !english}
          >
            Clear
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleTranslate}
            disabled={!japanese.trim() || isLoading}
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
              'Translate →'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
