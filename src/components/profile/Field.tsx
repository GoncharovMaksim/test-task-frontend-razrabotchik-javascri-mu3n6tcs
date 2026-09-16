import React from 'react';
import { FieldDefinition, FormValue } from '../../types/profile';
import { Info, Lock, EyeOff } from 'lucide-react';

export interface FieldProps {
  definition: FieldDefinition;
  value: FormValue | undefined;
  onChange: (fieldName: string, value: FormValue) => void;
  isDisabled?: boolean;
  isHidden?: boolean;
  dependencyNotice?: string;
  error?: string;
}

export const Field: React.FC<FieldProps> = ({
  definition,
  value,
  onChange,
  isDisabled = false,
  isHidden = false,
  dependencyNotice,
  error,
}) => {
  if (isHidden) {
    return null;
  }

  const { id, name, label, type, placeholder, options = [], required, min, max, rows = 3, description } = definition;

  const renderInput = () => {
    switch (type) {
      case 'string':
        return (
          <input
            id={id}
            name={name}
            type="text"
            value={(value as string) ?? ''}
            placeholder={placeholder}
            disabled={isDisabled}
            required={required}
            onChange={(e) => onChange(name, e.target.value)}
            className={`w-full px-3 py-2 text-xs rounded-lg border bg-zinc-950 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 transition-colors ${
              isDisabled
                ? 'opacity-60 cursor-not-allowed border-zinc-800 bg-zinc-900/60'
                : 'border-zinc-800 focus:border-zinc-500 focus:ring-zinc-500'
            }`}
            data-testid={`field-input-${name}`}
          />
        );

      case 'number':
        return (
          <input
            id={id}
            name={name}
            type="number"
            value={value !== undefined ? String(value) : ''}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={isDisabled}
            required={required}
            onChange={(e) => {
              const val = e.target.value === '' ? '' : Number(e.target.value);
              onChange(name, val);
            }}
            className={`w-full px-3 py-2 text-xs rounded-lg border bg-zinc-950 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 transition-colors ${
              isDisabled
                ? 'opacity-60 cursor-not-allowed border-zinc-800 bg-zinc-900/60'
                : 'border-zinc-800 focus:border-zinc-500 focus:ring-zinc-500'
            }`}
            data-testid={`field-input-${name}`}
          />
        );

      case 'text':
        return (
          <textarea
            id={id}
            name={name}
            rows={rows}
            value={(value as string) ?? ''}
            placeholder={placeholder}
            disabled={isDisabled}
            required={required}
            onChange={(e) => onChange(name, e.target.value)}
            className={`w-full px-3 py-2 text-xs rounded-lg border bg-zinc-950 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 transition-colors resize-y ${
              isDisabled
                ? 'opacity-60 cursor-not-allowed border-zinc-800 bg-zinc-900/60'
                : 'border-zinc-800 focus:border-zinc-500 focus:ring-zinc-500'
            }`}
            data-testid={`field-input-${name}`}
          />
        );

      case 'date':
        return (
          <input
            id={id}
            name={name}
            type="date"
            value={(value as string) ?? ''}
            disabled={isDisabled}
            required={required}
            onChange={(e) => onChange(name, e.target.value)}
            className={`w-full px-3 py-2 text-xs rounded-lg border bg-zinc-950 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 transition-colors scheme-dark ${
              isDisabled
                ? 'opacity-60 cursor-not-allowed border-zinc-800 bg-zinc-900/60'
                : 'border-zinc-800 focus:border-zinc-500 focus:ring-zinc-500'
            }`}
            data-testid={`field-input-${name}`}
          />
        );

      case 'select':
        return (
          <select
            id={id}
            name={name}
            value={(value as string) ?? ''}
            disabled={isDisabled}
            required={required}
            onChange={(e) => onChange(name, e.target.value)}
            className={`w-full px-3 py-2 text-xs rounded-lg border bg-zinc-950 text-zinc-100 focus:outline-none focus:ring-1 transition-colors ${
              isDisabled
                ? 'opacity-60 cursor-not-allowed border-zinc-800 bg-zinc-900/60'
                : 'border-zinc-800 focus:border-zinc-500 focus:ring-zinc-500'
            }`}
            data-testid={`field-input-${name}`}
          >
            <option value="" disabled>
              -- Выберите вариант --
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox-group': {
        const currentArr = Array.isArray(value) ? (value as string[]) : [];
        const handleCheckboxToggle = (val: string) => {
          if (isDisabled) return;
          if (currentArr.includes(val)) {
            onChange(
              name,
              currentArr.filter((item) => item !== val)
            );
          } else {
            onChange(name, [...currentArr, val]);
          }
        };

        return (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1"
            data-testid={`field-input-${name}`}
          >
            {options.map((opt) => {
              const isChecked = currentArr.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                    isChecked
                      ? 'border-zinc-600 bg-zinc-900 text-zinc-100'
                      : 'border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-zinc-700'
                  } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleCheckboxToggle(opt.value)}
                    className="mt-0.5 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-0"
                  />
                  <span className="leading-tight">{opt.label}</span>
                </label>
              );
            })}
          </div>
        );
      }

      case 'radio-group':
        return (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1"
            data-testid={`field-input-${name}`}
          >
            {options.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-emerald-600/80 bg-emerald-950/20 text-zinc-100'
                      : 'border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-zinc-700'
                  } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="radio"
                    name={name}
                    value={opt.value}
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => onChange(name, opt.value)}
                    className="mt-0.5 border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-0"
                  />
                  <span className="leading-tight">{opt.label}</span>
                </label>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="space-y-1.5 p-3 rounded-lg border border-zinc-900 bg-zinc-900/40 hover:border-zinc-800 transition-colors"
      data-testid={`field-container-${name}`}
    >
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5"
        >
          <span>{label}</span>
          {required && <span className="text-red-400">*</span>}
          {isDisabled && (
            <span className="inline-flex items-center gap-1 text-[10px] font-normal text-amber-400 bg-amber-950/40 border border-amber-900/60 px-1.5 py-0.2 rounded">
              <Lock className="w-2.5 h-2.5" />
              Только для чтения
            </span>
          )}
        </label>
        <span className="text-[10px] font-mono text-zinc-400 uppercase">
          {type}
        </span>
      </div>

      {description && (
        <p className="text-[11px] text-zinc-400 leading-snug">{description}</p>
      )}

      {renderInput()}

      {dependencyNotice && (
        <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 bg-amber-950/20 border border-amber-900/30 px-2 py-1 rounded">
          <Info className="w-3 h-3 shrink-0" />
          <span>{dependencyNotice}</span>
        </div>
      )}

      {error && (
        <p className="text-[11px] text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
};
