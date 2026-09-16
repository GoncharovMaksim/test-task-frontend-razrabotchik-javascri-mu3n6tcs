import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code2, Play, CheckCircle2 } from 'lucide-react';

interface TheoryItem {
  id: string;
  category: 'JS' | 'TypeScript';
  question: string;
  answer: React.ReactNode;
  hasInteractiveDemo?: boolean;
}

export const TheoryAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([
    'strict-mode',
    'comparisons',
    'callbacks-prompt',
    'this-context',
    'generics',
    'interface-vs-type'
  ]);
  const [demoOutput, setDemoOutput] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Callback confirmation demo using standard prompt as required by TZ
  const runConfirmCallbackDemo = () => {
    const confirmAction = (
      question: string,
      onConfirm: () => void,
      onCancel: () => void
    ) => {
      const response = window.prompt(`${question}\n(Введите "да" или "yes" для подтверждения):`);
      if (response !== null && ['да', 'yes', 'y', '1'].includes(response.trim().toLowerCase())) {
        onConfirm();
      } else {
        onCancel();
      }
    };

    confirmAction(
      'Вы точно хотите удалить выбранный элемент из системы?',
      () => {
        setDemoOutput('Действие ПОДТВЕРЖДЕНО пользователем (вызван onConfirm)');
      },
      () => {
        setDemoOutput('Действие ОТКЛОНЕНО или отменено пользователем (вызван onCancel)');
      }
    );
  };

  const theoryData: TheoryItem[] = [
    {
      id: 'strict-mode',
      category: 'JS',
      question: 'Что такое «строгий режим» ("use strict")? Для чего он нужен?',
      answer: (
        <div className="space-y-2 text-xs leading-relaxed text-zinc-300">
          <p>
            <strong className="text-zinc-100">Строгий режим (Strict Mode)</strong> — это режим выполнения кода JavaScript, введенный в стандарте ECMAScript 5 (директива <code className="text-emerald-400 font-mono">"use strict";</code>). В ES6-модулях (<code className="text-emerald-400 font-mono">import / export</code>) и классах строгий режим включен по умолчанию.
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400">
            <li><strong className="text-zinc-200">Предотвращает случайное создание глобальных переменных:</strong> присвоение необъявленной переменной выбросит <code className="text-rose-400 font-mono">ReferenceError</code> вместо создания свойства в объекте window/global.</li>
            <li><strong className="text-zinc-200">Запрещает опасные или устаревшие конструкции:</strong> запрещает использование оператора <code className="font-mono text-zinc-300">with</code>, удаление неперечисляемых свойств (<code className="font-mono text-zinc-300">delete Object.prototype</code>).</li>
            <li><strong className="text-zinc-200">Безопасный this в функциях:</strong> если функция вызвана без контекста (не как метод объекта), <code className="text-emerald-400 font-mono">this === undefined</code> (в обычном режиме было бы привязано к глобальному объекту window).</li>
            <li><strong className="text-zinc-200">Оптимизация движка V8:</strong> строгий код проще анализировать компиляторам движка (JIT), что позволяет применить более глубокие инлайн-оптимизации.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'vars-difference',
      category: 'JS',
      question: 'Переменные – в чем отличие var, let, const? Когда и что предпочтительнее применять?',
      answer: (
        <div className="space-y-2 text-xs leading-relaxed text-zinc-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-800 my-2">
              <thead>
                <tr className="bg-zinc-900 text-zinc-200">
                  <th className="p-2 border border-zinc-800">Критерий</th>
                  <th className="p-2 border border-zinc-800">var</th>
                  <th className="p-2 border border-zinc-800">let</th>
                  <th className="p-2 border border-zinc-800">const</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr>
                  <td className="p-2 border border-zinc-800 font-medium text-zinc-300">Область видимости</td>
                  <td className="p-2 border border-zinc-800">Функциональная (function scope)</td>
                  <td className="p-2 border border-zinc-800">Блочная (block scope <code className="font-mono">{`{}`}</code>)</td>
                  <td className="p-2 border border-zinc-800">Блочная (block scope <code className="font-mono">{`{}`}</code>)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-800 font-medium text-zinc-300">Hoisting (поднятие)</td>
                  <td className="p-2 border border-zinc-800">Инициализируется как undefined</td>
                  <td className="p-2 border border-zinc-800">TDZ (Temporal Dead Zone)</td>
                  <td className="p-2 border border-zinc-800">TDZ (Temporal Dead Zone)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-800 font-medium text-zinc-300">Повторное объявление</td>
                  <td className="p-2 border border-zinc-800 text-emerald-400">Разрешено</td>
                  <td className="p-2 border border-zinc-800 text-rose-400">Ошибка (SyntaxError)</td>
                  <td className="p-2 border border-zinc-800 text-rose-400">Ошибка (SyntaxError)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-800 font-medium text-zinc-300">Переприсвоение</td>
                  <td className="p-2 border border-zinc-800 text-emerald-400">Да</td>
                  <td className="p-2 border border-zinc-800 text-emerald-400">Да</td>
                  <td className="p-2 border border-zinc-800 text-rose-400">Нет (immutable binding)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong className="text-zinc-100">Правило хорошего тона (Best Practice):</strong> По умолчанию всегда использовать <code className="text-emerald-400 font-mono">const</code>. Если переменная действительно изменяется (например, счетчик цикла или аккумулятор) — использовать <code className="text-emerald-400 font-mono">let</code>. Использование <code className="text-rose-400 font-mono">var</code> в современном JavaScript/TypeScript считается антипаттерном.
          </p>
        </div>
      )
    },
    {
      id: 'comparisons',
      category: 'JS',
      question: 'Операторы сравнения: отличия == и ===, а также разбор краевых случаев (null, undefined, строки)',
      answer: (
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
          <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
            <h5 className="font-semibold text-zinc-200 mb-1">1. В чем отличие `==` от `===`; `!=` от `!==`?</h5>
            <p>
              Оператор <code className="text-emerald-400 font-mono">==</code> (нестрогое равенство) выполняет <em>неявное приведение типов</em> (Type Coercion по спецификации ToPrimitive/ToNumber). Оператор <code className="text-emerald-400 font-mono">===</code> (строгое равенство) сначала проверяет равенство типов, и если типы не совпадают, сразу возвращает <code className="text-rose-400 font-mono">false</code> без приведения типов. Аналогично <code className="text-emerald-400 font-mono">!=</code> vs <code className="text-emerald-400 font-mono">!==</code>.
            </p>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
            <h5 className="font-semibold text-zinc-200 mb-1">2. '01' == 1 и '01' === 1? Почему?</h5>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li><code className="text-emerald-400 font-mono">'01' == 1</code> дает <strong className="text-emerald-300 font-mono">true</strong>, потому что строка <code className="font-mono">'01'</code> приводится к числу через <code className="font-mono">Number('01') === 1</code>. 1 == 1 дает true.</li>
              <li><code className="text-emerald-400 font-mono">'01' === 1</code> дает <strong className="text-rose-300 font-mono">false</strong>, так как типы различны: <code className="font-mono">string !== number</code>.</li>
            </ul>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
            <h5 className="font-semibold text-zinc-200 mb-1">3. null === undefined и null == undefined? Почему?</h5>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li><code className="text-emerald-400 font-mono">null === undefined</code> дает <strong className="text-rose-300 font-mono">false</strong>, так как разные примитивные типы (<code className="font-mono">Null</code> и <code className="font-mono">Undefined</code>).</li>
              <li><code className="text-emerald-400 font-mono">null == undefined</code> дает <strong className="text-emerald-300 font-mono">true</strong> — это зашитое в спецификацию ECMA-262 специальное правило: null и undefined нестрого равны только друг другу (и ничему другому).</li>
            </ul>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
            <h5 className="font-semibold text-zinc-200 mb-1">4. null &gt; 0; null == 0; null &gt;= 0? Почему?</h5>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li><code className="text-emerald-400 font-mono">null &gt; 0</code>: <strong className="text-rose-300 font-mono">false</strong>. Операторы сравнения (&gt;, &lt;, &gt;=, &lt;=) приводят операнды к числам (<code className="font-mono">Number(null) === 0</code>). 0 &gt; 0 ложно.</li>
              <li><code className="text-emerald-400 font-mono">null == 0</code>: <strong className="text-rose-300 font-mono">false</strong>. Оператор <code className="font-mono">==</code> для null НЕ приводит его к числу! null равен только undefined.</li>
              <li><code className="text-emerald-400 font-mono">null &gt;= 0</code>: <strong className="text-emerald-300 font-mono">true</strong>. Оператор <code className="font-mono">&gt;=</code> определяется в спецификации как обратный к <code className="font-mono">&lt;</code>, либо через ToNumber: <code className="font-mono">Number(null) &gt;= 0</code> =&gt; <code className="font-mono">0 &gt;= 0</code>, что истинно!</li>
            </ul>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
            <h5 className="font-semibold text-zinc-200 mb-1">5. undefined &gt; 0; undefined &lt; 0; undefined == 0? Почему?</h5>
            <p className="text-zinc-400">
              Все три выражения возвращают <strong className="text-rose-300 font-mono">false</strong>! При приведении к числу <code className="font-mono text-zinc-200">Number(undefined)</code> возвращает <code className="font-mono text-amber-400">NaN</code>. Любое математическое сравнение (&gt;, &lt;, &gt;=, &lt;=, ==) с участием NaN всегда дает <code className="font-mono text-rose-300">false</code> (даже <code className="font-mono">NaN == NaN</code> дает false).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'functions-first-class',
      category: 'JS',
      question: 'Функции: можно ли сохранить функцию в переменную?',
      answer: (
        <div className="space-y-2 text-xs leading-relaxed text-zinc-300">
          <p>
            <strong className="text-zinc-100">Да, безусловно.</strong> В JavaScript функции являются «объектами первого класса» (First-Class Citizens). Это означает, что функцию можно присвоить в переменную (Function Expression или Arrow Function), передать как аргумент в другую функцию (колбэк) или вернуть из другой функции (замыкание/HOC).
          </p>
          <div className="p-2.5 bg-zinc-950 rounded border border-zinc-800 font-mono text-[11px] text-zinc-300">
            <p><span className="text-emerald-400">const</span> greet = (name: <span className="text-sky-300">string</span>): <span className="text-sky-300">string</span> =&gt; `Hello, ${'{name}'}!`;</p>
            <p><span className="text-zinc-500">// Функция как значение переменной:</span></p>
            <p>console.log(greet('Astral Team'));</p>
          </div>
        </div>
      )
    },
    {
      id: 'callbacks-prompt',
      category: 'JS',
      question: 'Функции колбэки: функция подтверждения действия с вопросом, onConfirm, onCancel и стандартным prompt',
      hasInteractiveDemo: true,
      answer: (
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
          <p>
            Реализация функции согласно заданию в ТЗ: принимает <code className="text-emerald-400 font-mono">question</code>, <code className="text-emerald-400 font-mono">onConfirm</code> и <code className="text-emerald-400 font-mono">onCancel</code>, запрашивает подтверждение через нативный <code className="text-emerald-400 font-mono">prompt</code>:
          </p>
          <pre className="p-3 bg-zinc-950 rounded border border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-x-auto">
{`function confirmAction(
  question: string,
  onConfirm: () => void,
  onCancel: () => void
): void {
  // Используем стандартную функцию prompt по требованию ТЗ:
  const response = window.prompt(\`\${question}\\n(Введите "да" для подтверждения):\`);

  if (response !== null && ['да', 'yes', 'y', '1'].includes(response.trim().toLowerCase())) {
    onConfirm();
  } else {
    onCancel();
  }
}

// Пример вызова:
confirmAction(
  "Вы точно хотите удалить выбранный элемент?",
  () => console.log("Элемент удален"),
  () => console.log("Удаление отменено")
);`}
          </pre>

          <div className="pt-2">
            <button
              onClick={runConfirmCallbackDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-900/40 border border-emerald-700 text-emerald-300 hover:bg-emerald-800/50 transition-colors text-xs font-medium"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Запустить интерактивное демо prompt() прямо сейчас</span>
            </button>
            {demoOutput && (
              <div className="mt-2 p-2 rounded bg-zinc-950 border border-emerald-800/80 text-emerald-400 font-mono text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{demoOutput}</span>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'this-context',
      category: 'JS',
      question: 'Объекты, методы объектов, this: потеря контекста, привязка (.bind, .call, .apply) и стрелочные функции',
      answer: (
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
          <p>
            <strong className="text-zinc-100">Что такое this?</strong> В JS значение <code className="text-emerald-400 font-mono">this</code> определяется динамически в момент вызова функции (call-site) и ссылается на объект, в контексте которого выполняется вызов.
          </p>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800 space-y-2">
            <h5 className="font-semibold text-zinc-200">1. Пример потери this:</h5>
            <p className="text-zinc-400">
              Потеря контекста происходит, когда метод объекта извлекается и передается как отдельный колбэк (например, в <code className="font-mono text-zinc-300">setTimeout</code> или обработчик события):
            </p>
            <pre className="p-2 bg-zinc-900 rounded font-mono text-[11px] text-zinc-300 overflow-x-auto">
{`const developer = {
  name: "Максим",
  greet() {
    console.log("Привет, я " + this.name);
  }
};

setTimeout(developer.greet, 100); 
// Выведет: "Привет, я undefined" (потеря this, так как greet вызван без объекта)`}
            </pre>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800 space-y-2">
            <h5 className="font-semibold text-zinc-200">2. Решение 1: Жесткая привязка через Function.prototype.bind</h5>
            <pre className="p-2 bg-zinc-900 rounded font-mono text-[11px] text-zinc-300 overflow-x-auto">
{`// Создает новую функцию с навсегда зафиксированным this:
setTimeout(developer.greet.bind(developer), 100);
// Выведет: "Привет, я Максим"`}
            </pre>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800 space-y-2">
            <h5 className="font-semibold text-zinc-200">3. Решение 2: Стрелочные функции (Lexical this)</h5>
            <p className="text-zinc-400">
              Стрелочные функции не имеют собственного <code className="font-mono text-zinc-300">this</code>, а захватывают его лексически из внешнего окружения в момент создания:
            </p>
            <pre className="p-2 bg-zinc-900 rounded font-mono text-[11px] text-zinc-300 overflow-x-auto">
{`setTimeout(() => developer.greet(), 100);
// Либо объявление метода стрелкой:
class Candidate {
  name = "Максим";
  greet = () => { console.log(this.name); };
}`}
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'scheduling-timers',
      category: 'JS',
      question: 'Планирование: setTimeout и setInterval, рекурсивный setTimeout vs setInterval, отмена таймеров',
      answer: (
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
          <ul className="list-disc list-inside space-y-1 text-zinc-400">
            <li><code className="text-emerald-400 font-mono">setTimeout(fn, delay)</code> — планирует однократный вызов функции через указанное количество миллисекунд.</li>
            <li><code className="text-emerald-400 font-mono">setInterval(fn, delay)</code> — запускает регулярный периодический вызов функции каждые N миллисекунд.</li>
          </ul>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800 space-y-1.5">
            <h5 className="font-semibold text-zinc-200">В чем ключевое отличие setInterval от рекурсивного setTimeout?</h5>
            <p className="text-zinc-400">
              В <code className="font-mono text-zinc-300">setInterval</code> интервал отсчитывается между <strong className="text-zinc-200">стартами</strong> выполнения функции. Если сама функция выполняется долго (например, тяжелый расчет 150мс при интервале 100мс), вызовы начнут накапливаться и идти подряд без паузы.
            </p>
            <p className="text-zinc-400">
              В <strong className="text-zinc-200">рекурсивном setTimeout</strong> следующий таймер ставится только после <strong className="text-zinc-200">завершения</strong> предыдущего вызова. Это гарантирует строго фиксированную паузу между выполнениями задачи независимо от времени работы самой функции.
            </p>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
            <h5 className="font-semibold text-zinc-200 mb-1">Отмена таймеров:</h5>
            <pre className="p-2 bg-zinc-900 rounded font-mono text-[11px] text-zinc-300">
{`const timerId = setTimeout(() => { ... }, 1000);
clearTimeout(timerId); // отменяет отложенный вызов

const intervalId = setInterval(() => { ... }, 1000);
clearInterval(intervalId); // останавливает периодический цикл`}
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'typescript-basics',
      category: 'TypeScript',
      question: 'Что такое TypeScript? Для чего введен? В чем отличие от JS? Базовые типы',
      answer: (
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
          <p>
            <strong className="text-zinc-100">TypeScript</strong> — это строго типизированный надъязык (superset) поверх JavaScript, компилируемый в чистый JS. Разработан Microsoft для решения проблем масштабирования больших кодовых баз.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-2.5 bg-zinc-950 rounded border border-zinc-800">
              <h5 className="font-semibold text-zinc-200 mb-1">Ключевые преимущества перед JS:</h5>
              <ul className="list-disc list-inside space-y-1 text-zinc-400">
                <li>Статическая типизация: выявление ошибок еще на этапе компиляции, а не в продакшене.</li>
                <li>Автодополнение (IntelliSense) и безопасный рефакторинг.</li>
                <li>Самодокументируемый код за счет контрактов интерфейсов.</li>
              </ul>
            </div>
            <div className="p-2.5 bg-zinc-950 rounded border border-zinc-800">
              <h5 className="font-semibold text-zinc-200 mb-1">Базовые типы TS:</h5>
              <p className="text-zinc-400 font-mono text-[11px]">
                boolean, number, string, null, undefined, symbol, bigint, array (T[]), tuple ([string, number]), enum, any, unknown, void, never.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'generics',
      category: 'TypeScript',
      question: 'Обобщенные типы (generics) в TypeScript с практическими примерами',
      answer: (
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
          <p>
            <strong className="text-zinc-100">Дженерики (Generics)</strong> позволяют создавать компоненты, функции и интерфейсы, которые работают с различными типами данных, сохраняя при этом полную типобезопасность без перехода на тип <code className="font-mono text-rose-400">any</code>.
          </p>
          <pre className="p-3 bg-zinc-950 rounded border border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-x-auto">
{`// Пример 1: Обобщенный API-клиент ответа
interface ApiResponse<TData> {
  data: TData;
  status: number;
  message: string;
}

// Использование:
const userResponse: ApiResponse<{ id: string; name: string }> = {
  data: { id: "001", name: "Максим" },
  status: 200,
  message: "OK"
};

// Пример 2: Обобщенная функция фильтрации с ограничением (generic constraint)
function findItemById<T extends { id: string | number }>(items: T[], id: string | number): T | undefined {
  return items.find(item => item.id === id);
}`}
          </pre>
        </div>
      )
    },
    {
      id: 'interface-vs-type',
      category: 'TypeScript',
      question: 'Типы (type) и интерфейсы (interface) в TypeScript: ключевые различия',
      answer: (
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-800 my-1">
              <thead>
                <tr className="bg-zinc-900 text-zinc-200">
                  <th className="p-2 border border-zinc-800">Возможность</th>
                  <th className="p-2 border border-zinc-800">interface</th>
                  <th className="p-2 border border-zinc-800">type (alias)</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr>
                  <td className="p-2 border border-zinc-800 font-medium text-zinc-300">Declaration Merging</td>
                  <td className="p-2 border border-zinc-800 text-emerald-400">Да (слияние одноименных объявлений)</td>
                  <td className="p-2 border border-zinc-800 text-rose-400">Нет (ошибка duplicate identifier)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-800 font-medium text-zinc-300">Примитивы, Union, Tuple</td>
                  <td className="p-2 border border-zinc-800 text-rose-400">Нет (только форма объектов/функций)</td>
                  <td className="p-2 border border-zinc-800 text-emerald-400">Да (<code className="font-mono">type ID = string | number</code>)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-800 font-medium text-zinc-300">Расширение</td>
                  <td className="p-2 border border-zinc-800"><code className="font-mono">extends</code></td>
                  <td className="p-2 border border-zinc-800">Интерсекшн <code className="font-mono">&amp;</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'optional-omit-overload',
      category: 'TypeScript',
      question: 'Необязательные свойства, Partial, Omit и перегрузка функций в TypeScript',
      answer: (
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
          <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
            <h5 className="font-semibold text-zinc-200 mb-1">1. Как сделать свойства необязательными?</h5>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li>Отдельные свойства: оператор <code className="text-emerald-400 font-mono">?</code> в определении поля: <code className="font-mono text-zinc-300">interface User {`{`} name: string; avatarUrl?: string; {`}`}</code></li>
              <li>Все свойства интерфейса: утилитный тип <code className="text-emerald-400 font-mono">Partial&lt;T&gt;</code>: <code className="font-mono text-zinc-300">type OptionalUser = Partial&lt;User&gt;;</code></li>
            </ul>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
            <h5 className="font-semibold text-zinc-200 mb-1">2. Для чего нужен тип Omit&lt;T, K&gt;?</h5>
            <p className="text-zinc-400">
              <code className="text-emerald-400 font-mono">Omit&lt;Type, Keys&gt;</code> конструирует новый тип, беря все свойства из <code className="font-mono text-zinc-300">Type</code> и исключая указанные ключи <code className="font-mono text-zinc-300">Keys</code>. Идеально для DTO создания сущности без сгенерированных сервером полей (<code className="font-mono text-zinc-300">id, createdAt</code>).
            </p>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
            <h5 className="font-semibold text-zinc-200 mb-1">3. Возможно ли в TypeScript перегрузить функцию?</h5>
            <p className="text-zinc-400">
              <strong className="text-zinc-200">Да!</strong> В TypeScript перегрузка функций (Function Overloading) реализуется объявлением нескольких сигнатур перегрузки и одной финальной реализации:
            </p>
            <pre className="mt-2 p-2 bg-zinc-900 rounded font-mono text-[11px] text-zinc-300 overflow-x-auto">
{`function parseInput(val: string): string[];
function parseInput(val: number): number[];
function parseInput(val: string | number): (string | number)[] {
  return typeof val === 'string' ? val.split('') : [val];
}`}
            </pre>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-zinc-100">
            Ответы на теоретическую часть ТЗ (JS & TypeScript)
          </h2>
        </div>
        <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
          Калуга Астрал Frontend Middle
        </span>
      </div>

      <div className="space-y-3">
        {theoryData.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-900/90 transition-colors"
              >
                <div className="flex items-center gap-3 pr-4">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      item.category === 'TypeScript'
                        ? 'text-sky-400 bg-sky-950/40 border-sky-800/60'
                        : 'text-amber-400 bg-amber-950/40 border-amber-800/60'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                    {item.question}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-zinc-800/60 bg-zinc-950/40">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
