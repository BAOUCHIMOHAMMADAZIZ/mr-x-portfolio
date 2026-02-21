'use client';

import { STATS } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';

export default function Stats() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-black/50"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 ${isInView ? 'stagger' : ''}`}
        >
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-xl hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
