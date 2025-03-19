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
      <span className={className} style={{ display: 'inline-block' }}>
        <InlineMath math={math} />
      </span>
    );
  } catch (error) {
    console.error('Error rendering math formula:', error);
    return <span className="text-red-500">{math}</span>;
  }
}