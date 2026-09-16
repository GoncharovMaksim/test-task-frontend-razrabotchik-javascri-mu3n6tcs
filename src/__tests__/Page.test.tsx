import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Page } from '../components/common/Page';
import { store } from '../store';

describe('Page, Header and Footer Component Hierarchy', () => {
  it('renders Header with profile data and Footer with contact data passed via props', () => {
    const customProfile = {
      name: 'Тестовый Кандидат',
      login: 'test_candidate',
      role: 'Senior Frontend',
      email: 'candidate@example.com',
    };

    const customContacts = {
      company: 'Калуга Астрал Тест',
      contactPerson: 'HR Наталья',
      email: 'hr@test.astral.ru',
      phone: '8 (800) 111-22-33',
      address: 'Калуга, ул. Ленина 1',
      year: 2026,
      stack: 'React + TypeScript',
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Page headerProfile={customProfile} footerContacts={customContacts}>
            <div data-testid="test-content">Тестовая полезная нагрузка Body</div>
          </Page>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Калуга Астрал Тест')).toBeInTheDocument();
    expect(screen.getByText('HR Наталья')).toBeInTheDocument();
    expect(screen.getByText('8 (800) 111-22-33')).toBeInTheDocument();
  });
});
