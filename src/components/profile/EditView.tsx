import React, { useEffect, useMemo } from 'react';
import { FieldDefinition, FormValue, ProfileData } from '../../types/profile';
import { Field } from './Field';
import { Save, RotateCcw, CheckCircle2, Sliders, AlertCircle } from 'lucide-react';

export interface EditViewProps {
  fields: FieldDefinition[];
  values: ProfileData;
  onChange: (fieldName: string, value: FormValue) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  isSaving?: boolean;
  saveSuccess?: boolean;
  errorMessage?: string | null;
}

export const EditView: React.FC<EditViewProps> = ({
  fields,
  values,
  onChange,
  onSubmit,
  onReset,
  isSaving = false,
  saveSuccess = false,
  errorMessage = null,
}) => {
  // Reactive dynamic dependencies resolver
  useEffect(() => {
    fields.forEach((field) => {
      if (field.dependency) {
        const parentVal = values[field.dependency.dependsOn];
        const isTriggered = field.dependency.condition(parentVal);

        if (isTriggered && field.dependency.effect.presetValue !== undefined) {
          const currentVal = values[field.name];
          if (currentVal !== field.dependency.effect.presetValue) {
            onChange(field.name, field.dependency.effect.presetValue);
          }
        }
      }
    });
  }, [fields, values, onChange]);

  // Active dependencies stats for the UI
  const activeDependencyStats = useMemo(() => {
    return fields.filter((f) => {
      if (!f.dependency) return false;
      const parentVal = values[f.dependency.dependsOn];
      return f.dependency.condition(parentVal);
    });
  }, [fields, values]);

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
      data-testid="edit-view-form"
    >
      {/* Dependency Rules Explainer Bar */}
      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/70">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200 mb-1">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span>Реактивные связи полей (Advanced Level):</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
          В форме реализован механизм зависимостей: изменение поля «А» (например, <strong className="text-zinc-200">«Текущий статус занятости»</strong>) динамически скрывает поле «Б» (<strong className="text-zinc-200">«Текущая компания»</strong>) и блокирует поле «В» (<strong className="text-zinc-200">«Срок отработки»</strong>) с автоподстановкой предустановленного значения.
        </p>

        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="text-zinc-400">Активные динамические ограничения:</span>
          {activeDependencyStats.length === 0 ? (
            <span className="text-zinc-400 italic">нет активных ограничений</span>
          ) : (
            activeDependencyStats.map((f) => (
              <span
                key={f.id}
                className="bg-zinc-800 text-emerald-400 border border-zinc-700 px-2 py-0.5 rounded"
              >
                {f.label}: {f.dependency?.explanation}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div
          className="flex items-center gap-2 p-3 rounded-lg border border-emerald-900/60 bg-emerald-950/30 text-emerald-300 text-xs"
          data-testid="save-success-notification"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Профиль успешно сохранен в mock REST API / локальном хранилище!</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-red-900/60 bg-red-950/30 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 20 Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          let isHidden = false;
          let isDisabled = false;
          let notice: string | undefined = undefined;

          if (field.dependency) {
            const parentVal = values[field.dependency.dependsOn];
            const isTriggered = field.dependency.condition(parentVal);

            if (isTriggered) {
              if (field.dependency.effect.hidden) {
                isHidden = true;
              }
              if (field.dependency.effect.disabled) {
                isDisabled = true;
                notice = field.dependency.explanation;
              }
            }
          }

          return (
            <div
              key={field.id}
              className={field.type === 'text' || field.type === 'checkbox-group' ? 'md:col-span-2' : ''}
            >
              <Field
                definition={field}
                value={values[field.name]}
                onChange={onChange}
                isDisabled={isDisabled}
                isHidden={isHidden}
                dependencyNotice={notice}
              />
            </div>
          );
        })}
      </div>

      {/* Form Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          data-testid="reset-profile-btn"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Сбросить к значениям по умолчанию</span>
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-zinc-700 bg-zinc-100 text-xs font-semibold text-zinc-950 hover:bg-white active:scale-95 transition-all shadow disabled:opacity-50"
          data-testid="save-profile-btn"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Сохранение...' : 'Сохранить изменения профиля'}</span>
        </button>
      </div>
    </form>
  );
};
