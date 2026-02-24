'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import DirectionToggle from './DirectionToggle';
import kuromoji from 'kuromoji';

const hasKanji = (str: string): boolean => {
  return /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(str);
};

export default function TranslatorCard() {
  const [direction, setDirection] = useState<'ja-to-en' | 'en-to-ja'>(
    'ja-to-en'
  );
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isJaToEn = direction === 'ja-to-en';
  const sourceLang = isJaToEn ? 'Japanese' : 'English';
  const targetLang = isJaToEn ? 'English' : 'Japanese';

  const [tokenizer, setTokenizer] = useState<any>(null);
  const [kuromojiReady, setKuromojiReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    kuromoji.builder({ dicPath: '/dict' }).build((err: any, tok: any) => {
      if (!mounted) return;
      if (err) {
        console.error('Kuromoji load failed:', err);
        setError(
          'Failed to load Japanese tokenizer (furigana support unavailable)'
        );
        return;
      }
      setTokenizer(tok);
      setKuromojiReady(true);
      console.log('Kuromoji tokenizer loaded');
    });

    return () => {
      mounted = false;
    };
  }, []);

  const addFurigana = (text: string): string => {
    if (!kuromojiReady || !tokenizer || !text.trim()) {
      return text;
    }

    try {
      const tokens = tokenizer.tokenize(text);
      let result = '';

      tokens.forEach((token: any) => {
        const surface = token.surface_form || '';
        let reading = token.reading || '';

        // Skip if no reading, or reading same as surface (pure kana usually)
        if (!reading || reading === surface) {
          result += surface;
          return;
        }

        // Clean reading: hiragana preferred, remove ・
        reading = reading
          .toLowerCase()
          .replace(/・/g, '')
          .replace(/[ァ-ヶー]/g, (m: string) =>
            String.fromCharCode(m.charCodeAt(0) - 0x60)
          ); // katakana → hiragana

        // Only apply ruby if surface contains kanji
        if (hasKanji(surface)) {
          result += `<ruby>${surface}<rt>${reading}</rt></ruby>`;
        } else {
          result += surface;
        }
      });

      return result;
    } catch (e) {
      console.warn('Furigana generation failed', e);
      return text;
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, direction }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      let output = data.translation;

      // Add furigana if output is Japanese (EN→JA)
      if (!isJaToEn) {
        output = addFurigana(output);
      }

      setTranslatedText(output);
    } catch (err: any) {
      setError(err.message || 'Translation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveVocab = async () => {
    if (!sourceText.trim() || !translatedText.trim()) return;

    const sourceIsJapanese = direction === 'ja-to-en';

    const entry = {
      english: sourceIsJapanese ? translatedText : sourceText,
      japanese: sourceIsJapanese ? sourceText : translatedText,
    };

    try {
      const res = await fetch('/api/vocab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
        alert('Saved to vocabulary!');
      } else {
        const err = await res.json();
        alert('Save failed: ' + err.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving');
    }
  };

  const handleSwap = () => {
    setDirection((prev) => (prev === 'ja-to-en' ? 'en-to-ja' : 'ja-to-en'));
    setSourceText(translatedText.replace(/<[^>]+>/g, '')); // strip tags for swap
    setTranslatedText(sourceText);
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
    setError('');
  };

  // Furigana for source when JA→EN
  const displaySource = isJaToEn ? addFurigana(sourceText) : sourceText;

  return (
    <div className="bg-white-900/80 border-black-300/20 mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm">
      <div className="p-6 md:p-10">
        <DirectionToggle
          direction={direction}
          onChange={setDirection}
          onSwap={handleSwap}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {/* Source */}
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
              placeholder={
                isJaToEn
                  ? 'ここに日本語を入力してください...'
                  : 'Enter English text here...'
              }
            />
            {/* Preview furigana for Japanese input */}
            {isJaToEn && sourceText.trim() && (
              <div
                className="text-16 text-black-300 mt-2"
                dangerouslySetInnerHTML={{ __html: displaySource }}
              />
            )}
          </div>

          {/* Target */}
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
              className={`prose prose-lg bg-black-300/5 border-black-300/20 text-18 text-black-200 min-h-[180px] w-full max-w-none rounded-xl border px-5 py-4 whitespace-pre-wrap`}
            >
              {error ? (
                <span className="text-red-500">{error}</span>
              ) : translatedText ? (
                <div dangerouslySetInnerHTML={{ __html: translatedText }} />
              ) : (
                <span className="text-white-500 italic">
                  {isJaToEn
                    ? 'Translation will appear here...'
                    : '翻訳結果がここに表示されます...'}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-end">
          <Button
            variant="secondary"
            size="md"
            onClick={handleSaveVocab}
            disabled={!translatedText.trim()}
          >
            Save to Vocabulary
          </Button>
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
            {isLoading ? 'Translating...' : `Translate ${isJaToEn ? '→' : '←'}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
