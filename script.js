// Эффект частиц на фоне
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 0.4) - 0.2;
        this.directionY = (Math.random() * 0.4) - 0.2;
        this.size = Math.random() * 2;
        this.color = '#3b82f6';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(59, 130, 246,' + opacityValue * 0.2 + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
    'downloadLauncherBtn',
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
