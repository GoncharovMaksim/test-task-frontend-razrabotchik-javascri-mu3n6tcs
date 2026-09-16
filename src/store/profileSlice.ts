import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormValue, ProfileData, ProfileState } from '../types/profile';
import { mockProfileApi } from '../api/mockApi';
import { INITIAL_PROFILE_DATA } from '../api/mockData';

const initialState: ProfileState = {
  data: INITIAL_PROFILE_DATA,
  isLoading: false,
  isSaving: false,
  saveSuccess: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  const data = await mockProfileApi.getProfile();
  return data;
});

export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async (newData: ProfileData) => {
    const data = await mockProfileApi.updateProfile(newData);
    return data;
  }
);

export const resetProfile = createAsyncThunk('profile/resetProfile', async () => {
  const data = await mockProfileApi.resetProfile();
  return data;
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateFieldValue: (
      state,
      action: PayloadAction<{ fieldName: string; value: FormValue }>
    ) => {
      const { fieldName, value } = action.payload;
      state.data[fieldName] = value;
      state.saveSuccess = false;
    },
    clearSaveNotification: (state) => {
      state.saveSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<ProfileData>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки профиля';
      })
      // Save
      .addCase(saveProfile.pending, (state) => {
        state.isSaving = true;
        state.saveSuccess = false;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action: PayloadAction<ProfileData>) => {
        state.isSaving = false;
        state.saveSuccess = true;
        state.data = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || 'Ошибка сохранения данных';
      })
      // Reset
      .addCase(resetProfile.fulfilled, (state, action: PayloadAction<ProfileData>) => {
        state.data = action.payload;
        state.saveSuccess = false;
      });
  },
});

export const { updateFieldValue, clearSaveNotification } = profileSlice.actions;
export default profileSlice.reducer;
