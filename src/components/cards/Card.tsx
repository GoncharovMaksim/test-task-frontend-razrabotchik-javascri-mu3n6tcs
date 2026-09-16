import React from 'react';
import { CardItem } from '../../types/card';
import { RotateCw, CheckCircle2, Bookmark, Volume2, Sparkles, ArrowRight } from 'lucide-react';

export interface CardProps {
  card: CardItem;
  isFlipped: boolean;
  onToggleFlip: (id: string) => void;
  onToggleLearned?: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({
  card,
  isFlipped,
  onToggleFlip,
  onToggleLearned,
}) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFlip(card.id);
  };

  const handleLearnedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLearned?.(card.id);
  };

  const speakWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="w-full h-[360px] perspective-1000 select-none group"
      data-testid={`card-${card.id}`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ease-out transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl border border-zinc-800 bg-zinc-900/90 p-6 flex flex-col justify-between shadow-lg backface-hidden transition-colors hover:border-zinc-700"
          data-testid={`card-front-${card.id}`}
        >
          {/* Header with motivational phrase */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span data-testid="card-quote">{card.motivationalQuote}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {card.level}
                </span>
                {onToggleLearned && (
                  <button
                    onClick={handleLearnedClick}
                    title={card.isLearned ? 'Отмечено как изученное' : 'Отметить как изученное'}
                    className={`p-1 rounded transition-colors ${
                      card.isLearned
                        ? 'text-emerald-400 hover:text-emerald-300'
                        : 'text-zinc-400 hover:text-zinc-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Word & Phonetic */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <h3
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-white capitalize font-sans"
                  data-testid="card-word"
                >
                  {card.word}
                </h3>
                <button
                  onClick={speakWord}
                  title="Прослушать произношение"
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  aria-label={`Pronounce ${card.word}`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono text-zinc-400">{card.phonetic}</span>
                <span className="text-[11px] italic text-zinc-400">• {card.partOfSpeech}</span>
              </div>
            </div>

            {/* Example sentence */}
            <div className="mt-4 bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 block mb-1">
                Example in Context:
              </span>
              <p
                className="text-xs text-zinc-300 italic leading-relaxed"
                data-testid="card-example"
              >
                "{card.exampleSentence}"
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">{card.category}</span>
            <button
              onClick={handleButtonClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-950 hover:bg-white active:scale-95 transition-all shadow-sm"
              data-testid="card-action-btn"
            >
              <span>LEARN MORE</span>
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BACK SIDE (Translation & Detailed Definition) */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl border border-zinc-700 bg-zinc-900 p-6 flex flex-col justify-between shadow-lg backface-hidden rotate-y-180"
          data-testid={`card-back-${card.id}`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-sky-400 bg-sky-950/50 border border-sky-900/60 px-2 py-0.5 rounded">
                Русский перевод
              </span>
              <span className="text-xs font-mono text-zinc-400">{card.word}</span>
            </div>

            <div className="mt-4">
              <p
                className="text-xl sm:text-2xl font-bold text-zinc-100 leading-snug"
                data-testid="card-translation"
              >
                {card.translation}
              </p>
            </div>

            <div className="mt-4 bg-zinc-950/80 border border-zinc-800 rounded-lg p-3">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 block mb-1">
                Definition (EN):
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {card.definition}
              </p>
            </div>
          </div>

          {/* Action button to flip back */}
          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Кликните, чтобы вернуться</span>
            <button
              onClick={handleButtonClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all"
              data-testid="card-flip-back-btn"
            >
              <span>НА ЛИЦЕВУЮ</span>
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
