const editor = document.getElementById('code-editor');
const iframe = document.getElementById('preview-iframe');
const previewPanel = document.getElementById('preview-panel');
const appHeader = document.getElementById('app-header');
const mainContainer = document.getElementById('main-container');
const enterFullIcon = document.getElementById('enter-full');
const exitFullIcon = document.getElementById('exit-full');
const fullscreenText = document.getElementById('fullscreen-text');

// Используем localStorage для сохранения кода
const STORAGE_KEY = 'htmlEditorCode'; 

// --- ЛОГИКА СОХРАНЕНИЯ / ЗАПУСКА ---

function saveCode() {
    try {
        localStorage.setItem(STORAGE_KEY, editor.value);
        console.log('Код успешно сохранен локально.');
    } catch (e) {
        console.error('Ошибка при сохранении кода:', e);
    }
}

function loadCode() {
    const savedCode = localStorage.getItem(STORAGE_KEY);
    if (savedCode) {
        editor.value = savedCode;
        console.log('Сохраненный код загружен.');
        return true;
    }
    return false;
}

function runCode() {
    const code = editor.value;
    
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Загрузка кода в iframe
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
    
    // Сохраняем код после запуска
    saveCode(); 
}

function goToHome() {
    // В зависимости от того, что вы хотите делать - просто перезагрузить или перейти на главную страницу
    // window.location.href = 'index.html'; 
    window.location.reload(); 
}

// --- ЛОГИКА ПОЛНОЭКРАННОГО РЕЖИМА ---
function toggleFullscreen() {
    const isFullscreen = previewPanel.classList.toggle('fullscreen');
    
    // Управление видимостью кнопок/иконок
    enterFullIcon.classList.toggle('hidden', isFullscreen);
    exitFullIcon.classList.toggle('hidden', !isFullscreen);
    fullscreenText.textContent = isFullscreen ? 'Выход' : 'Полный экран';

    // Переключаем класс на <body> или главном контейнере, чтобы скрыть редактор
    document.body.classList.toggle('fullscreen-active', isFullscreen);
    appHeader.classList.toggle('hidden', isFullscreen); // Скрываем основной заголовок

    // Перезапускаем код, чтобы, если в коде используются Vh/Vw, он корректно перестроился
    runCode();
}

// --- ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ СОБЫТИЙ ---

window.onload = function() {
    // Загрузка кода (либо сохраненного, либо пустого)
    loadCode();
    
    // Инициализация предпросмотра
    runCode();

    // Обработчик ввода для режима "реального времени"
    editor.addEventListener('input', () => {
        runCode();
    });

    // Обработка Ctrl+Enter (или Cmd+Enter)
    editor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            runCode();
        }
    });
    
    // Установка высоты редактора
    editor.style.height = '100%'; 
};