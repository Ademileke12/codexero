import React from 'react';
import { Check, X, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '../utils';
import { ThemeContextProps } from '../types';

interface QuizModalProps extends ThemeContextProps {
  // inherited
}

export const QuizModal: React.FC<QuizModalProps> = ({ 
  theme, 
  modules, 
  activeIndex, 
  setActiveIndex,
  quizState, 
  quizActions 
}) => {
  if (!quizState.isOpen) return null;

  const activeModule = modules[activeIndex];
  const question = activeModule.questions[quizState.currentQuestionIndex];
  
  // Theme specific styles
  const isDark = theme === 'dark';
  
  const bgClass = isDark ? "bg-[#0A0A0A]" : "bg-[#F8F9FA]";
  const borderClass = isDark ? "border-white/10" : "border-gray-200";
  const textClass = isDark ? "text-white" : "text-brand-charcoal";
  const subTextClass = isDark ? "text-gray-400" : "text-gray-600";
  
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      {/* Backdrop - slightly different for each side to maintain split aesthetic */}
      <div className={cn(
        "absolute inset-0 backdrop-blur-sm",
        isDark ? "bg-black/80" : "bg-white/60"
      )} />

      {/* Modal Content */}
      <div className={cn(
        "relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col",
        bgClass,
        borderClass,
        isDark ? "shadow-glow-orange" : "shadow-xl"
      )}>
        
        {/* Header */}
        <div className={cn("p-6 border-b flex justify-between items-center", borderClass)}>
          <div>
            <span className={cn("text-xs font-mono uppercase tracking-widest", isDark ? "text-brand-orange" : "text-brand-charcoal")}>
              Mission Checkpoint
            </span>
            <h3 className={cn("text-xl font-bold", textClass)}>
              {activeModule.title}
            </h3>
          </div>
          <button 
            onClick={quizActions.closeQuiz}
            className={cn("p-2 rounded-full hover:bg-opacity-10", isDark ? "hover:bg-white text-gray-400" : "hover:bg-black text-gray-500")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-8 flex-1 min-h-[300px] flex flex-col justify-center">
          
          {quizState.isCompleted ? (
            // Completion View
            <div className="text-center space-y-6">
              <div className={cn(
                "w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 animate-bounce",
                isDark ? "bg-brand-orange text-white shadow-glow-orange" : "bg-brand-charcoal text-white"
              )}>
                <Trophy size={40} />
              </div>
              <h2 className={cn("text-3xl font-bold", textClass)}>Mission Accomplished!</h2>
              <p className={subTextClass}>
                You've mastered the concepts of this module. Ready for the next challenge?
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <button 
                  onClick={quizActions.closeQuiz}
                  className={cn(
                    "px-6 py-3 rounded-xl font-bold border transition-colors",
                    isDark 
                      ? "border-white/20 hover:bg-white/10 text-white" 
                      : "border-black/10 hover:bg-gray-100 text-brand-charcoal"
                  )}
                >
                  Close
                </button>
                <button 
                   onClick={() => {
                     quizActions.closeQuiz();
                     if (activeIndex < modules.length - 1) {
                        // Small timeout to allow modal to close before sliding
                        setTimeout(() => setActiveIndex(activeIndex + 1), 300);
                     }
                   }}
                   className={cn(
                     "px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105",
                     isDark ? "bg-brand-orange shadow-glow-orange" : "bg-brand-charcoal"
                   )}
                >
                  Next Module
                </button>
              </div>
            </div>
          ) : (
            // Question View
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono uppercase opacity-50">
                  <span className={textClass}>Question {quizState.currentQuestionIndex + 1} of {activeModule.questions.length}</span>
                  <span className={textClass}>Knowledge Check</span>
                </div>
                <h4 className={cn("text-2xl font-medium leading-relaxed", textClass)}>
                  {question?.text}
                </h4>
              </div>

              <div className="space-y-3">
                {question?.options.map((option, idx) => {
                  const isSelected = quizState.selectedOption === idx;
                  const showResult = quizState.isCorrect !== null;
                  const isCorrectAnswer = idx === question.correctAnswer;
                  
                  let buttonStyle = isDark 
                    ? "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300" 
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700";
                  
                  if (isSelected) {
                     buttonStyle = isDark
                       ? "bg-brand-orange/20 border-brand-orange text-brand-orange"
                       : "bg-black/5 border-brand-charcoal text-brand-charcoal";
                  }

                  if (showResult) {
                    if (isCorrectAnswer) {
                      buttonStyle = "bg-green-500/20 border-green-500 text-green-500";
                    } else if (isSelected && !isCorrectAnswer) {
                      buttonStyle = "bg-red-500/20 border-red-500 text-red-500";
                    } else {
                      buttonStyle += " opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !showResult && quizActions.selectOption(idx)}
                      disabled={showResult}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group",
                        buttonStyle
                      )}
                    >
                      <span className="font-medium">{option}</span>
                      {showResult && isCorrectAnswer && <Check size={20} />}
                      {showResult && isSelected && !isCorrectAnswer && <X size={20} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!quizState.isCompleted && (
          <div className={cn("p-6 border-t flex justify-end gap-3", bgClass, borderClass)}>
             {quizState.isCorrect !== null ? (
               <button
                 onClick={quizActions.nextQuestion}
                 className={cn(
                   "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105",
                   isDark ? "bg-brand-orange shadow-glow-orange" : "bg-brand-charcoal shadow-lg"
                 )}
               >
                 {quizState.currentQuestionIndex < activeModule.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                 <ArrowRight size={18} />
               </button>
             ) : (
               <button
                 onClick={quizActions.submitAnswer}
                 disabled={quizState.selectedOption === null}
                 className={cn(
                   "px-8 py-3 rounded-xl font-bold transition-all",
                   quizState.selectedOption === null
                     ? "opacity-50 cursor-not-allowed bg-gray-500 text-white"
                     : isDark 
                        ? "bg-white text-black hover:bg-gray-200" 
                        : "bg-brand-charcoal text-white hover:bg-black"
                 )}
               >
                 Submit Answer
               </button>
             )}
          </div>
        )}
      </div>
    </div>
  );
};