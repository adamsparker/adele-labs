// Данные для четырех сезонных лагерей
const campData = [
    {
        id: 'summer',
        title: 'Летний лагерь: IT – Лаборатория',
        duration: '30 дней',
        levels: [
            // НЕДЕЛЯ 1: Программирование и Веб-разработка
            { day: 1, theme: 'Введение во фронтенд: Создание первого HTML сайта', isWebDev: true },
            { day: 2, theme: 'Добавление на сайт картинок и ссылок', isWebDev: true },
            { day: 3, theme: 'Дизайн сайта с помощью CSS', isWebDev: true },
            { day: 4, theme: 'Создание сайта "Визитка"'},
            { day: 5, theme: 'Создаие сайта "Магазин"'},
            { day: 6, theme: '"Оживляем" сайт с помощью JavaScript'},
            { day: 7, theme: 'Презентация проектов первой недели' },
            // НЕДЕЛЯ 2: Монтаж и Дизайн
            { day: 8, theme: 'Графический дизайн с помощью Figma' },
            { day: 9, theme: 'Дизайн карточки товара в Figma' },
            { day: 10, theme: 'Дизайн сайта в Figma' },
            { day: 11, theme: 'Основы монтажа в CapCut' },
            { day: 12, theme: 'Удаление фона и эффекты в монтаже'},
            { day: 13, theme: 'Монтаж фильма в CapCut' },
            { day: 14, theme: 'Презентация проектов второй недели' },
            // НЕДЕЛЯ 3: Изучение ИИ
            { day: 15, theme: 'Знакомство с ИИ' },
            { day: 16, theme: 'Генерация изображений с помощью ИИ' },
            { day: 17, theme: 'Генерация и монтаж видео с помощью ИИ' },
            { day: 18, theme: 'Программирование с помощью ИИ', isWebDev: true },
            { day: 19, theme: 'Создание видеоигры в жанре «аркада» с помощью ИИ' },
            { day: 20, theme: 'Создание "Бизнес-идеи" с помощью ИИ' },
            { day: 21, theme: 'Презентация проектов третьей недели' },
            // НЕДЕЛЯ 4: Проектирование и презентация
            { day: 22, theme: 'Изучение основ Python: переменные, циклы, функции', isPythonDev: true },
            { day: 23, theme: 'Создание калькулятора на Python', isPythonDev: true },
            { day: 24, theme: 'Создание игры "Угадай число" на Python', isPythonDev: true },
            { day: 25, theme: 'Создание Таймера и Секундомера на Python', isPythonDev: true },
            { day: 26, theme: 'Создание Таймера и Секундомера на Python', isPythonDev: true },
            { day: 27, theme: 'Генератор паролей на Python', isPythonDev: true },
            { day: 28, theme: 'Презентация проектов четвёртой недели' },
            // ФИНАЛЬНЫЙ ПРОЕКТ
            { day: 29, theme: 'Финальный проект-презентация: IT-Проект (часть 1)' },
            { day: 30, theme: 'Финальный проект-презентация: IT-Проект (часть 2)' },
        ]
    },
    {
        id: 'autumn',
        title: 'Осенний лагерь: Языковой квест',
        duration: '7 дней',
        levels: [
            { day: 1, theme: 'Арабский язык: Квест-Игра "Караван" на Miro ' },
            { day: 2, theme: 'Английский язык: Настольная игра в Miro' },
            { day: 3, theme: 'Русский язык: "Скрабл" на Miro' },
            { day: 4, theme: 'Путешествие в мир языков через "Ба-да-бум"', externalLink: 'https://babadum.com/play/?lang=1&game=1', toolName: 'GAME' },
            { day: 5, theme: 'Рисуем слова в "Scribble"', externalLink: 'https://skribbl.io/', toolName: 'GAME' },
            { day: 6, theme: 'Языковые детективы: Расшифровка текстов с Брейля и Морзе' },
            { day: 7, theme: '"Своя игра" по мировым языкам в Miro' },
        ]
    },
    {
        id: 'winter',
        title: 'Зимний лагерь: Академия робототехники',
        duration: '10 дней',
        levels: [
            { day: 1, theme: 'Мой первый робот: Сбор робота на доске Miro' },
            { day: 2, theme: 'Изучение алгоритмов с помощью LightBot', externalLink: 'https://lightbot.lu/', toolName: 'LIGHTBOT' }, // <-- Обновлено: LightBot
            { day: 3, theme: 'Симуляция робота с помощью Scratch' },
            { day: 4, theme: 'ИИ Живая сталь: Битва виртуальных роботов' },
            { day: 5, theme: 'Симуляция робота с помощью JavaScript и Нейросетей', isWebDev: true},
            { day: 6, theme: 'Гонки роботов', externalLink: 'robo-race.html', toolName: 'RACE' }, // Тема без явного инструмента
            { day: 7, theme: 'Дизайн робота-помощника на доске Miro' },
            { day: 8, theme: 'Миссия «Космос» – Программирование ровера который сможет покорить луну' },
            { day: 9, theme: 'Программирование робота в RoboStart', externalLink: 'https://robostart.ru/performer', toolName: 'ROBOSTART' }, // <-- Обновлено: RoboStart
            { day: 10, theme: 'Финальный проект-презентация: Мой уникальный робот' },
        ]
    },
    {
        id: 'spring',
        title: 'Весенний лагерь: Наука — это интересно',
        duration: '7 дней',
        levels: [
            { day: 1, theme: 'Химия: Живые интерактивные опыты.' },
            { day: 2, theme: 'Физика: Живые интерактивные опыты.' },
            { day: 3, theme: 'Биология: Тайны микроорганизмов через микроскоп' },
            { day: 4, theme: 'Математика: квест-приключение на Miro' },
            { day: 5, theme: 'География: Исследование и поиск уникальных мест планеты.', externalLink: 'https://openguessr.com/', toolName: 'GEO' },
            { day: 6, theme: 'Информатика: квест-приключение на Miro' },
            { day: 7, theme: 'Финальный проект-презентация: Моё научное исследование и его практическое применение.' },
        ]
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const campContainer = document.getElementById('camp-cards-container');
    const modal = document.getElementById('levels-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const startCourseBtn = document.getElementById('start-course-btn');
    const modalTitle = document.getElementById('modal-camp-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const levelsContainer = document.getElementById('modal-levels-container');
    
    // Функция для рендеринга карточек лагерей
    const renderCampCards = () => {
        campData.forEach(camp => {
            const cardHtml = `
                <div class="camp-card bg-white p-6 rounded-xl shadow-lg border-t-8 border-brand-primary cursor-pointer hover:shadow-2xl transition duration-300 transform hover:-translate-y-1" data-camp-id="${camp.id}">
                    <div class="text-sm font-bold text-gray-500 mb-2">${camp.duration}</div>
                    <h3 class="text-xl font-bold text-primary-dark mb-4">${camp.title}</h3>
                    <p class="text-gray-600 text-sm mb-4">Нажмите, чтобы увидеть программу по дням.</p>
                    <button class="text-sm font-semibold text-brand-primary hover:text-cta-accent transition duration-150">
                        Посмотреть программу &rarr;
                    </button>
                </div>
            `;
            campContainer.innerHTML += cardHtml;
        });

        // Добавление слушателей после рендеринга
        document.querySelectorAll('.camp-card').forEach(card => {
            card.addEventListener('click', (event) => {
                const campId = event.currentTarget.dataset.campId;
                openModal(campId);
            });
        });
    };

    // Функция для открытия модального окна
    const openModal = (campId) => {
        const camp = campData.find(c => c.id === campId);

        if (!camp) return;

        // Заполнение модального окна
        modalTitle.textContent = camp.title;
        modalSubtitle.textContent = `Программа курса, длительность: ${camp.duration}`;
        levelsContainer.innerHTML = ''; // Очистка предыдущих данных

        camp.levels.forEach(level => {
            const isWebDevDay = level.isWebDev;
            const isPythonDevDay = level.isPythonDev;
            const isExternalLinkDay = !!level.externalLink; // Проверка наличия внешней ссылки
            const isInteractiveDay = isWebDevDay || isPythonDevDay || isExternalLinkDay; // Общий флаг для интерактивных дней

            const levelButton = document.createElement('button');
            
            // Стиль кнопки дня: Применяем 'активный' стиль, если это интерактивный день
            levelButton.className = `w-full text-left p-4 rounded-lg transition duration-200 shadow-md flex items-center space-x-3 
                ${isInteractiveDay ? 'bg-brand-primary text-white cursor-pointer hover:bg-brand-hover' : 'bg-brand-light text-primary-dark hover:bg-gray-200 cursor-default'}`;
            
            // Цвет круга дня: Белый круг для интерактивных дней
            const dayNumberClass = isInteractiveDay ? 'bg-white text-brand-primary' : 'bg-brand-primary text-white';

            // Добавление тега
            let tagHtml = '';
            if (isWebDevDay) {
                tagHtml = '<span class="text-xs font-bold bg-brand-light text-brand-primary px-2 py-1 rounded-full ml-2">ВЕБ</span>';
            } else if (isPythonDevDay) {
                tagHtml = '<span class="text-xs font-bold bg-brand-light text-brand-primary px-2 py-1 rounded-full ml-2">PYTHON</span>';
            } else if (isExternalLinkDay) {
                // Новый тег для внешних ссылок, используя toolName или 'ССЫЛКА'
                tagHtml = `<span class="text-xs font-bold bg-brand-light text-brand-primary px-2 py-1 rounded-full ml-2">${level.toolName || 'ССЫЛКА'}</span>`;
            }

            levelButton.innerHTML = `
                <span class="w-8 h-8 flex items-center justify-center font-extrabold rounded-full text-sm flex-shrink-0 ${dayNumberClass}">
                    ${level.day}
                </span>
                <span class="font-medium text-base">
                    ${level.theme} 
                    ${tagHtml}
                </span>
            `;
            
            // Логика перенаправления
            if (isWebDevDay) {
                levelButton.addEventListener('click', () => {
                    window.location.href = 'web-editor.html';
                });
            } else if (isPythonDevDay) {
                levelButton.addEventListener('click', () => {
                    window.location.href = 'python-editor.html';
                });
            } else if (isExternalLinkDay) {
                // Логика для внешних ссылок: открываем в новой вкладке
                levelButton.addEventListener('click', () => {
                    window.open(level.externalLink, '_blank');
                });
            }

            levelsContainer.appendChild(levelButton);
        });

        // Показ модального окна
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.querySelector('div').classList.remove('scale-95');
            modal.querySelector('div').classList.add('scale-100');
        }, 10);
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        modal.querySelector('div').classList.remove('scale-100');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    // Обработчик для кнопки "Начать курс"
    startCourseBtn.addEventListener('click', () => {
        const currentCampTitle = modalTitle.textContent;
        console.log(`Начало полного курса: ${currentCampTitle}. Имитация начала курса.`);
        closeModal();
    });


    // Слушатели для закрытия модального окна
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Закрытие при клике вне содержимого модала
        if (e.target.id === 'levels-modal') {
            closeModal();
        }
    });

    // Инициализация
    renderCampCards();
});