import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Content } from './components/Content';
import { Timeline } from './components/Timeline';
import { QuizModal } from './components/QuizModal';
import { TypingGameModal } from './components/TypingGameModal';
import { MODULES } from './constants';
import { QuizState, ViewMode } from './types';

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isMobile, setIsMobile] = useState(false);
  const [typingGameOpen, setTypingGameOpen] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  
  // Quiz State
  const [quizState, setQuizState] = useState<QuizState>({
    isOpen: false,
    currentQuestionIndex: 0,
    selectedOption: null,
    isCorrect: null,
    isCompleted: false
  });

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update view mode based on mobile state if needed
  useEffect(() => {
    if (isMobile && viewMode === 'split') {
      // Default to dark on mobile if split was selected
      setViewMode('dark');
    } else if (!isMobile && viewMode === 'dark' && !localStorage.getItem('userPref')) {
      // Optional: Auto restore split on desktop if no user preference (simplified here)
      setViewMode('split');
    }
  }, [isMobile]);

  // Generate Background Image
  useEffect(() => {
    const generateHeroImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: "A majestic futuristic character floating in the sky wearing a glowing neon orange crown, centered composition, cyberpunk fantasy style, high fidelity, 8k resolution, cinematic lighting, volumetric clouds" }]
          },
          config: {
             imageConfig: { aspectRatio: "16:9" }
          }
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              setHeroImage(`data:image/png;base64,${part.inlineData.data}`);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Failed to generate hero image:", error);
      }
    };

    generateHeroImage();
  }, []);

  const quizActions = {
    openQuiz: () => {
      setQuizState({
        isOpen: true,
        currentQuestionIndex: 0,
        selectedOption: null,
        isCorrect: null,
        isCompleted: false
      });
    },
    closeQuiz: () => {
      setQuizState(prev => ({ ...prev, isOpen: false }));
    },
    selectOption: (index: number) => {
      setQuizState(prev => ({ ...prev, selectedOption: index }));
    },
    submitAnswer: () => {
      const currentModule = MODULES[activeIndex];
      const currentQuestion = currentModule.questions[quizState.currentQuestionIndex];
      const isCorrect = quizState.selectedOption === currentQuestion.correctAnswer;
      
      setQuizState(prev => ({ ...prev, isCorrect }));
    },
    nextQuestion: () => {
      const currentModule = MODULES[activeIndex];
      const nextIndex = quizState.currentQuestionIndex + 1;
      
      if (nextIndex < currentModule.questions.length) {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: nextIndex,
          selectedOption: null,
          isCorrect: null
        }));
      } else {
        setQuizState(prev => ({ ...prev, isCompleted: true }));
      }
    }
  };

  const typingGameActions = {
    openGame: () => setTypingGameOpen(true),
    closeGame: () => setTypingGameOpen(false)
  };

  const contentProps = {
    activeIndex,
    setActiveIndex,
    modules: MODULES,
    quizState,
    quizActions,
    viewMode,
    setViewMode,
    typingGameActions,
    isTypingGameOpen: typingGameOpen,
    closeTypingGame: typingGameActions.closeGame,
    heroImage
  };

  // --- Animation Logic for Split Background ---
  
  // Light Layer Clip Path Configuration
  // Split: Show right half (50% -> 100%)
  // Dark Mode: Show nothing (100% -> 100%) -> reveals Dark Layer underneath
  // Light Mode: Show all (0% -> 100%)
  let lightClipPath = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
  if (viewMode === 'dark') lightClipPath = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)';
  if (viewMode === 'light') lightClipPath = 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)';

  // Divider Line Position
  let splitLineLeft = '50%';
  let splitLineOpacity = 1;
  if (viewMode === 'dark') {
    splitLineLeft = '100%';
    splitLineOpacity = 0;
  }
  if (viewMode === 'light') {
    splitLineLeft = '0%';
    splitLineOpacity = 0;
  }

  // Common Transition Styles
  const transitionStyle = {
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-dark overflow-hidden">
      
      {/* --- SCROLLABLE CONTENT LAYERS --- */}

      {/* Layer 1: Dark Mode (Base Layer, always full width, covered by Light Layer) */}
      <div 
        className="relative z-0 dark bg-brand-dark text-white w-full h-full"
      >
        <Content theme="dark" {...contentProps} />
      </div>

      {/* Layer 2: Light Mode (Top Layer, clipped) */}
      <div 
        className="absolute inset-0 z-10 bg-brand-light text-brand-charcoal overflow-hidden"
        style={{
          clipPath: lightClipPath,
          ...transitionStyle
        }}
      >
        <Content theme="light" {...contentProps} />
      </div>

      {/* --- FIXED UI LAYERS (Timelines & Modals) --- */}

      {/* Fixed Layer 1: Dark (Visible when Light layer is clipped away) */}
      <div 
        className="fixed inset-0 z-40 pointer-events-none"
      >
        <div className={viewMode === 'light' ? 'opacity-0' : 'opacity-100'} style={transitionStyle}>
           <Timeline modules={MODULES} activeIndex={activeIndex} setActiveIndex={setActiveIndex} theme="dark" />
           <QuizModal theme="dark" {...contentProps} />
           <TypingGameModal isOpen={typingGameOpen} onClose={typingGameActions.closeGame} theme="dark" />
        </div>
      </div>

      {/* Fixed Layer 2: Light (Visible when Light layer covers screen) */}
      {/* We clip this fixed layer exactly like the content layer so the UI elements transform with the split */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          clipPath: lightClipPath,
          ...transitionStyle
        }}
      >
         <Timeline modules={MODULES} activeIndex={activeIndex} setActiveIndex={setActiveIndex} theme="light" />
         <QuizModal theme="light" {...contentProps} />
         <TypingGameModal isOpen={typingGameOpen} onClose={typingGameActions.closeGame} theme="light" />
      </div>

      {/* Split Line Divider */}
      {!isMobile && (
        <div 
          className="fixed inset-y-0 w-px bg-white/20 z-[60] pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          style={{
            left: splitLineLeft,
            opacity: splitLineOpacity,
            ...transitionStyle
          }}
        />
      )}

    </div>
  );
};

export default App;