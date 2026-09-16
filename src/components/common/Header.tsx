import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User as UserIcon, LogOut, LogIn, Menu, X, Shield, FileText } from 'lucide-react';

export interface HeaderProfileProps {
  name: string;
  login: string;
  role: string;
  email: string;
  city?: string;
  avatarUrl?: string;
}

export interface HeaderProps {
  profile: HeaderProfileProps;
  isAuthenticated: boolean;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  isAuthenticated,
  onLogout,
}) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Карточки', path: '/cards' },
    { label: 'Профиль', path: '/profile' },
    { label: 'Теория JS/TS', path: '/theory' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 font-mono text-sm font-bold text-zinc-100 transition-colors group-hover:border-zinc-500">
              KA
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight leading-none text-zinc-100">
                Калуга Астрал
              </span>
              <span className="text-xs font-mono text-zinc-400 leading-tight">
                English Cards SPA
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    active
                      ? 'bg-zinc-800 text-zinc-100 font-semibold'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side: Fake profile & Auth buttons */}
        <div className="hidden sm:flex sm:items-center sm:gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 border-r border-zinc-800 pr-4">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-medium text-zinc-300">
                  {profile.name.charAt(0)}
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-zinc-200">
                      {profile.name}
                    </span>
                    <span className="rounded bg-zinc-800 px-1 py-0.2 text-[10px] font-mono text-zinc-400">
                      @{profile.login}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    {profile.role}
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white transition-colors"
                title="Выйти из системы"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Выйти</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Гостевой режим</span>
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-900 hover:bg-white transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Войти</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(item.path)
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-800">
            {isAuthenticated ? (
              <div className="flex items-center justify-between py-1">
                <div className="text-xs">
                  <p className="font-medium text-zinc-200">{profile.name}</p>
                  <p className="text-zinc-400">{profile.email}</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout?.();
                  }}
                  className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-800"
                >
                  <LogOut className="h-3 w-3" />
                  Выйти
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center rounded bg-zinc-100 text-zinc-900 font-medium py-1.5 text-xs"
              >
                Войти в систему
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
