import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
export const metadata: Metadata = {
  title: 'JA↔EN Translator',
  description: 'Japanese to English translator with dictionary',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white-800 min-h-screen pt-16 antialiased">
        <Navbar />
        <main className="pt-4 pb-12">{children}</main>
      </body>
    </html>
  );
}
