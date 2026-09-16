# AI Engineering Transcript & Design Decisions

## 1. Постановка задачи и анализ требований

**Компания:** ГК Калуга Астрал  
**Позиция:** Frontend разработчик (JavaScript/TypeScript + React) Middle  
**Формат задания:** 
- Часть 1: Теория (базовые знания JS & TypeScript, приведение типов, замыкания, this, асинхронность, дженерики, перегрузки).
- Часть 2: Практика (SPA на React + Redux Toolkit + TypeScript).

### Уровни выполнения:
- Выбран и реализован **Полный уровень**:
  - Все страницы (`/`, `/login`, `/cards`, `/profile`, `/theory`).
  - Разделы `/cards` и `/profile` закрыты за авторизацией (Protected Routes).
  - Строгая иерархия компонентов (`Page` -> `Header`, `Body`, `Footer`; `CardList` -> `Card`; `EditView` -> `Field`).
  - Данные Header и Footer прокидываются через `props`.
  - Форма профиля из 20 полей со всеми требуемыми типами (`string`, `number`, `text`, `date`, `select`, `checkbox-group`, `radio-group`).
  - Продвинутый уровень (Advanced Level): Реактивные зависимости полей формы:
    - При выборе в поле «А» (`employmentStatus`) значения `'looking_for_job'` («В активном поиске»):
      - Поле «Б» (`currentCompany` — текущая компания) автоматически скрывается.
      - Поле «В» (`noticePeriod` — срок отработки) переходит в режим read-only (disabled) и заполняется предустановленным значением `"0 дней (готов приступить немедленно)"`.
  - Интерактивные 3D карточки для изучения слов с двусторонней анимацией переворота (CSS 3D transform `rotateY`), озвучкой и отметкой изученного.

---

## 2. Архитектура и стек технологий

1. **Фреймворк и сборщик:** React 18 + TypeScript (Strict Mode) + Vite 5.
2. **Стейт-менеджмент:** Redux Toolkit (`@reduxjs/toolkit` + `react-redux`).
   - `authSlice`: сессия, пользователь, токен, ошибки валидации, сохранение в `localStorage`.
   - `cardsSlice`: колода слов, фильтрация по категориям, поиск, массив перевернутых карточек `flippedCardIds`.
   - `profileSlice`: данные 20 полей, сохранение, сброс к default, валидация.
3. **Стилизация:** Tailwind CSS (строгая нейтральная палитра в стиле GitHub Dark / Linear, без едких неоновых градиентов).
4. **Тестирование:** Vitest + React Testing Library + `@testing-library/jest-dom`.
   - 6 тест-сьютов, 15 тестов, проверяющих:
     - Отрисовку и переворот карточек (`Card`, `CardList`).
     - Обработку 20 полей и реактивных связей (`Field`, `EditView`).
     - Авторизацию и обработку некорректных данных (`LoginPage`).
     - Иерархию компонентов и проброс пропсов (`Page`).
5. **Контейнеризация:** Multi-stage `Dockerfile` (Node 22 build -> Nginx alpine runtime) + `docker-compose.yml`.

---

## 3. Этапы реализации

- [x] Инициализация проекта с поддержкой TypeScript strict mode и Vitest.
- [x] Реализация слоя данных и мок-API (`mockData.ts`, `mockApi.ts`) с асинхронными задержками и сохранением в localStorage.
- [x] Реализация Redux Toolkit хранилища и слайсов (`authSlice`, `cardsSlice`, `profileSlice`).
- [x] Реализация иерархии компонентов:
  - `Header` (пропсы фейкового профиля, навигация, статус авторизации).
  - `Footer` (пропсы фейковых контактов HR и офиса).
  - `Body` (контейнер полезной нагрузки).
  - `Page` (обертка страницы, прокидывающая пропсы).
  - `Card` (3D анимация переворота, произношение, мотивационные заголовки).
  - `CardList` (поиск, фильтрация, счетчик изученного).
  - `Field` (7 типов инпутов, поддержка состояний disabled/hidden/dependency notice).
  - `EditView` (резолвер связей полей, 20 полей, сохранение и сброс).
- [x] Реализация страниц и маршрутизации (`HomePage`, `LoginPage`, `CardsPage`, `ProfilePage`, `TheoryPage`, `ProtectedRoute`).
- [x] Написание исчерпывающих ответов на все теоретические вопросы ТЗ с интерактивным запуском `prompt` в браузере.
- [x] Написание модульных и интеграционных тестов (15/15 passed).
- [x] Создание `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `vercel.json`.
- [x] Подготовка подробного `README.md`.
