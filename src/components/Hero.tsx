'use client';

import Image from 'next/image';
import { SECTIONS } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import AnimatedText from './AnimatedText';

export default function Hero() {
  const { ref, isInView } = useInView();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      id={SECTIONS.ABOUT}
      className="pt-24 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div
            className={`space-y-6 ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-lg">
                <AnimatedText
                  text="Architecting Intelligent Systems"
                  typeSpeed={80}
                  deleteSpeed={40}
                  pauseDuration={1500}
                  className="inline"
                />
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-text leading-relaxed max-w-md">
              AI Systems Architect & Full-Stack Developer bridging the gap between
              cutting-edge artificial intelligence and scalable business automation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection(SECTIONS.CONTACT)}
                className="px-6 py-3 bg-gradient-to-r from-white via-gray-200 to-white/80 text-black font-semibold rounded-lg hover:shadow-2xl hover:shadow-white/40 transform hover:scale-105 transition-all duration-300"
              >
                Start a Project
              </button>

              <button
                onClick={() => scrollToSection(SECTIONS.SERVICES)}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 hover:shadow-lg hover:shadow-white/40 transition-all duration-300"
              >
                View Services
              </button>
            </div>
          </div>

          {/* Right Column - Profile Card */}
          <div
            className={`flex justify-center md:justify-end ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}
          >
            <div className="w-full max-w-sm">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white via-gray-300 to-white rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur-lg"></div>
                <div className="relative bg-gradient-to-br from-black via-gray-900 to-black border border-white/30 group-hover:border-white/60 rounded-2xl overflow-hidden p-6 transition-all duration-300 backdrop-blur-sm">
                  {/* Profile Image */}
                  <div className="relative w-32 h-32 mx-auto mt-12 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-white/30 group-hover:shadow-white/60 transition-all duration-300 animate-float">
                    <Image
                      src="/images/profile.jpg"
                      alt="Mohammed - AI Systems Architect"
                      fill
                      className="object-cover object-top rounded-full"
                      priority
                    />
                  </div>

                  {/* Profile Info */}
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold text-white">Mohammed</h2>
                    <p className="text-gray-300 font-medium">Mr X - Based in Algeria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
