import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../components/common/Page';
import { BookOpen, User, ShieldCheck, Cpu, ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAppSelector } from '../store';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Page>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center py-10 sm:py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>ГК Калуга Астрал • Тестовое задание Frontend Middle</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Интерактивная SPA-платформа для изучения иностранных слов
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Полнофункциональное Single Page Application на стеке React, Redux Toolkit и строгом TypeScript. Включает 3D флип-карточки слов, форму профиля из 20 полей со сложными зависимостями и закрытые разделы.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to={isAuthenticated ? '/cards' : '/login'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-white transition-all shadow-sm active:scale-95"
            >
              <span>{isAuthenticated ? 'Перейти к карточкам' : 'Войти и начать обучение'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/theory"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-200 font-medium text-xs sm:text-sm hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <span>Ответы на теорию (JS & TS)</span>
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 3D Flashcards */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg border border-zinc-700 bg-zinc-800 flex items-center justify-center text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100">
                3D Карточки слов (/cards)
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Случайные мотивирующие фразы, контекстные примеры употребления, озвучка и плавная CSS 3D анимация переворота для проверки перевода.
              </p>
            </div>
            <Link
              to="/cards"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white pt-2 border-t border-zinc-800/80"
            >
              <span>Открыть карточки</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: 20-Field Profile with Dependencies */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg border border-zinc-700 bg-zinc-800 flex items-center justify-center text-sky-400">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100">
                Форма профиля 20 полей (/profile)
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Все обязательные типы (число, строка, текст, дата, select, checkbox-группа, radio-группа) и продвинутый резолвер зависимостей полей.
              </p>
            </div>
            <Link
              to="/profile"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white pt-2 border-t border-zinc-800/80"
            >
              <span>Редактировать профиль</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Auth & Protected Routes */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg border border-zinc-700 bg-zinc-800 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100">
                Авторизация (/login)
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Центрированная форма входа, валидация admin/admin, обработка ошибок, защищенные роуты (Protected Routes) и персистентность сессии.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white pt-2 border-t border-zinc-800/80"
            >
              <span>{isAuthenticated ? 'Статус: Авторизован' : 'Перейти ко входу'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Architecture Checklist Section */}
        <section className="p-6 sm:p-8 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-4">
          <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Соответствие обязательным требованиям ТЗ Калуга Астрал:</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Иерархия компонентов: Page → Header, Body, Footer; CardList → Card; EditView → Field</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Данные профиля в Header и контакты в Footer строго прокидываются через пропсы</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Управление состоянием: Redux Toolkit + функциональный React.useState</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Все данные замоканы через типизированный сервис Mock API (localStorage + асинхронные вызовы)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Продвинутый уровень: связь полей «А» → «Б» скрывается, «В» блокируется и предустанавливается</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Полный уровень реализации: все разделы, авторизация, карточки и профиль</span>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};
