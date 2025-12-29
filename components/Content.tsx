import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { ModuleCard } from './ModuleCard';
import { Footer } from './Footer';
import { ThemeContextProps } from '../types';
import { cn } from '../utils';

interface ContentProps extends ThemeContextProps {
  className?: string;
  isTypingGameOpen: boolean;
  closeTypingGame: () => void;
  heroImage?: string | null;
}

export const Content: React.FC<ContentProps> = ({ 
  theme, 
  viewMode,
  setViewMode,
  activeIndex, 
  modules,
  quizActions,
  typingGameActions,
  className,
  heroImage
}) => {
  return (
    <div className={cn("min-h-screen w-full relative flex flex-col font-sans pb-32", className)}>
      <Navbar 
        theme={theme} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        onOpenGame={typingGameActions.openGame}
      />
      
      <main className="flex-1 flex flex-col items-center relative z-10">
        <Hero theme={theme} heroImage={heroImage} />

        {/* Carousel Area */}
        <div className="w-full max-w-[1600px] flex items-center justify-center relative mt-8 mb-24 pl-4 md:pl-[10vw] pr-4">
          
          {/* Active Card */}
          <div className="z-20 relative transform scale-90 md:scale-100 transition-transform">
             <ModuleCard 
               module={modules[activeIndex]} 
               isActive={true} 
               theme={theme} 
               onStartQuiz={quizActions.openQuiz}
             />
          </div>

          {/* Next Card Peek - Hide on mobile */}
          {activeIndex < modules.length - 1 && (
            <div className="absolute left-[calc(50%+420px)] z-10 pointer-events-none hidden xl:block">
              <ModuleCard 
                module={modules[activeIndex + 1]} 
                isActive={false} 
                theme={theme} 
                isNext={true}
              />
            </div>
          )}
        </div>

        <Footer theme={theme} />
      </main>
    </div>
  );
};