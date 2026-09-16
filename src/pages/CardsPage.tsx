import React, { useEffect } from 'react';
import { Page } from '../components/common/Page';
import { CardList } from '../components/cards/CardList';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchCards,
  toggleCardFlip,
  toggleCardLearnedStatus,
  flipAllCards,
  resetAllFlips,
} from '../store/cardsSlice';
import { BookOpen, Sparkles, RefreshCw } from 'lucide-react';

export const CardsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, flippedCardIds } = useAppSelector(
    (state) => state.cards
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchCards());
    }
  }, [dispatch, items.length]);

  const handleToggleFlip = (cardId: string) => {
    dispatch(toggleCardFlip(cardId));
  };

  const handleToggleLearned = (cardId: string) => {
    dispatch(toggleCardLearnedStatus(cardId));
  };

  const handleFlipAll = () => {
    dispatch(flipAllCards());
  };

  const handleResetFlips = () => {
    dispatch(resetAllFlips());
  };

  return (
    <Page>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-400">
                <BookOpen className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Карточки для изучения иностранных слов
              </h1>
            </div>
            <p className="text-xs text-zinc-400">
              Интерактивная колода: мотивационный заголовок, слово, контекст использования и переворот по клику
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(fetchCards())}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Обновить данные</span>
            </button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <RefreshCw className="w-6 h-6 text-zinc-400 animate-spin" />
            <p className="text-xs text-zinc-400">Загрузка карточек из mock API...</p>
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl border border-red-900/60 bg-red-950/40 text-red-300 text-xs">
            {error}
          </div>
        ) : (
          <CardList
            cards={items}
            flippedCardIds={flippedCardIds}
            onToggleFlip={handleToggleFlip}
            onToggleLearned={handleToggleLearned}
            onFlipAll={handleFlipAll}
            onResetFlips={handleResetFlips}
          />
        )}
      </div>
    </Page>
  );
};
