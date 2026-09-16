import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Card } from '../components/cards/Card';
import { CardItem } from '../types/card';

const mockCard: CardItem = {
  id: 'test-card-1',
  word: 'benevolent',
  phonetic: '/bəˈnev.əl.ənt/',
  partOfSpeech: 'adjective',
  motivationalQuote: 'Word of the Day',
  exampleSentence: 'A benevolent smile spread across the mentor’s face.',
  translation: 'великодушный, доброжелательный',
  definition: 'Kind, generous, and helpful to other people.',
  level: 'B1-B2',
  category: 'Personality & Emotion',
  isLearned: false,
};

describe('Card Component', () => {
  it('renders all required card props on the front side', () => {
    const handleToggleFlip = vi.fn();
    render(<Card card={mockCard} isFlipped={false} onToggleFlip={handleToggleFlip} />);

    expect(screen.getByTestId('card-quote')).toHaveTextContent('Word of the Day');
    expect(screen.getByTestId('card-word')).toHaveTextContent('benevolent');
    expect(screen.getByTestId('card-example')).toHaveTextContent(
      'A benevolent smile spread across the mentor’s face.'
    );
    expect(screen.getByTestId('card-action-btn')).toHaveTextContent('LEARN MORE');
  });

  it('triggers onToggleFlip when clicking action button', () => {
    const handleToggleFlip = vi.fn();
    render(<Card card={mockCard} isFlipped={false} onToggleFlip={handleToggleFlip} />);

    const actionButton = screen.getByTestId('card-action-btn');
    fireEvent.click(actionButton);

    expect(handleToggleFlip).toHaveBeenCalledWith('test-card-1');
  });

  it('displays translation and definition on the back side when isFlipped is true', () => {
    const handleToggleFlip = vi.fn();
    render(<Card card={mockCard} isFlipped={true} onToggleFlip={handleToggleFlip} />);

    expect(screen.getByTestId('card-translation')).toHaveTextContent(
      'великодушный, доброжелательный'
    );
    expect(screen.getByText('Kind, generous, and helpful to other people.')).toBeInTheDocument();

    const flipBackBtn = screen.getByTestId('card-flip-back-btn');
    expect(flipBackBtn).toHaveTextContent('НА ЛИЦЕВУЮ');
    fireEvent.click(flipBackBtn);
    expect(handleToggleFlip).toHaveBeenCalledWith('test-card-1');
  });
});
