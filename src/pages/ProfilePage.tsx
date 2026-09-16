import React, { useEffect } from 'react';
import { Page } from '../components/common/Page';
import { EditView } from '../components/profile/EditView';
import { PROFILE_FIELD_DEFINITIONS } from '../api/mockData';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchProfile,
  updateFieldValue,
  saveProfile,
  resetProfile,
  clearSaveNotification,
} from '../store/profileSlice';
import { FormValue } from '../types/profile';
import { UserCog, RefreshCw } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isSaving, saveSuccess, error } = useAppSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleFieldChange = (fieldName: string, value: FormValue) => {
    dispatch(updateFieldValue({ fieldName, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveProfile(data));
  };

  const handleReset = () => {
    if (window.confirm('Сбросить все поля формы к исходным значениям по умолчанию?')) {
      dispatch(resetProfile());
    }
  };

  return (
    <Page>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-sky-950/40 border border-sky-800/60 text-sky-400">
                <UserCog className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Редактирование профиля пользователя
              </h1>
            </div>
            <p className="text-xs text-zinc-400">
              Форма из 20 полей со сложными типами данных и реактивной связью зависимостей
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
              Полей: {PROFILE_FIELD_DEFINITIONS.length}
            </span>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <RefreshCw className="w-6 h-6 text-zinc-400 animate-spin" />
            <p className="text-xs text-zinc-400">Загрузка данных профиля...</p>
          </div>
        ) : (
          <EditView
            fields={PROFILE_FIELD_DEFINITIONS}
            values={data}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
            isSaving={isSaving}
            saveSuccess={saveSuccess}
            errorMessage={error}
          />
        )}
      </div>
    </Page>
  );
};
