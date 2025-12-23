// === 1. ЯДРО ГЕНЕРАЦИИ КОДА ===
let blocks = [];
let robotFunction = null;

// Инициализация при загрузке
window.onload = function() {
    // Загружаем рабочий алгоритм по умолчанию
    blocks = [
        { type: 'start', code: '// Старт алгоритма' },
        { type: 'if', code: 'if (!L) {' },
        { type: 'action', code: '  return { l: 100, r: 20 };' },
        { type: 'elseif', code: '} else if (!R) {' },
        { type: 'action', code: '  return { l: 20, r: 100 };' },
        { type: 'else', code: '} else {' },
        { type: 'action', code: '  return { l: 80, r: 80 };' },
        { type: 'end', code: '}' }
    ];
    renderCode();
    initSimulation();
};

function addBlock(type, code) {
    blocks.push({ type, code });
    renderCode();
}

function clearCode() {
    blocks = [];
    renderCode();
}

function renderCode() {
    const display = document.getElementById('code-display');
    const statusLabel = document.getElementById('syntax-status');
    
    // Собираем чистый JS код из блоков
    let fullCode = blocks.map(b => b.code).join('\n');
    
    // Отображаем
    display.textContent = fullCode;

    try {
        // ВАЖНО: Мы создаем функцию, телом которой является fullCode.
        // Аргументы L, C, R будут доступны внутри этого кода.
        // eslint-disable-next-line no-new-func
        robotFunction = new Function('L', 'C', 'R', fullCode);
        
        statusLabel.textContent = "СИНТАКСИС: OK";
        statusLabel.className = "text-green-400";
        
        // Тестовый запуск (проверка на runtime ошибки)
        robotFunction(false, true, false); 
    } catch (e) {
        robotFunction = null;
        statusLabel.textContent = "ОШИБКА: " + e.message;
        statusLabel.className = "text-red-400 font-bold";
    }
}

// === 2. ФИЗИКА И КАНВАС ===
const canvas = document.getElementById('robot-canvas');
const ctx = canvas.getContext('2d');

let robot = { x: 0, y: 0, angle: 0 };
let track = { cx: 0, cy: 0, r: 0, width: 30 };

let isRunning = false;
let animationFrame;
let startTime = 0;

function initSimulation() {
    resizeCanvas();
    resetRobot();
    draw();
    window.addEventListener('resize', () => { resizeCanvas(); draw(); });
}

function resizeCanvas() {
    const container = document.getElementById('robot-track-container');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    track.cx = canvas.width / 2;
    track.cy = canvas.height / 2;
    track.r = Math.min(track.cx, track.cy) - 50;
}

function resetRobot() {
    // Ставим робота на верхнюю точку круга
    robot.x = track.cx;
    robot.y = track.cy - track.r;
    robot.angle = 0; // Направлен вправо (0 радиан)
    
    // Если трасса круглая, касательная сверху направлена горизонтально
    // 0 радиан в canvas обычно вправо.
    
    isRunning = false;
    cancelAnimationFrame(animationFrame);
    document.getElementById('timer').textContent = "0.000";
    document.getElementById('run-btn').classList.remove('opacity-50', 'cursor-not-allowed');
    draw();
}

// Получение данных сенсоров в мировых координатах
function getSensors() {
    const sensorDist = 15; // от центра робота вперед
    const sensorWidth = 10; // расстояние между левым и правым
    
    // Координаты относительно центра робота
    const sensorsRel = [
        { x: sensorDist, y: -sensorWidth }, // Левый (Left)
        { x: sensorDist, y: 0 },            // Центр (Center)
        { x: sensorDist, y: sensorWidth }   // Правый (Right)
    ];

    return sensorsRel.map(s => {
        // Поворот + Перенос
        const wx = robot.x + s.x * Math.cos(robot.angle) - s.y * Math.sin(robot.angle);
        const wy = robot.y + s.x * Math.sin(robot.angle) + s.y * Math.cos(robot.angle);
        
        // Проверка цвета (дистанция до центра трассы)
        const distToCenter = Math.sqrt((wx - track.cx)**2 + (wy - track.cy)**2);
        const onLine = Math.abs(distToCenter - track.r) < (track.width / 2);
        
        return { x: wx, y: wy, val: onLine }; // true = Black (на линии)
    });
}

function update() {
    if (!isRunning) return;

    const sensors = getSensors();
    // Логика: true = черный, false = белый
    const L = sensors[0].val; 
    const C = sensors[1].val;
    const R = sensors[2].val;

    let speedL = 0, speedR = 0;

    if (robotFunction) {
        try {
            const res = robotFunction(L, C, R);
            if (res) {
                speedL = res.l || 0;
                speedR = res.r || 0;
            }
        } catch (e) {
            console.error("Runtime error:", e);
            isRunning = false;
            alert("Ошибка во время выполнения кода: " + e.message);
            return;
        }
    }

    // Физика движения
    const maxSpeed = 3; // пикс/фрейм
    const vL = (speedL / 100) * maxSpeed;
    const vR = (speedR / 100) * maxSpeed;

    const v = (vL + vR) / 2;
    const omega = (vR - vL) / 20; // 20 - условная ширина базы

    robot.x += v * Math.cos(robot.angle);
    robot.y += v * Math.sin(robot.angle);
    robot.angle += omega;

    // Таймер
    const t = (performance.now() - startTime) / 1000;
    document.getElementById('timer').textContent = t.toFixed(3);

    draw();
    animationFrame = requestAnimationFrame(update);
}

function draw() {
    // Очистка
    ctx.fillStyle = "#e5e7eb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Трасса
    ctx.beginPath();
    ctx.arc(track.cx, track.cy, track.r, 0, Math.PI * 2);
    ctx.lineWidth = track.width;
    ctx.strokeStyle = "#374151";
    ctx.stroke();

    // Робот
    ctx.save();
    ctx.translate(robot.x, robot.y);
    ctx.rotate(robot.angle);
    
    // Корпус
    ctx.fillStyle = "#ef4444";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 5;
    ctx.fillRect(-10, -10, 20, 20);
    
    // Направление
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, -2, 10, 4);
    
    ctx.restore();

    // Сенсоры (отладка)
    const sensors = getSensors();
    sensors.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI*2);
        ctx.fillStyle = s.val ? "black" : "white"; // Черный если на линии
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.fill();
    });
}

// Управление кнопками
document.getElementById('run-btn').addEventListener('click', () => {
    if (!robotFunction) {
        alert("Сначала соберите корректную программу!");
        return;
    }
    if (isRunning) return;
    
    isRunning = true;
    startTime = performance.now();
    update();
    
    document.getElementById('run-btn').classList.add('opacity-50', 'cursor-not-allowed');
});

document.getElementById('reset-btn').addEventListener('click', resetRobot);