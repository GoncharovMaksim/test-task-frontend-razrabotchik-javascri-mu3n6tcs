import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CardList } from '../components/cards/CardList';
import { CardItem } from '../types/card';

const mockCards: CardItem[] = [
  {
    id: 'c-1',
    word: 'resilient',
    phonetic: '/rɪˈzɪl.jənt/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Daily Boost',
    exampleSentence: 'Cloud systems are resilient.',
    translation: 'устойчивый',
    definition: 'Able to recover quickly.',
    level: 'B1-B2',
    category: 'Engineering',
    isLearned: true,
  },
  {
    id: 'c-2',
    word: 'ephemeral',
    phonetic: '/ɪˈfem.ər.əl/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Insight',
    exampleSentence: 'Ephemeral containers.',
    translation: 'мимолётный',
    definition: 'Lasting for a short time.',
    level: 'C1-C2',
    category: 'Time',
    isLearned: false,
  },
];

describe('CardList Component', () => {
  it('renders all cards passed via props', () => {
    const handleToggleFlip = vi.fn();
    render(
      <CardList
        cards={mockCards}
        flippedCardIds={[]}
        onToggleFlip={handleToggleFlip}
      />
    );

    expect(screen.getByTestId('card-c-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-c-2')).toBeInTheDocument();
    expect(screen.getAllByText('resilient').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ephemeral').length).toBeGreaterThan(0);
    expect(screen.getByText('Изучено:')).toBeInTheDocument();
  });

  it('filters cards by search term', () => {
    const handleToggleFlip = vi.fn();
    render(
      <CardList
        cards={mockCards}
        flippedCardIds={[]}
        onToggleFlip={handleToggleFlip}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Поиск по слову/i);
    fireEvent.change(searchInput, { target: { value: 'мимолётный' } });

    expect(screen.queryByTestId('card-c-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('card-c-2')).toBeInTheDocument();
  });
});
