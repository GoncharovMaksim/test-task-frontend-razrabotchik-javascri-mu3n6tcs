import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Field } from '../components/profile/Field';
import { FieldDefinition } from '../types/profile';

describe('Field Component', () => {
  it('renders string input and handles change', () => {
    const handleChange = vi.fn();
    const def: FieldDefinition = {
      id: 'f-1',
      name: 'firstName',
      label: 'Имя',
      type: 'string',
      placeholder: 'Введите имя',
    };

    render(
      <Field definition={def} value="Максим" onChange={handleChange} />
    );

    const input = screen.getByTestId('field-input-firstName');
    expect(input).toHaveValue('Максим');

    fireEvent.change(input, { target: { value: 'Александр' } });
    expect(handleChange).toHaveBeenCalledWith('firstName', 'Александр');
  });

  it('renders number input and handles number change', () => {
    const handleChange = vi.fn();
    const def: FieldDefinition = {
      id: 'f-2',
      name: 'age',
      label: 'Возраст',
      type: 'number',
    };

    render(<Field definition={def} value={27} onChange={handleChange} />);

    const input = screen.getByTestId('field-input-age');
    expect(input).toHaveValue(27);

    fireEvent.change(input, { target: { value: '28' } });
    expect(handleChange).toHaveBeenCalledWith('age', 28);
  });

  it('renders select input with options', () => {
    const handleChange = vi.fn();
    const def: FieldDefinition = {
      id: 'f-3',
      name: 'englishLevel',
      label: 'Уровень английского',
      type: 'select',
      options: [
        { label: 'B1', value: 'B1' },
        { label: 'B2', value: 'B2' },
      ],
    };

    render(<Field definition={def} value="B2" onChange={handleChange} />);

    const select = screen.getByTestId('field-input-englishLevel');
    expect(select).toHaveValue('B2');
  });

  it('renders disabled state with badge', () => {
    const def: FieldDefinition = {
      id: 'f-4',
      name: 'noticePeriod',
      label: 'Срок отработки',
      type: 'string',
    };

    render(
      <Field
        definition={def}
        value="0 дней"
        onChange={vi.fn()}
        isDisabled={true}
        dependencyNotice="Заблокировано зависимостью"
      />
    );

    const input = screen.getByTestId('field-input-noticePeriod');
    expect(input).toBeDisabled();
    expect(screen.getByText('Только для чтения')).toBeInTheDocument();
    expect(screen.getByText('Заблокировано зависимостью')).toBeInTheDocument();
  });

  it('returns null when isHidden is true', () => {
    const def: FieldDefinition = {
      id: 'f-5',
      name: 'currentCompany',
      label: 'Компания',
      type: 'string',
    };

    const { container } = render(
      <Field
        definition={def}
        value="Астрал"
        onChange={vi.fn()}
        isHidden={true}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
