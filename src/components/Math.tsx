'use client';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export default function Math({ math, block = false, className = '' }: MathProps) {
  try {
    if (block) {
      return <BlockMath math={math} className={className} />;
    }
    return <InlineMath math={math} className={className} />;
  } catch (error) {
    console.error('Error rendering math formula:', error);
    return <span className="text-red-500">{math}</span>;
  }
}