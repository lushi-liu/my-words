// src/app/page.tsx
import TranslatorCard from '../components/translator/TranslatorCard';

export default function Home() {
  return (
    <main className="bg-gradient-radial from-white-800 via-white-800 to-black-200/40 min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h1 className="text-48 md:text-64 text-blue-dark font-bold tracking-tight">
            Japanese → English
          </h1>
          <p className="text-20 text-white-500 mt-4">
            Fast, clean, and accurate translation
          </p>
        </div>

        {/* Main translator component */}
        <TranslatorCard />

        {/* Optional footer note */}
        <div className="text-14 text-white-500 mt-12 text-center">
          Powered by Next.js + Tailwind CSS • Use DeepL / Google Translate / LLM
          API in production
        </div>
      </div>
    </main>
  );
}
