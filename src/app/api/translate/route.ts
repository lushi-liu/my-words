import { NextRequest, NextResponse } from 'next/server';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

if (!DEEPL_API_KEY) {
  console.error('DeepL API key not set in environment variables');
}

const isFreeKey = DEEPL_API_KEY?.endsWith(':fx');
const DEEPL_URL = isFreeKey
  ? 'https://api-free.deepl.com/v2/translate'
  : 'https://api.deepl.com/v2/translate';

export async function POST(req: NextRequest) {
  if (!DEEPL_API_KEY) {
    return NextResponse.json(
      { error: 'DeepL API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { text, direction } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json({ translation: '' });
    }

    const source_lang = direction === 'ja-to-en' ? 'JA' : 'EN';
    const target_lang = direction === 'ja-to-en' ? 'EN' : 'JA';

    const body = JSON.stringify({
      text: [text], // DeepL expects array of strings
      source_lang,
      target_lang,
    });

    const res = await fetch(DEEPL_URL, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.message || (await res.text()) || 'Unknown error';
      throw new Error(`DeepL error: ${res.status} - ${errMsg}`);
    }

    const data = await res.json();
    const translation = data.translations?.[0]?.text || '';

    return NextResponse.json({ translation });
  } catch (error: any) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed', details: error.message },
      { status: 500 }
    );
  }
}
