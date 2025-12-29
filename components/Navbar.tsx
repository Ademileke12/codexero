import React from 'react';
import { Sun, Moon, Wallet, Terminal, LayoutPanelLeft } from 'lucide-react';
import { cn } from '../utils';
import { ViewMode } from '../types';

interface NavbarProps {
  theme: 'dark' | 'light';
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenGame: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, viewMode, setViewMode, onOpenGame }) => {
  const handleConnect = () => {
    alert("Connecting to wallet...");
  };

  const handleToggle = () => {
    // Cycle: Split -> Dark -> Light -> Split
    if (viewMode === 'split') setViewMode('dark');
    else if (viewMode === 'dark') setViewMode('light');
    else setViewMode('split');
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 h-20 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between px-8">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-8 h-8 rounded bg-brand-orange flex items-center justify-center font-bold text-white shadow-glow-orange">
          C
        </div>
        <span className={cn(
          "font-bold text-xl tracking-tight hidden md:block",
          theme === 'dark' ? "text-white" : "text-brand-charcoal"
        )}>
          CodeXero
        </span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-8">
        {['Path', 'Modules', 'Community'].map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => { e.preventDefault(); }}
            className={cn(
              "text-sm font-medium transition-colors duration-200",
              theme === 'dark' 
                ? "text-gray-400 hover:text-white" 
                : "text-gray-500 hover:text-brand-charcoal"
            )}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* Speed Test Game (PC Only) */}
        <button 
          onClick={onOpenGame}
          className={cn(
            "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors",
            theme === 'dark' 
              ? "border-brand-orange/50 text-brand-orange hover:bg-brand-orange/10" 
              : "border-brand-charcoal/30 text-brand-charcoal hover:bg-gray-100"
          )}
          title="Speed Coding Challenge"
        >
          <Terminal size={14} />
          <span>SPEED TEST</span>
        </button>

        {/* View Mode Toggle */}
        <button 
          onClick={handleToggle}
          className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all hover:scale-105",
          theme === 'dark' 
            ? "border-white/20 bg-white/5 text-brand-orange" 
            : "border-black/10 bg-black/5 text-gray-500"
        )}>
          {viewMode === 'split' && <LayoutPanelLeft size={16} />}
          {viewMode === 'dark' && <Moon size={16} />}
          {viewMode === 'light' && <Sun size={16} />}
          <span className="text-xs font-bold uppercase w-12 text-center">
            {viewMode}
          </span>
        </button>

        {/* Wallet Button */}
        <button 
          onClick={handleConnect}
          className={cn(
          "flex items-center gap-2 px-4 md:px-5 py-2 rounded-lg font-semibold text-sm transition-all",
          theme === 'dark'
            ? "bg-brand-orange text-white shadow-glow-orange hover:shadow-glow-orange-strong"
            : "bg-brand-charcoal text-white shadow-lg hover:bg-black"
        )}>
          <Wallet size={16} />
          <span className="hidden md:inline">Connect</span>
        </button>
      </div>
    </nav>
  );
};