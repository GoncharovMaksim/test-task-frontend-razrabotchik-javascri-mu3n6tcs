import React, { useMemo, useState } from 'react';
import { CardItem } from '../../types/card';
import { Card } from './Card';
import { Search, Filter, RotateCcw, Check, Sparkles } from 'lucide-react';

export interface CardListProps {
  cards: CardItem[];
  flippedCardIds: string[];
  onToggleFlip: (id: string) => void;
  onToggleLearned?: (id: string) => void;
  onFlipAll?: () => void;
  onResetFlips?: () => void;
}

export const CardList: React.FC<CardListProps> = ({
  cards,
  flippedCardIds,
  onToggleFlip,
  onToggleLearned,
  onFlipAll,
  onResetFlips,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((c) => set.add(c.category));
    return ['all', ...Array.from(set)];
  }, [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        term === '' ||
        c.word.toLowerCase().includes(term) ||
        c.translation.toLowerCase().includes(term) ||
        c.exampleSentence.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [cards, selectedCategory, searchTerm]);

  const learnedCount = cards.filter((c) => c.isLearned).length;

  return (
    <div className="space-y-6" data-testid="card-list-container">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Поиск по слову, переводу или примеру..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
          />
        </div>

        {/* Filters and Counters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Select */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-2 text-zinc-300 focus:outline-none focus:border-zinc-600"
            >
              <option value="all">Все категории ({cards.length})</option>
              {categories
                .filter((cat) => cat !== 'all')
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          {/* Quick flip controls */}
          <div className="flex items-center gap-1.5">
            {onFlipAll && (
              <button
                onClick={onFlipAll}
                className="px-2.5 py-1.5 rounded text-xs font-medium border border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                title="Перевернуть все карточки на сторону перевода"
              >
                Перевернуть все
              </button>
            )}
            {onResetFlips && (
              <button
                onClick={onResetFlips}
                className="px-2.5 py-1.5 rounded text-xs font-medium border border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-1"
                title="Сбросить переворот всех карточек"
              >
                <RotateCcw className="w-3 h-3" />
                Сброс
              </button>
            )}
          </div>

          {/* Stats Badge */}
          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400">
            <span>Изучено:</span>
            <span className="text-emerald-400 font-bold">
              {learnedCount}/{cards.length}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
          <p className="text-zinc-400 text-sm">Карточки по вашему запросу не найдены.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs text-emerald-400 hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={flippedCardIds.includes(card.id)}
              onToggleFlip={onToggleFlip}
              onToggleLearned={onToggleLearned}
            />
          ))}
        </div>
      )}
    </div>
  );
};
