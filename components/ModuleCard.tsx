import React from 'react';
import { ArrowRight, Lock, Play, Zap, Terminal } from 'lucide-react';
import { cn } from '../utils';
import { ModuleData } from '../types';

interface ModuleCardProps {
  module: ModuleData;
  isActive: boolean;
  theme: 'dark' | 'light';
  isNext?: boolean;
  onStartQuiz?: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, isActive, theme, isNext, onStartQuiz }) => {
  // If it's the next card (peek), render a simplified version
  if (isNext) {
    return (
      <div className={cn(
        "h-[650px] w-[350px] rounded-3xl border p-8 flex flex-col justify-between opacity-50 transform scale-90 origin-left transition-all duration-500",
        theme === 'dark'
          ? "bg-white/5 border-white/10 text-gray-400 blur-[2px]"
          : "bg-white border-gray-200 text-gray-400 shadow-xl blur-[1px]"
      )}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
              {module.locked ? <Lock size={18} /> : <Zap size={18} />}
            </div>
            <span className="font-mono text-sm">{module.locked ? "LOCKED" : "AVAILABLE"}</span>
          </div>
          <h3 className="text-2xl font-bold">{module.title}</h3>
        </div>
        
        {/* Abstract connection lines visual */}
        <div className="flex-1 flex items-center justify-center opacity-30">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-12 h-12 border-2 border-current rounded-lg border-dashed" />
            <div className="w-12 h-12 border-2 border-current rounded-lg" />
            <div className="w-12 h-12 border-2 border-current rounded-lg" />
            <div className="w-12 h-12 border-2 border-current rounded-lg border-dashed" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full max-w-[800px] min-h-auto md:min-h-[650px] rounded-3xl border flex flex-col relative overflow-hidden transition-all duration-500",
      theme === 'dark' 
        ? "bg-[#111] border-white/10 shadow-2xl shadow-black/50" 
        : "bg-white border-gray-200 shadow-2xl shadow-gray-200"
    )}>
      {/* Card Header */}
      <div className="p-6 md:p-8 border-b border-inherit flex items-start justify-between">
        <div>
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4",
            theme === 'dark' ? "bg-brand-orange text-white" : "bg-brand-charcoal text-white"
          )}>
            <Zap size={12} fill="currentColor" /> Active Mission
          </div>
          <h2 className={cn(
            "text-2xl md:text-4xl font-bold mb-2",
            theme === 'dark' ? "text-white" : "text-brand-charcoal"
          )}>
            {module.title}
          </h2>
          <p className={cn(
            "text-sm md:text-lg opacity-80",
            theme === 'dark' ? "text-gray-300" : "text-gray-600"
          )}>
            {module.subtitle}
          </p>
        </div>
        <div className={cn(
          "w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-mono text-xl md:text-2xl font-bold shrink-0 ml-4",
          theme === 'dark' ? "bg-white/5 text-gray-500" : "bg-gray-100 text-gray-400"
        )}>
          {module.id < 10 ? `0${module.id}` : module.id}
        </div>
      </div>

      {/* Split Content Area - Visual Representation of Problem vs Benefit */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 relative min-h-[250px]">
        {/* Left: The Problem (Highlighted in Dark Mode) */}
        <div className={cn(
          "p-6 md:p-8 border-b md:border-b-0 md:border-r border-inherit flex flex-col justify-start",
          theme === 'dark' ? "bg-brand-orange/5" : "bg-transparent"
        )}>
          <span className={cn(
            "text-xs font-mono uppercase mb-4 block",
            theme === 'dark' ? "text-brand-orange" : "text-gray-400"
          )}>
            {module.problemLabel}
          </span>
          <p className={cn(
            "text-base leading-relaxed font-medium",
            theme === 'dark' ? "text-brand-orange drop-shadow-md" : "text-gray-400 opacity-50 grayscale"
          )}>
            {module.problem}
          </p>
        </div>

        {/* Right: The Benefit (Highlighted in Light Mode) */}
        <div className={cn(
          "p-6 md:p-8 flex flex-col justify-start",
          theme === 'light' ? "bg-blue-50/50" : "bg-transparent"
        )}>
          <span className={cn(
            "text-xs font-mono uppercase mb-4 block",
            theme === 'light' ? "text-brand-charcoal" : "text-gray-600"
          )}>
            The Benefit
          </span>
          <p className={cn(
            "text-base leading-relaxed font-medium",
            theme === 'light' ? "text-brand-charcoal" : "text-gray-600 opacity-50"
          )}>
            {module.benefit}
          </p>
        </div>

        {/* Middle Divider Decoration */}
        <div className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 z-10 flex items-center justify-center",
          theme === 'dark' 
            ? "bg-[#111] border-brand-orange text-brand-orange shadow-glow-orange" 
            : "bg-white border-brand-charcoal text-brand-charcoal"
        )}>
           <ArrowRight size={14} className="transform rotate-90 md:rotate-0 transition-transform" />
        </div>
      </div>

      {/* Action Section */}
      <div className={cn(
        "px-6 py-6 md:px-8 border-t border-inherit",
        theme === 'dark' ? "bg-white/5" : "bg-gray-50/80"
      )}>
        <div className="flex gap-4 items-start">
          <div className={cn(
            "mt-1 w-8 h-8 rounded flex items-center justify-center shrink-0",
             theme === 'dark' ? "bg-brand-orange/20 text-brand-orange" : "bg-brand-charcoal/10 text-brand-charcoal"
          )}>
            <Terminal size={16} />
          </div>
          <div>
            <span className={cn(
              "text-xs font-bold uppercase block mb-1",
              theme === 'dark' ? "text-gray-400" : "text-gray-500"
            )}>
              How To Get Started
            </span>
            <p className={cn(
              "text-sm",
              theme === 'dark' ? "text-gray-200" : "text-gray-800"
            )}>
              {module.action}
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className={cn(
        "p-6 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-inherit gap-4",
        theme === 'dark' ? "bg-black/40" : "bg-white"
      )}>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white/10" />
            ))}
          </div>
          <span className={cn("text-xs font-medium", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
            +420 Builders joined
          </span>
        </div>
        
        <button 
          onClick={onStartQuiz}
          className={cn(
          "w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105 active:scale-95",
          theme === 'dark'
            ? "bg-brand-orange text-white shadow-glow-orange"
            : "bg-brand-charcoal text-white shadow-lg"
        )}>
          <Play size={16} fill="currentColor" />
          Start Mission
        </button>
      </div>
    </div>
  );
};