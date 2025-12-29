import React, { useRef, useEffect } from 'react';
import { cn } from '../utils';
import { ModuleData } from '../types';

interface TimelineProps {
  modules: ModuleData[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  theme: 'dark' | 'light';
}

export const Timeline: React.FC<TimelineProps> = ({ modules, activeIndex, setActiveIndex, theme }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll active item into view on mobile
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        const container = scrollContainerRef.current;
        const scrollLeft = activeElement.offsetLeft - (container.clientWidth / 2) + (activeElement.clientWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 flex items-center justify-center z-[40] pointer-events-none">
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t pointer-events-none",
        theme === 'dark' ? "from-black via-black/80 to-transparent" : "from-white via-white/80 to-transparent"
      )} />
      
      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="relative z-10 flex items-end gap-1 px-4 md:px-8 pb-8 overflow-x-auto w-full justify-start md:justify-center max-w-7xl no-scrollbar pointer-events-auto"
      >
        {modules.map((module, index) => {
          const isActive = index === activeIndex;
          
          return (
            <button
              key={module.id}
              onClick={() => setActiveIndex(index)}
              className="group flex flex-col items-center gap-3 min-w-[80px] md:min-w-[100px] shrink-0 transition-all duration-300 hover:-translate-y-2 focus:outline-none"
            >
              {/* Line Connector */}
              <div className={cn(
                "h-px w-full absolute top-1/2 -z-10",
                 theme === 'dark' ? "bg-white/10" : "bg-gray-200"
              )} />

              {/* Node Point */}
              <div className={cn(
                "w-4 h-4 rounded-full border-2 transition-all duration-300 relative",
                isActive 
                  ? (theme === 'dark' 
                      ? "bg-brand-orange border-brand-orange shadow-glow-orange scale-125" 
                      : "bg-brand-orange border-brand-orange scale-125")
                  : (theme === 'dark'
                      ? "bg-black border-gray-700 group-hover:border-gray-500"
                      : "bg-white border-gray-300 group-hover:border-gray-400")
              )}>
                 {isActive && (
                    <div className={cn(
                      "absolute inset-0 rounded-full animate-ping opacity-75",
                      theme === 'dark' ? "bg-brand-orange" : "bg-orange-400"
                    )} />
                 )}
              </div>

              {/* Label */}
              <div className="flex flex-col items-center">
                <span className={cn(
                  "text-[10px] font-mono font-bold uppercase tracking-wider transition-colors",
                  isActive
                    ? (theme === 'dark' ? "text-brand-orange" : "text-brand-charcoal")
                    : (theme === 'dark' ? "text-gray-600 group-hover:text-gray-400" : "text-gray-400 group-hover:text-gray-600")
                )}>
                  M{module.id}
                </span>
                <span className={cn(
                  "text-xs font-medium whitespace-nowrap transition-colors mt-1 hidden md:block",
                  isActive
                    ? (theme === 'dark' ? "text-white" : "text-black")
                    : "text-transparent"
                )}>
                  {module.title.split(': ')[1].split(' ')[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};