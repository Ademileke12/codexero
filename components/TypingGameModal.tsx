import React, { useState, useEffect, useRef } from 'react';
import { X, RefreshCw, Terminal, Trophy, Timer } from 'lucide-react';
import { cn } from '../utils';

interface TypingGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

const SNIPPETS = [
  "const provider = new ethers.providers.Web3Provider(window.ethereum);",
  "await contract.mint(address, amount, { value: parseEther('0.1') });",
  "function withdraw() public onlyOwner { (bool s, ) = owner.call{value: address(this).balance}(''); require(s); }",
  "useEffect(() => { if (active) connectWallet(); }, [active]);",
  "const balance = await token.balanceOf(userAddress);",
  "import { useState, useEffect } from 'react';",
  "export default function App() { return <Component />; }"
];

export const TypingGameModal: React.FC<TypingGameModalProps> = ({ isOpen, onClose, theme }) => {
  const [snippet, setSnippet] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Theme styling
  const isDark = theme === 'dark';
  const bgClass = isDark ? "bg-[#0A0A0A]" : "bg-white";
  const textClass = isDark ? "text-white" : "text-gray-900";
  const borderClass = isDark ? "border-white/10" : "border-gray-200";

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen]);

  const resetGame = () => {
    setSnippet(SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setIsCompleted(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (val === snippet) {
      const timeSpent = (Date.now() - (startTime || Date.now())) / 1000 / 60; // in minutes
      const wordCount = snippet.split(" ").length;
      setWpm(Math.round(wordCount / timeSpent));
      setIsCompleted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/50 pointer-events-auto">
      <div className={cn(
        "w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col relative",
        bgClass, borderClass,
        isDark ? "shadow-glow-orange" : "shadow-xl"
      )}>
        
        {/* Header */}
        <div className={cn("p-4 border-b flex justify-between items-center", borderClass)}>
           <div className="flex items-center gap-2">
             <Terminal size={18} className={isDark ? "text-brand-orange" : "text-brand-charcoal"} />
             <span className={cn("font-mono font-bold", textClass)}>Speed Coder v1.0</span>
           </div>
           <button onClick={onClose} className="p-2 hover:opacity-70"><X size={20} className={textClass}/></button>
        </div>

        {/* Game Area */}
        <div className="p-8 flex flex-col gap-8 min-h-[300px] justify-center items-center text-center">
          
          {isCompleted ? (
            <div className="animate-in zoom-in duration-300 flex flex-col items-center">
              <div className="w-20 h-20 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mb-4">
                <Trophy size={40} />
              </div>
              <h2 className={cn("text-4xl font-bold mb-2", textClass)}>{wpm} WPM</h2>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>Excellent coding speed, Architect.</p>
              
              <button 
                onClick={resetGame}
                className={cn(
                  "mt-6 flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all",
                  isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                )}
              >
                <RefreshCw size={16} /> Play Again
              </button>
            </div>
          ) : (
            <>
              <div className="w-full text-left space-y-4">
                <div className={cn("font-mono text-xs uppercase tracking-widest", isDark ? "text-gray-500" : "text-gray-400")}>
                  Type the code snippet below:
                </div>
                <div className={cn(
                  "font-mono text-lg md:text-xl p-6 rounded-xl border leading-relaxed break-all select-none relative",
                  isDark ? "bg-black/50 border-white/10 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-500"
                )}>
                  {snippet.split('').map((char, index) => {
                    let colorClass = "";
                    if (index < input.length) {
                      colorClass = input[index] === char 
                        ? (isDark ? "text-green-400" : "text-green-600") 
                        : (isDark ? "text-red-500 bg-red-500/20" : "text-red-500 bg-red-100");
                    }
                    return <span key={index} className={colorClass}>{char}</span>;
                  })}
                </div>
              </div>

              <div className="w-full relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-transparent border-b-2 font-mono text-lg md:text-xl py-2 focus:outline-none transition-colors",
                    isDark 
                      ? "border-gray-700 focus:border-brand-orange text-white placeholder-gray-700" 
                      : "border-gray-300 focus:border-brand-charcoal text-black placeholder-gray-300"
                  )}
                  placeholder="Start typing..."
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                <div className="absolute right-0 top-3">
                   {startTime && !isCompleted && <Timer size={16} className="animate-pulse opacity-50 text-current" />}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};