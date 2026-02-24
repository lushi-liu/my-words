'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white-900/95 border-black-300/30 fixed top-0 right-0 left-0 z-50 border-b shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-24 text-blue-dark font-bold">
              JA↔EN Translator
            </span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`text-18 font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-dark'
                  : 'text-black-300 hover:text-blue-light'
              } `}
            >
              Translate
            </Link>
            <Link
              href="/dictionary"
              className={`text-18 font-medium transition-colors ${
                isActive('/dictionary')
                  ? 'text-blue-dark'
                  : 'text-black-300 hover:text-blue-light'
              } `}
            >
              Dictionary
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
