export interface CardItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  motivationalQuote: string;
  exampleSentence: string;
  translation: string;
  definition: string;
  level: 'A1-A2' | 'B1-B2' | 'C1-C2';
  category: string;
  isLearned?: boolean;
}

export interface CardsState {
  items: CardItem[];
  isLoading: boolean;
  error: string | null;
  flippedCardIds: string[];
  searchQuery: string;
  selectedCategory: string;
}
