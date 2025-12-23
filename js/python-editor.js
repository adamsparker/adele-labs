document.addEventListener('DOMContentLoaded', () => {
    const codeInput = document.getElementById('python-code-input');
    const runButton = document.getElementById('run-python-code-btn');
    const outputArea = document.getElementById('output-area');
    const statusMessage = document.getElementById('status-message');
    const outputTitle = document.getElementById('output-title');
    const outputIcon = document.getElementById('output-icon');
    
    let currentOutput = '';
    
    // 2. Функция, перехватывающая вывод (stdout) Skulpt
    function outf(text) {
        currentOutput += text;
    }

    // 3. Функция для выполнения кода
    async function runCode() {
        const code = codeInput.value;
        currentOutput = '';
        outputArea.textContent = ''; 
        
        statusMessage.textContent = 'Выполнение кода...';
        statusMessage.classList.remove('text-error', 'text-success', 'text-gray-400');
        statusMessage.classList.add('text-yellow-500');
        
        runButton.disabled = true;
        runButton.classList.add('opacity-50', 'cursor-not-allowed');
        runButton.classList.remove('hover:bg-brand-hover');

        try {
            // Конфигурация Skulpt
            Sk.configure({
                output: outf, // Функция для перехвата вывода
                read: builtinRead, // Функция для загрузки стандартной библиотеки
                // Включаем поддержку асинхронности
                __future__: Sk.python3
            });
            
            // Выполнение кода: Sk.misceval.asyncToPromise оборачивает асинхронное выполнение
            await Sk.misceval.asyncToPromise(function() {
                return Sk.importMainWithBody("<stdin>", false, code, true);
            });

            // Установка вывода
            outputArea.textContent = currentOutput.trim();
            outputTitle.textContent = 'Вывод консоли';
            outputIcon.innerHTML = `<svg class="w-6 h-6 mr-2 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`;
            
            statusMessage.textContent = 'Код выполнен успешно.';
            statusMessage.classList.remove('text-yellow-500', 'text-error');
            statusMessage.classList.add('text-success');

        } catch (err) {
            // Установка вывода ошибки
            outputArea.textContent = err.toString();
            
            // Установка статуса ошибки
            outputTitle.textContent = 'Ошибка выполнения';
            outputIcon.innerHTML = `<svg class="w-6 h-6 mr-2 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
            
            statusMessage.textContent = 'Произошла ошибка при выполнении кода.';
            statusMessage.classList.remove('text-yellow-500', 'text-success');
            statusMessage.classList.add('text-error');

        } finally {
            runButton.disabled = false;
            runButton.classList.remove('opacity-50', 'cursor-not-allowed');
            runButton.classList.add('hover:bg-brand-hover');
        }
    }

    // 4. Функция для загрузки стандартной библиотеки Skulpt (обязательна)
    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }

    // 5. Запуск слушателя событий
    runButton.addEventListener('click', runCode);
    statusMessage.textContent = 'Редактор готов к работе.';
    statusMessage.classList.remove('text-yellow-500');
    statusMessage.classList.add('text-success');
});