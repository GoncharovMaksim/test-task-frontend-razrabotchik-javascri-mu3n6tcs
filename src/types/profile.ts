export type FieldType =
  | 'string'
  | 'number'
  | 'text'
  | 'date'
  | 'select'
  | 'checkbox-group'
  | 'radio-group';

export interface FieldOption {
  label: string;
  value: string;
}

export type FormValue = string | number | string[] | boolean;

export interface FieldDependency {
  dependsOn: string;
  condition: (parentValue: FormValue | undefined) => boolean;
  effect: {
    hidden?: boolean;
    disabled?: boolean;
    presetValue?: FormValue;
  };
  explanation?: string;
}

export interface FieldDefinition {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldOption[];
  required?: boolean;
  min?: number;
  max?: number;
  rows?: number;
  description?: string;
  dependency?: FieldDependency;
}

export interface ProfileData {
  [key: string]: FormValue;
}

export interface ProfileState {
  data: ProfileData;
  isLoading: boolean;
  isSaving: boolean;
  saveSuccess: boolean;
  error: string | null;
}
