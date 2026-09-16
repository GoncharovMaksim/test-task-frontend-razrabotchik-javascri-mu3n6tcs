import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { store } from '../store';

describe('LoginPage Component', () => {
  it('renders login and password inputs and centered card', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('login-container')).toBeInTheDocument();
    expect(screen.getByTestId('login-username-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toHaveTextContent('Войти');
  });

  it('shows error message when entering invalid credentials', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const userInput = screen.getByTestId('login-username-input');
    const passInput = screen.getByTestId('login-password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');

    fireEvent.change(userInput, { target: { value: 'wronguser' } });
    fireEvent.change(passInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId('login-error-message')).toHaveTextContent(
        'Вход невозможен – неправильные логин или пароль'
      );
    });
  });
});
