import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CardItem, CardsState } from '../types/card';
import { mockCardsApi } from '../api/mockApi';

const initialState: CardsState = {
  items: [],
  isLoading: false,
  error: null,
  flippedCardIds: [],
  searchQuery: '',
  selectedCategory: 'all',
};

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const cards = await mockCardsApi.getCards();
  return cards;
});

export const toggleCardLearnedStatus = createAsyncThunk(
  'cards/toggleLearnedStatus',
  async (cardId: string) => {
    const updated = await mockCardsApi.toggleLearned(cardId);
    return updated;
  }
);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleCardFlip: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.flippedCardIds.includes(id)) {
        state.flippedCardIds = state.flippedCardIds.filter((item) => item !== id);
      } else {
        state.flippedCardIds.push(id);
      }
    },
    resetAllFlips: (state) => {
      state.flippedCardIds = [];
    },
    flipAllCards: (state) => {
      state.flippedCardIds = state.items.map((c) => c.id);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<CardItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить карточки';
      })
      .addCase(toggleCardLearnedStatus.fulfilled, (state, action: PayloadAction<CardItem[]>) => {
        state.items = action.payload;
      });
  },
});

export const {
  toggleCardFlip,
  resetAllFlips,
  flipAllCards,
  setSearchQuery,
  setSelectedCategory,
} = cardsSlice.actions;

export default cardsSlice.reducer;
