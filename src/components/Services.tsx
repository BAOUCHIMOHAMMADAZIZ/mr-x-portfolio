'use client';

import { SERVICES, SECTIONS } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';

export default function Services() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id={SECTIONS.SERVICES}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 ${isInView ? 'animate-slide-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-primary via-white to-cyan-primary bg-clip-text text-transparent">
            What I Offer
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-primary to-cyan-primary/50 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto ${isInView ? 'stagger' : ''}`}
        >
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-gradient-to-br from-slate-900 via-gray-900 to-black border border-cyan-primary/30 hover:border-cyan-primary/80 rounded-2xl p-8 md:p-10 hover:bg-gradient-to-br hover:from-slate-800 hover:via-gray-800 hover:to-black transition-all duration-400 hover:shadow-2xl hover:shadow-cyan-primary/20"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-primary/0 to-cyan-primary/0 group-hover:from-cyan-primary/10 group-hover:to-cyan-primary/5 rounded-2xl transition-all duration-400 pointer-events-none"></div>

              {/* Content wrapper */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl md:text-6xl mb-6 group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 border-t border-white/10 pt-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-gray-300 text-sm md:text-base flex items-start gap-3 group-hover:text-white transition-colors duration-300"
                    >
                      <span className="text-cyan-primary font-bold text-lg leading-none mt-0.5 group-hover:scale-125 transition-transform duration-300">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
