'use client';

import { TECH_ARSENAL, SECTIONS } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';

export default function TechArsenal() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id={SECTIONS.TECH_STACK}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-dark-bg"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 ${isInView ? 'animate-slide-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Technological Arsenal
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-white to-gray-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-text text-base md:text-lg max-w-3xl mx-auto">
            Leveraging the most powerful tools in modern development to build autonomous
            agents and scalable applications.
          </p>
        </div>

        {/* Tech Cards Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 ${isInView ? 'stagger' : ''}`}
        >
          {TECH_ARSENAL.map((tech) => (
            <div
              key={tech.id}
              className="bg-gradient-to-br from-black via-gray-900 to-black border border-white/30 hover:border-white/60 rounded-xl p-6 md:p-8 hover:bg-black/80 transition-all duration-300 group hover:shadow-lg hover:shadow-white/20"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-125 group-hover:text-white transition-all duration-300">
                {tech.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-gray-300 transition-colors">
                {tech.title}
              </h3>

              {/* Technologies */}
              <p className="text-gray-text text-sm md:text-base group-hover:text-white/90 transition-colors">
                {tech.technologies.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
