import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { EditView } from '../components/profile/EditView';
import { PROFILE_FIELD_DEFINITIONS, INITIAL_PROFILE_DATA } from '../api/mockData';

describe('EditView Component', () => {
  it('renders all 20 profile fields initially', () => {
    const handleChange = vi.fn();
    const handleSubmit = vi.fn();
    const handleReset = vi.fn();

    render(
      <EditView
        fields={PROFILE_FIELD_DEFINITIONS}
        values={INITIAL_PROFILE_DATA}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    );

    expect(screen.getByTestId('edit-view-form')).toBeInTheDocument();
    expect(screen.getByTestId('field-input-firstName')).toHaveValue('Максим');
    expect(screen.getByTestId('field-input-lastName')).toHaveValue('Смирнов');
    expect(screen.getByTestId('field-input-age')).toHaveValue(27);
  });

  it('triggers dynamic dependency: when employmentStatus is looking_for_job, currentCompany is hidden and noticePeriod is disabled with preset value', () => {
    const handleChange = vi.fn();
    const handleSubmit = vi.fn();
    const handleReset = vi.fn();

    const dependentValues = {
      ...INITIAL_PROFILE_DATA,
      employmentStatus: 'looking_for_job',
    };

    render(
      <EditView
        fields={PROFILE_FIELD_DEFINITIONS}
        values={dependentValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    );

    // Field B (currentCompany) must be hidden
    expect(screen.queryByTestId('field-input-currentCompany')).not.toBeInTheDocument();

    // Field C (noticePeriod) must be disabled
    const noticeInput = screen.getByTestId('field-input-noticePeriod');
    expect(noticeInput).toBeDisabled();

    // handleChange must have been called to inject preset value
    expect(handleChange).toHaveBeenCalledWith(
      'noticePeriod',
      '0 дней (готов приступить немедленно)'
    );
  });
});
