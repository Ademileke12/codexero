import React from 'react';
import { cn } from '../utils';

interface HeroProps {
  theme: 'dark' | 'light';
  heroImage?: string | null;
}

export const Hero: React.FC<HeroProps> = ({ theme, heroImage }) => {
  return (
    <div className="pt-32 pb-12 px-8 text-center max-w-7xl mx-auto w-full relative">
      
      {/* Generated Background Image (Desktop Only) */}
      {heroImage && (
        <div className="absolute inset-0 -z-10 hidden md:flex items-center justify-center opacity-40 pointer-events-none overflow-hidden">
          <img 
            src={heroImage} 
            alt="Generated Background" 
            className="w-full h-full object-cover animate-float"
          />
          <div className={cn(
            "absolute inset-0",
            theme === 'dark' ? "bg-gradient-to-b from-black/70 via-black/40 to-black/90" : "bg-gradient-to-b from-white/90 via-white/60 to-white/90"
          )} />
        </div>
      )}

      <div className="inline-block mb-4 relative z-10">
        <span className={cn(
          "text-xs font-mono uppercase tracking-widest py-1 px-3 rounded-full border",
          theme === 'dark'
            ? "border-brand-orange/30 text-brand-orange bg-brand-orange/10"
            : "border-gray-200 text-gray-500 bg-gray-100"
        )}>
          Beta Access
        </span>
      </div>
      
      <h1 className={cn(
        "text-5xl md:text-7xl font-bold tracking-tight mb-6 relative z-10",
        theme === 'dark' ? "text-white" : "text-brand-charcoal"
      )}>
        CodeXero Learning Path
      </h1>
      
      <p className={cn(
        "text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10",
        theme === 'dark' ? "text-gray-400" : "text-gray-600"
      )}>
        From Web3 Enthusiast to Confident dApp Architect using the No-Code Ecosystem.
      </p>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto relative z-10">
        <div className="flex justify-between text-xs font-mono mb-2">
          <span className={theme === 'dark' ? "text-brand-orange" : "text-brand-charcoal"}>
            0% Complete
          </span>
          <span className={theme === 'dark' ? "text-gray-500" : "text-gray-400"}>
            10 Modules
          </span>
        </div>
        <div className={cn(
          "h-2 w-full rounded-full overflow-hidden",
          theme === 'dark' ? "bg-white/10" : "bg-gray-200"
        )}>
          <div className="h-full w-0 bg-brand-orange relative">
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};