import React from 'react';
import { cn } from '../utils';

interface FooterProps {
  theme: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const textColor = theme === 'dark' ? "text-gray-400" : "text-gray-600";
  const hoverColor = theme === 'dark' ? "hover:text-brand-orange" : "hover:text-brand-charcoal";
  const borderColor = theme === 'dark' ? "border-white/10" : "border-black/10";
  const bgColor = theme === 'dark' ? "bg-black" : "bg-gray-100";

  return (
    <footer className={cn("w-full py-16 px-8 relative z-20", bgColor)}>
      <div className={cn("max-w-7xl mx-auto border-t pt-12 flex flex-col md:flex-row justify-between gap-12", borderColor)}>
        
        {/* Brand */}
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-brand-orange flex items-center justify-center font-bold text-white">
              C
            </div>
            <span className={cn("font-bold text-xl", theme === 'dark' ? "text-white" : "text-brand-charcoal")}>
              CodeXero
            </span>
          </div>
          <p className={cn("text-sm leading-relaxed", textColor)}>
            Empowering the next generation of Web3 builders with no-code tools, decentralized infrastructure, and community governance.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className={cn("font-bold mb-4", theme === 'dark' ? "text-white" : "text-black")}>Platform</h4>
            <ul className="space-y-2 text-sm">
              {['Learning Path', 'Dashboard', 'Templates', 'Security'].map(item => (
                <li key={item}><a href="#" className={cn("transition-colors", textColor, hoverColor)}>{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={cn("font-bold mb-4", theme === 'dark' ? "text-white" : "text-black")}>Community</h4>
            <ul className="space-y-2 text-sm">
              {['Discord', 'Twitter', 'Governance', 'Events'].map(item => (
                <li key={item}><a href="#" className={cn("transition-colors", textColor, hoverColor)}>{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={cn("font-bold mb-4", theme === 'dark' ? "text-white" : "text-black")}>Legal</h4>
            <ul className="space-y-2 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <li key={item}><a href="#" className={cn("transition-colors", textColor, hoverColor)}>{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-inherit flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
        <p className={textColor}>© 2024 CodeXero Academy. All rights reserved.</p>
        <p className={textColor}>Built for the decentralized future.</p>
      </div>
      
      {/* Padding for fixed timeline */}
      <div className="h-20" />
    </footer>
  );
};