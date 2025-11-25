// Статичная сетка из квадратиков на фоне
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let gridSize = 25; // Размер ячейки сетки (увеличено в 1.5 раза)
let scrollY = 0;

// Устанавливаем размер canvas на всю высоту документа
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
}

updateCanvasSize();

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Цвет обводки - белый с прозрачностью
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    
    // Вычисляем начальные координаты с учетом скролла
    const startX = 0;
    const startY = 0 - (scrollY % gridSize);
    
    // Рисуем вертикальные линии
    for (let x = startX; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Рисуем горизонтальные линии
    for (let y = startY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function animate() {
    requestAnimationFrame(animate);
    drawGrid();
}

window.addEventListener('resize', () => {
    updateCanvasSize();
    drawGrid();
});

// Обновляем canvas при скролле
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    updateCanvasSize();
    drawGrid();
});

// Обновляем размер при загрузке
window.addEventListener('load', () => {
    updateCanvasSize();
    drawGrid();
});

// Начальная отрисовка
drawGrid();
animate();

// --- Логика Модального Окна (Store) ---

const modal = document.getElementById('soonModal');
const buyBtns = document.querySelectorAll('.buy-btn');
const closeBtn = document.querySelector('.close-modal');

if (modal && buyBtns.length > 0) {
    // Открытие окна при клике на ЛЮБУЮ кнопку купить
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Чтобы страница не прыгала
            modal.classList.add('active');
        });
    });

    // Закрытие по крестику
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// --- Account Page Modal Logic ---
const accountModal = document.getElementById('soonModal');
const accountCloseBtn = document.querySelector('#soonModal .close-modal');

// All account page buttons that should show "SOON" modal
const accountButtons = [
    'resetHwidBtn',
    'extendLicenseBtn',
    'activateKeyBtn',
    'promoCodesBtn',
    'purchasedGoodsBtn',
    'changePasswordBtn',
    'logoutBtn'
];

if (accountModal) {
    // Add click handlers to all account buttons
    accountButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                accountModal.classList.add('active');
            });
        }
    });

    // Close modal on X button click
    if (accountCloseBtn) {
        accountCloseBtn.addEventListener('click', () => {
            accountModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === accountModal) {
            accountModal.classList.remove('active');
        }
    });
}

// --- Логика копирования скрипта ---

function copyToClipboard(element, text) {
    // Копируем текст
    navigator.clipboard.writeText(text).then(() => {
        
        // Показываем уведомление
        const toast = document.getElementById('copyToast');
        toast.classList.add('show');

        // Визуальный эффект нажатия на кнопку
        const originalIcon = element.querySelector('i').className;
        const icon = element.querySelector('i');
        
        // Меняем иконку на галочку
        icon.className = 'fas fa-check';
        element.style.borderColor = '#4ade80';

        // Через 2 секунды возвращаем всё как было
        setTimeout(() => {
            toast.classList.remove('show');
            icon.className = originalIcon;
            element.style.borderColor = ''; // Сброс цвета рамки
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
