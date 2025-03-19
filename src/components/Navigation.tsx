'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-bold text-blue-600 hover:text-blue-700"
          >
            DPPL
          </Link>
          
          <div className="flex space-x-8">
            <Link 
              href="/method"
              className={`text-sm font-medium transition-colors ${
                isActive('/method')
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Method
            </Link>
            
            <Link 
              href="/results"
              className={`text-sm font-medium transition-colors ${
                isActive('/results')
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Results
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
} 