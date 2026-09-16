import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Page } from '../components/common/Page';
import { useAppDispatch, useAppSelector } from '../store';
import { loginUser, clearAuthError } from '../store/authSlice';
import { Lock, User, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  // If already authenticated, redirect to /cards
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/cards';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearAuthError());

    const resultAction = await dispatch(
      loginUser({
        login,
        password,
      })
    );

    if (loginUser.fulfilled.match(resultAction)) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/cards';
      navigate(from, { replace: true });
    }
  };

  const fillTestCredentials = () => {
    setLogin('admin');
    setPassword('admin');
    dispatch(clearAuthError());
  };

  return (
    <Page bodyClassName="flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="w-full max-w-md mx-auto" data-testid="login-container">
        <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl backdrop-blur-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-xl border border-zinc-700 bg-zinc-800 flex items-center justify-center text-zinc-100 mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Вход в личный кабинет
            </h1>
            <p className="text-xs text-zinc-400">
              Введите логин и пароль для доступа к разделам карточек и профиля
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              className="flex items-start gap-2.5 p-3.5 rounded-lg border border-red-900/60 bg-red-950/40 text-red-300 text-xs"
              data-testid="login-error-message"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{error}</p>
                <p className="text-[11px] text-red-400/80 mt-0.5">
                  Проверьте введенные учетные данные.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
            <div className="space-y-1.5">
              <label
                htmlFor="login-input"
                className="block text-xs font-semibold text-zinc-300"
              >
                Логин
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  id="login-input"
                  name="login"
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  placeholder="admin"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                  data-testid="login-username-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password-input"
                className="block text-xs font-semibold text-zinc-300"
              >
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                  data-testid="login-password-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white active:scale-95 transition-all shadow disabled:opacity-50"
              data-testid="login-submit-btn"
            >
              <span>{isLoading ? 'Авторизация...' : 'Войти'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick preset credentials button */}
          <div className="pt-2 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-mono">Тестовые данные:</span>
              <button
                type="button"
                onClick={fillTestCredentials}
                className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline font-medium"
                data-testid="fill-credentials-btn"
              >
                Подставить admin / admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
