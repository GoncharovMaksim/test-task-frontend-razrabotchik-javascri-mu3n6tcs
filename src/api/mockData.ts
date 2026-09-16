import { CardItem } from '../types/card';
import { FieldDefinition, ProfileData } from '../types/profile';

export const MOTIVATIONAL_QUOTES = [
  'Word of the Day',
  'Expand Your Horizon',
  'Daily Vocabulary Boost',
  'Mastery Through Repetition',
  'Level Up Your English',
  'Fluent Step by Step',
  'Active Lexicon Builder',
  'Language Insight of Today'
];

export const MOCK_CARDS: CardItem[] = [
  {
    id: 'card-1',
    word: 'benevolent',
    phonetic: '/bəˈnev.əl.ənt/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Word of the Day',
    exampleSentence: 'A benevolent smile spread across the mentor’s face as the junior developer solved the puzzle.',
    translation: 'великодушный, благожелательный, доброжелательный',
    definition: 'Kind, generous, and helpful to other people.',
    level: 'B1-B2',
    category: 'Personality & Emotion',
    isLearned: false
  },
  {
    id: 'card-2',
    word: 'resilient',
    phonetic: '/rɪˈzɪl.jənt/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Daily Vocabulary Boost',
    exampleSentence: 'Modern distributed architectures are engineered to be resilient to unexpected network failures.',
    translation: 'устойчивый, жизнестойкий, способный восстанавливаться',
    definition: 'Able to withstand or recover quickly from difficult conditions or shocks.',
    level: 'B1-B2',
    category: 'Engineering & Character',
    isLearned: false
  },
  {
    id: 'card-3',
    word: 'ephemeral',
    phonetic: '/ɪˈfem.ər.əl/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Language Insight of Today',
    exampleSentence: 'Serverless containers have an ephemeral lifecycle, spinning up on demand and shutting down after execution.',
    translation: 'эфемерный, мимолётный, недолговечный',
    definition: 'Lasting for a very short time; transitory.',
    level: 'C1-C2',
    category: 'Science & Time',
    isLearned: false
  },
  {
    id: 'card-4',
    word: 'ubiquitous',
    phonetic: '/juːˈbɪk.wɪ.təs/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Level Up Your English',
    exampleSentence: 'JavaScript has become ubiquitous across web clients, mobile runtimes, and cloud backends.',
    translation: 'вездесущий, повсеместный',
    definition: 'Present, appearing, or found everywhere at the same time.',
    level: 'C1-C2',
    category: 'Technology & Culture',
    isLearned: false
  },
  {
    id: 'card-5',
    word: 'lucid',
    phonetic: '/ˈluː.sɪd/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Expand Your Horizon',
    exampleSentence: 'The architect gave a remarkably lucid explanation of clean code principles and immutability.',
    translation: 'ясный, понятный, вразумительный',
    definition: 'Expressed clearly; easy to understand; showing ability to think clearly.',
    level: 'B1-B2',
    category: 'Communication',
    isLearned: false
  },
  {
    id: 'card-6',
    word: 'meticulous',
    phonetic: '/məˈtɪk.jə.ləs/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Mastery Through Repetition',
    exampleSentence: 'Her meticulous code reviews caught subtle edge cases before pull requests reached production.',
    translation: 'скрупулёзный, дотошный, тщательный',
    definition: 'Showing great attention to detail; very careful and precise.',
    level: 'B1-B2',
    category: 'Work & Quality',
    isLearned: false
  },
  {
    id: 'card-7',
    word: 'pragmatic',
    phonetic: '/præɡˈmæt.ɪk/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Fluent Step by Step',
    exampleSentence: 'A pragmatic engineer chooses the simplest tool that reliably solves the problem at scale.',
    translation: 'прагматичный, ориентированный на практическую пользу',
    definition: 'Dealing with things sensibly and realistically in a way based on practical considerations.',
    level: 'B1-B2',
    category: 'Philosophy & Work',
    isLearned: false
  },
  {
    id: 'card-8',
    word: 'paradigm',
    phonetic: '/ˈpær.ə.daɪm/',
    partOfSpeech: 'noun',
    motivationalQuote: 'Word of the Day',
    exampleSentence: 'Reactive programming represents a distinct paradigm from imperative event-handling loops.',
    translation: 'парадигма, модель, система взглядов',
    definition: 'A typical example or pattern of something; a model or conceptual framework.',
    level: 'C1-C2',
    category: 'Science & Computing',
    isLearned: false
  },
  {
    id: 'card-9',
    word: 'scrutinize',
    phonetic: '/ˈskruː.tɪ.naɪz/',
    partOfSpeech: 'verb',
    motivationalQuote: 'Language Insight of Today',
    exampleSentence: 'Security auditors thoroughly scrutinize dependencies for vulnerabilities before release.',
    translation: 'внимательно изучать, тщательно исследовать',
    definition: 'To examine or inspect closely and thoroughly.',
    level: 'B1-B2',
    category: 'Actions & Analysis',
    isLearned: false
  },
  {
    id: 'card-10',
    word: 'versatile',
    phonetic: '/ˈvɜː.sə.taɪl/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Active Lexicon Builder',
    exampleSentence: 'TypeScript is versatile enough for microcontrollers, enterprise SPAs, and server CLI tools.',
    translation: 'универсальный, разносторонний, многогранный',
    definition: 'Able to adapt or be adapted to many different functions or activities.',
    level: 'A1-A2',
    category: 'Technology & Character',
    isLearned: false
  },
  {
    id: 'card-11',
    word: 'serendipity',
    phonetic: '/ˌser.ənˈdɪp.ə.ti/',
    partOfSpeech: 'noun',
    motivationalQuote: 'Expand Your Horizon',
    exampleSentence: 'Finding that open-source library was pure serendipity, saving our sprint two weeks of effort.',
    translation: 'счастливая случайность, интуитивная прозорливость',
    definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
    level: 'C1-C2',
    category: 'Life & Abstract',
    isLearned: false
  },
  {
    id: 'card-12',
    word: 'cogent',
    phonetic: '/ˈkəʊ.dʒənt/',
    partOfSpeech: 'adjective',
    motivationalQuote: 'Daily Vocabulary Boost',
    exampleSentence: 'The lead presented a cogent argument for adopting Redux Toolkit instead of raw state listeners.',
    translation: 'убедительный, веский, неопровержимый',
    definition: 'Clear, logical, and convincing in argument or statement.',
    level: 'C1-C2',
    category: 'Communication',
    isLearned: false
  }
];

export const PROFILE_FIELD_DEFINITIONS: FieldDefinition[] = [
  // 1. String
  {
    id: 'field-1',
    name: 'firstName',
    label: 'Имя',
    type: 'string',
    placeholder: 'Например: Максим',
    required: true,
    description: 'Официальное имя пользователя'
  },
  // 2. String
  {
    id: 'field-2',
    name: 'lastName',
    label: 'Фамилия',
    type: 'string',
    placeholder: 'Например: Смирнов',
    required: true,
    description: 'Фамилия кандидата'
  },
  // 3. String
  {
    id: 'field-3',
    name: 'displayName',
    label: 'Отображаемый никнейм (Handle)',
    type: 'string',
    placeholder: '@max_frontend',
    required: false,
    description: 'Используется в рейтинге и публичных карточках'
  },
  // 4. Number
  {
    id: 'field-4',
    name: 'age',
    label: 'Возраст (полных лет)',
    type: 'number',
    placeholder: '26',
    min: 16,
    max: 100,
    required: true,
    description: 'Числовое поле (целое число)'
  },
  // 5. Date
  {
    id: 'field-5',
    name: 'birthDate',
    label: 'Дата рождения',
    type: 'date',
    required: true,
    description: 'Поле выбора даты календаря'
  },
  // 6. Number
  {
    id: 'field-6',
    name: 'targetDailyWords',
    label: 'Целевой дневной лимит слов',
    type: 'number',
    placeholder: '15',
    min: 1,
    max: 100,
    required: true,
    description: 'Количество новых слов для ежедневного повторения'
  },
  // 7. Select
  {
    id: 'field-7',
    name: 'englishLevel',
    label: 'Текущий уровень английского',
    type: 'select',
    required: true,
    description: 'Выпадающий список общеевропейской шкалы CEFR',
    options: [
      { label: 'A1 — Beginner (Начальный)', value: 'A1' },
      { label: 'A2 — Elementary (Элементарный)', value: 'A2' },
      { label: 'B1 — Intermediate (Средний)', value: 'B1' },
      { label: 'B2 — Upper-Intermediate (Выше среднего)', value: 'B2' },
      { label: 'C1 — Advanced (Продвинутый)', value: 'C1' },
      { label: 'C2 — Proficiency (В совершенстве)', value: 'C2' }
    ]
  },
  // 8. Radio group [PARENT DEPENDENCY FIELD 'A']
  {
    id: 'field-8',
    name: 'employmentStatus',
    label: 'Текущий статус занятости',
    type: 'radio-group',
    required: true,
    description: 'Поле "А" зависимости: изменение влияет на поля Компании и Срока выхода',
    options: [
      { label: 'Работаю в штате (Employed)', value: 'employed' },
      { label: 'Фриланс / Контракт (Freelance)', value: 'freelance' },
      { label: 'В активном поиске (Looking for Job)', value: 'looking_for_job' },
      { label: 'Студент / Обучение (Student)', value: 'student' }
    ]
  },
  // 9. String [DEPENDENT FIELD 'B': Hidden when unemployed / student]
  {
    id: 'field-9',
    name: 'currentCompany',
    label: 'Текущая компания работодателя',
    type: 'string',
    placeholder: 'ООО Инновационные Решения',
    description: 'Поле "Б" зависимости: автоматически скрывается, если выбран статус "В поиске" или "Студент"',
    dependency: {
      dependsOn: 'employmentStatus',
      condition: (val) => val === 'looking_for_job' || val === 'student',
      effect: {
        hidden: true
      },
      explanation: 'Скрыто: не требуется при отсутствии текущего работодателя'
    }
  },
  // 10. String [DEPENDENT FIELD 'C': Disabled & preset value when looking for job]
  {
    id: 'field-10',
    name: 'noticePeriod',
    label: 'Срок отработки / готовность к выходу',
    type: 'string',
    placeholder: '2 недели (14 дней)',
    description: 'Поле "В" зависимости: блокируется и получает авто-значение "0 дней", если статус "В поиске"',
    dependency: {
      dependsOn: 'employmentStatus',
      condition: (val) => val === 'looking_for_job',
      effect: {
        disabled: true,
        presetValue: '0 дней (готов приступить немедленно)'
      },
      explanation: 'Заблокировано: кандидат свободен и готов к выходу без отработки'
    }
  },
  // 11. Radio group [SECOND DEPENDENCY PAIR]
  {
    id: 'field-11',
    name: 'willingToRelocate',
    label: 'Готовность к релокации',
    type: 'radio-group',
    required: true,
    description: 'Определяет доступность выбора страны релокации',
    options: [
      { label: 'Да, готов к переезду', value: 'yes' },
      { label: 'Только удаленный формат (Remote only)', value: 'remote_only' },
      { label: 'Нет, только свой город', value: 'no' }
    ]
  },
  // 12. Select [DEPENDENT: Disabled and preset to 'Не применимо' if remote_only or no]
  {
    id: 'field-12',
    name: 'targetRelocationCountry',
    label: 'Приоритетная страна для релокации',
    type: 'select',
    description: 'Заблокировано со значением "Не рассматривается", если релокация выключена',
    options: [
      { label: 'Россия (другой регион)', value: 'RU' },
      { label: 'Кипр (Лимасол)', value: 'CY' },
      { label: 'ОАЭ (Дубай)', value: 'AE' },
      { label: 'Сербия (Белград)', value: 'RS' },
      { label: 'Германия (Берлин)', value: 'DE' },
      { label: 'Не рассматривается', value: 'NONE' }
    ],
    dependency: {
      dependsOn: 'willingToRelocate',
      condition: (val) => val === 'remote_only' || val === 'no',
      effect: {
        disabled: true,
        presetValue: 'NONE'
      },
      explanation: 'Заблокировано: релокация не планируется'
    }
  },
  // 13. Checkbox group
  {
    id: 'field-13',
    name: 'learningGoals',
    label: 'Цели изучения английского языка',
    type: 'checkbox-group',
    required: true,
    description: 'Выберите одно или несколько направлений',
    options: [
      { label: 'Чтение технической документации и RFC', value: 'tech_docs' },
      { label: 'Разговорная практика на дейли и митингах', value: 'speaking' },
      { label: 'Прохождение собеседований в зарубежные компании', value: 'interviews' },
      { label: 'Деловая переписка и pull request reviews', value: 'business_email' },
      { label: 'Путешествия и нетворкинг на конференциях', value: 'travel' }
    ]
  },
  // 14. Select
  {
    id: 'field-14',
    name: 'preferredStudyTime',
    label: 'Предпочтительное время для занятий',
    type: 'select',
    required: true,
    description: 'Таймслот для интервального повторения карточек',
    options: [
      { label: 'Утро (07:30 — 09:30)', value: 'morning' },
      { label: 'День / обеденный перерыв (13:00 — 14:30)', value: 'afternoon' },
      { label: 'Вечер после работы (19:30 — 21:30)', value: 'evening' },
      { label: 'Выходные дни (интенсив)', value: 'weekend' }
    ]
  },
  // 15. Number
  {
    id: 'field-15',
    name: 'weeklyStudyHours',
    label: 'Часов в неделю на обучение',
    type: 'number',
    placeholder: '6',
    min: 1,
    max: 40,
    required: true,
    description: 'Инвестиции времени в самостоятельное развитие'
  },
  // 16. Number
  {
    id: 'field-16',
    name: 'totalVocabularyTarget',
    label: 'Глобальная цель активного словаря (слов)',
    type: 'number',
    placeholder: '3500',
    min: 500,
    max: 20000,
    required: true,
    description: 'Общий объем слов к освоению'
  },
  // 17. Radio group [THIRD DEPENDENCY TRIGGER]
  {
    id: 'field-17',
    name: 'hasPersonalTutor',
    label: 'Занимаетесь ли с персональным преподавателем?',
    type: 'radio-group',
    required: true,
    description: 'Влияет на видимость заметок о репетиторе',
    options: [
      { label: 'Да, занимаюсь с репетитором', value: 'yes' },
      { label: 'Нет, обучаюсь самостоятельно', value: 'no' }
    ]
  },
  // 18. String [DEPENDENT: Hidden if hasPersonalTutor is 'no']
  {
    id: 'field-18',
    name: 'tutorPlatform',
    label: 'Платформа или контакт преподавателя',
    type: 'string',
    placeholder: 'Skyeng / Italki / Личный контакт в Telegram',
    description: 'Скрывается, если обучение проходит самостоятельно',
    dependency: {
      dependsOn: 'hasPersonalTutor',
      condition: (val) => val === 'no',
      effect: {
        hidden: true
      },
      explanation: 'Скрыто: персональный тьютор отсутствует'
    }
  },
  // 19. Checkbox group
  {
    id: 'field-19',
    name: 'notificationChannels',
    label: 'Каналы уведомлений и напоминаний о карточках',
    type: 'checkbox-group',
    description: 'Где напоминать о повторении интервальной системы',
    options: [
      { label: 'Email дайджест со словами недели', value: 'email' },
      { label: 'Telegram-бот с интервальным пушем', value: 'telegram' },
      { label: 'Push-уведомления в браузере', value: 'browser_push' },
      { label: 'SMS при пропуске более 3 дней', value: 'sms' }
    ]
  },
  // 20. Text (Textarea)
  {
    id: 'field-20',
    name: 'bioAndNotes',
    label: 'О себе, мотивация и профессиональные цели',
    type: 'text',
    rows: 4,
    placeholder: 'Middle Frontend разработчик с опытом React/TypeScript более 3 лет. Стремлюсь свободно общаться на архитектурных митингах и писать чистый код в международной распределенной команде.',
    description: 'Многострочное текстовое поле (textarea)'
  }
];

export const INITIAL_PROFILE_DATA: ProfileData = {
  firstName: 'Максим',
  lastName: 'Смирнов',
  displayName: 'max_astral_dev',
  age: 27,
  birthDate: '1997-04-12',
  targetDailyWords: 15,
  englishLevel: 'B2',
  employmentStatus: 'employed',
  currentCompany: 'ГК Калуга Астрал',
  noticePeriod: '14 дней',
  willingToRelocate: 'yes',
  targetRelocationCountry: 'RU',
  learningGoals: ['tech_docs', 'speaking', 'interviews'],
  preferredStudyTime: 'evening',
  weeklyStudyHours: 8,
  totalVocabularyTarget: 4000,
  hasPersonalTutor: 'no',
  tutorPlatform: '',
  notificationChannels: ['email', 'telegram'],
  bioAndNotes: 'Frontend разработчик (JavaScript/TypeScript + React). Специализируюсь на создании масштабируемых SPA, дизайн-систем и модульных архитектур. Люблю строгий TypeScript, чистый стейт-менеджмент и оптимизацию веб-производительности.'
};

export const FAKE_HEADER_PROFILE = {
  name: 'Максим Смирнов',
  login: 'admin',
  role: 'Frontend Developer (Middle)',
  email: 'm.smirnov@astral.example.ru',
  city: 'Калуга / Москва',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
};

export const FAKE_FOOTER_CONTACTS = {
  company: 'ГК Калуга Астрал',
  vacanciesUrl: 'https://astral.ru/career',
  contactPerson: 'Наталья, HR Менеджер',
  email: 'hr@astral.example.ru',
  phone: '8 (800) 700-86-68',
  address: 'г. Калуга, пер. Теренинский, д. 6',
  year: 2026,
  stack: 'React + Redux Toolkit + TypeScript + Vite'
};
