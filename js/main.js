// Variables globales
let currentUser = null;
let rentalData = [];

// Elementos del DOM
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const navLinks = document.querySelectorAll('.nav-menu a');
const loginForm = document.getElementById('loginForm');

// Función para inicializar la aplicación
function initApp() {
    // Configurar tema inicial
    const preferredTheme = localStorage.getItem('theme') || 'light';
    if (preferredTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Configurar eventos
    setupEventListeners();
    
    console.log('Aplicación inicializada correctamente');
}

// Configurar event listeners
function setupEventListeners() {
    // Menú hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Toggle tema oscuro
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });
    }

    // Cerrar modal al hacer click fuera
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
    }

    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Toggle menú móvil
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Bloquear scroll cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Toggle tema oscuro/claro
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme || 'light');
    
    console.log('Tema cambiado a:', newTheme || 'light');
}

// Manejar login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulación de login
    if (email && password) {
        currentUser = {
            name: 'Usuario Demo',
            email: email,
            role: 'Cliente'
        };
        
        loginBtn.textContent = 'Mi Cuenta';
        loginBtn.onclick = (e) => {
            e.preventDefault();
            window.location.href = 'perfil.html';
        };
        
        loginModal.classList.remove('active');
        showNotification('¡Bienvenido! Has iniciado sesión correctamente.');
    }
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);