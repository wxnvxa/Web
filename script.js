// --- Dynamic Neo-Grid Background ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let gridSize = 32; // базовый шаг сетки
let gridOffset = 0;
const gridSpeed = 0.12;

const glowNodes = [];
const NODE_COUNT = 90;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
}

resizeCanvas();

class GlowNode {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2 + Math.random() * 3;
        this.alpha = 0;
        this.direction = 1;
        this.fadeSpeed = 0.008 + Math.random() * 0.01;
        this.floatSpeed = 0.05 + Math.random() * 0.15;
        this.delay = initial ? Math.random() * 60 : 0;
    }

    update() {
        if (this.delay > 0) {
            this.delay -= 1;
            return;
        }

        this.alpha += this.fadeSpeed * this.direction;

        if (this.alpha >= 0.9) {
            this.direction = -1;
        } else if (this.alpha <= 0) {
            this.reset();
        }

        this.y += this.floatSpeed;

        if (this.y > canvas.height + 20) {
            this.y = -20;
        }
    }

    draw() {
        ctx.save();
        ctx.shadowColor = `rgba(96, 165, 250, ${this.alpha})`;
        ctx.shadowBlur = 12;
        ctx.fillStyle = `rgba(96, 165, 250, ${this.alpha})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
    }
}

function initGlowNodes() {
    glowNodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
        glowNodes.push(new GlowNode());
    }
}

function drawGradientOverlay() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(8, 47, 73, 0.35)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScanLine() {
    const scanHeight = 160;
    const scanY = (Date.now() * 0.05) % (canvas.height + scanHeight) - scanHeight;
    const gradient = ctx.createLinearGradient(0, scanY, 0, scanY + scanHeight);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.08)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, scanY, canvas.width, scanHeight);
}

function drawGrid() {
    gridOffset = (gridOffset + gridSpeed) % gridSize;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + gridOffset, 0);
        ctx.lineTo(x + gridOffset, canvas.height);
        ctx.stroke();
    }

    for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + gridOffset);
        ctx.lineTo(canvas.width, y + gridOffset);
        ctx.stroke();
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawGradientOverlay();
    drawScanLine();

    glowNodes.forEach(node => {
        node.update();
        node.draw();
    });
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initGlowNodes();
});

// Инициализация при первой загрузке
initGlowNodes();
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
