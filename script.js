// Эффект квадратиков на фоне (не закреплены к экрану)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let squaresArray;
let scrollY = 0;

// Устанавливаем размер canvas на всю высоту документа
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
}

updateCanvasSize();

class Square {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height; // Размещаем по всей высоте контента
        this.size = 20 + Math.random() * 40; // Размер от 20 до 60px
        this.speed = 0.1 + Math.random() * 0.3;
    }

    draw() {
        // Рисуем квадратик с учетом скролла (не закреплен к экрану)
        const drawY = this.y - scrollY;
        
        // Рисуем только если квадратик виден на экране
        if (drawY > -this.size && drawY < window.innerHeight + this.size) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x, drawY, this.size, this.size);
        }
    }

    update() {
        // Квадратики движутся вниз медленно
        this.y += this.speed;
        
        // Если квадратик ушел за пределы canvas, возвращаем его вверх
        if (this.y > canvas.height + this.size) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
        
        this.draw();
    }
}

function init() {
    squaresArray = [];
    // Создаем больше квадратиков для заполнения экрана
    let numberOfSquares = Math.floor((canvas.height * canvas.width) / 8000);
    for (let i = 0; i < numberOfSquares; i++) {
        squaresArray.push(new Square());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < squaresArray.length; i++) {
        squaresArray[i].update();
    }
}

window.addEventListener('resize', () => {
    updateCanvasSize();
    init();
});

// Обновляем canvas при скролле и изменении размера документа
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    updateCanvasSize();
});

// Обновляем размер при загрузке
window.addEventListener('load', () => {
    updateCanvasSize();
    init();
});

init();
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
