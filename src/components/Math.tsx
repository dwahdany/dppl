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
      return (
        <div className={className}>
          <BlockMath math={math} />
        </div>
      );
    }
    return (
      <div className={className}>
        <InlineMath math={math} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering math formula:', error);
    return <span className="text-red-500">{math}</span>;
  }
}