// CONFIGURACIÓN PERSONAL (cambiar por tus datos)
const MY_EMAIL = 'arcemejiaivan@outlook.com';          // ← Aquí pon tu correo real
const MY_WHATSAPP = '524422556148';
const WHATSAPP_MSG = 'Hola, vi tu portafolio y me gustaría cotizar un proyecto.';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdnydzv';

// ========== ACTUALIZAR EMAIL EN LA PÁGINA ==========
function actualizarEmail() {
    const link = document.getElementById('direct-email-link');
    if (link) {
        link.href = `mailto:${MY_EMAIL}`;
        link.textContent = MY_EMAIL;
    }
}
// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', actualizarEmail);

// ========== MENÚ MÓVIL FULLSCREEN ==========
const menuToggle = document.getElementById('menu-toggle');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileLinks = document.querySelectorAll('.mobile-menu-content a');

function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    const icon = menuToggle.querySelector('i');
    if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); }
}
function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    const icon = menuToggle.querySelector('i');
    if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
}
if (menuToggle) menuToggle.addEventListener('click', () => {
    mobileMenuOverlay.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
});
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) closeMobileMenu();
});

// ========== CARRUSEL HERO ==========
const carouselData = [
    { image: "url('assets/image/1.JPG')", badge: "🚀 2 años creando landing pages", title: "Landing pages <br> <span class='highlight'>claras y funcionales.</span>", description: "Freelancer front-end con 2 años de experiencia. Me enfoco en lo que sé hacer bien: páginas sencillas, rápidas y que cumplen su objetivo." },
    { image: "url('assets/image/2.JPG')", badge: "Sin sobreingeniería", title: "Solo HTML, CSS, JS <span class='highlight'>y algo de Python</span>", description: "Nada de frameworks pesados. Código que entiendes y que carga al instante." },
    { image: "url('assets/image/3.JPG')", badge: "Proyectos a tu medida", title: "Landing que <span class='highlight'>convierte visitantes</span> en clientes", description: "Diseño pensado en tu negocio, sin distracciones ni complejidades." }
];
let currentSlide = 0, autoSlideInterval, isTransitioning = false;
const hero = document.getElementById('hero'), heroBadge = document.getElementById('hero-badge'), heroTitle = document.getElementById('hero-title'), heroDescription = document.getElementById('hero-description'),
      indicators = document.querySelectorAll('#carousel-indicators .indicator'), prevBtn = document.getElementById('prev-btn'), nextBtn = document.getElementById('next-btn');

function updateSlide(index) {
    if (isTransitioning || !hero || index === currentSlide) return;
    isTransitioning = true;
    hero.style.setProperty('--next-image', carouselData[index].image);
    hero.style.setProperty('--next-opacity', '1');
    if (heroBadge) heroBadge.innerHTML = carouselData[index].badge;
    if (heroTitle) heroTitle.innerHTML = carouselData[index].title;
    if (heroDescription) heroDescription.textContent = carouselData[index].description;
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
    const onTransitionEnd = (e) => {
        if (e.propertyName === 'opacity' && e.target === hero) {
            hero.style.backgroundImage = carouselData[index].image;
            hero.style.setProperty('--next-opacity', '0');
            hero.removeEventListener('transitionend', onTransitionEnd);
            currentSlide = index; isTransitioning = false; resetAutoSlide();
        }
    };
    hero.addEventListener('transitionend', onTransitionEnd);
}
function nextSlide() { updateSlide((currentSlide + 1) % carouselData.length); }
function prevSlide() { updateSlide((currentSlide - 1 + carouselData.length) % carouselData.length); }
function resetAutoSlide() { clearInterval(autoSlideInterval); autoSlideInterval = setInterval(nextSlide, 5000); }
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
indicators.forEach((ind, idx) => ind.addEventListener('click', () => updateSlide(idx)));
if (hero) {
    hero.style.backgroundImage = carouselData[0].image;
    hero.style.setProperty('--next-image', 'none'); hero.style.setProperty('--next-opacity', '0');
    resetAutoSlide();
    hero.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    hero.addEventListener('mouseleave', resetAutoSlide);
}
document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') prevSlide(); if (e.key === 'ArrowRight') nextSlide(); });

// ========== NAVBAR SCROLL ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => { if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50); }, { passive: true });

// ========== SCROLL REVEAL ==========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ========== PORTFOLIO ==========
const proyectos = [
    { nombre: "Sitio web para Comercializadora de resinas plásticas", tipo: "Página de productos con WhatsApp, ubicación, email...", tags: ["HTML","CSS","JavaScript"], url: "https://gtrplast.com.mx/", imagen: "assets/image/gtr.jpg" },
    { nombre: "Sitio web para clínica dental", tipo: "Página de servicios con WhatsApp, ubicación, email...", tags: ["HTML","CSS","JavaScript"], url: "https://odontologiaarce.com.mx", imagen: "assets/image/odontologia.JPG" }
];
const grid = document.getElementById('portfolio-grid');
function cargarProyectos() {
    if (!grid) return;
    proyectos.forEach((p, i) => {
        const card = document.createElement('div'); card.className = 'project-card reveal'; card.style.transitionDelay = `${i * 0.1}s`;
        card.innerHTML = `<img src="${p.imagen}" class="project-img" alt="${p.nombre}" loading="lazy"><div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div><h3 style="margin:12px 0 5px;font-size:1.25rem;">${p.nombre}</h3><p style="color:#A0A0B0;font-size:0.85rem">${p.tipo}</p><a href="${p.url}" target="_blank" rel="noopener noreferrer" class="project-link">Ver proyecto <i class="fas fa-arrow-right"></i></a>`;
        grid.appendChild(card);
    });
    document.querySelectorAll('.project-card.reveal').forEach(el => revealObserver.observe(el));
}
cargarProyectos();

// ========== FORMULARIO DE CONTACTO (FORMSPREE) ==========
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const submitBtn = document.getElementById('btn-submit');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (!nombre || !email || !mensaje) {
            mostrarFeedback('Por favor completa todos los campos.', 'error');
            return;
        }
        if (!validarEmail(email)) {
            mostrarFeedback('Ingresa un correo electrónico válido.', 'error');
            return;
        }
        
        // Deshabilitar botón y mostrar estado
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Enviando...';
        }
        
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nombre,
                    email: email,
                    message: mensaje
                })
            });
            
            if (response.ok) {
                mostrarFeedback('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    mostrarFeedback(data.errors.map(error => error.message).join(', '), 'error');
                } else {
                    mostrarFeedback('Error al enviar. Por favor intenta de nuevo más tarde.', 'error');
                }
            }
        } catch (error) {
            mostrarFeedback('Error de conexión. Revisa tu internet e inténtalo de nuevo.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Correo';
            }
            setTimeout(() => { if (formFeedback) formFeedback.style.display = 'none'; }, 6000);
        }
    });
}

function mostrarFeedback(mensaje, tipo) {
    if (!formFeedback) return;
    formFeedback.textContent = mensaje;
    formFeedback.className = `form-feedback ${tipo}`;
    formFeedback.style.display = 'block';
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Botón de WhatsApp
const btnWhatsapp = document.getElementById('btn-whatsapp');
if (btnWhatsapp) btnWhatsapp.addEventListener('click', () => window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MSG)}`, '_blank'));

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href'); if (href === "#") return;
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// ========== CARRUSEL DE SOFTWARE ==========
const softwareProyectos = [
    { nombre: "Registro de Residuos Industriales", descripcion: "Sistema que permite registrar, clasificar y generar reportes de residuos no peligrosos. Incluye dashboard de KPIs.", tags: ["Python","Tkinter","SQLite"], imagen: "assets/image/residuos.jpg" },
    { nombre: "Control de Inventario, Entradas, Ventas y Reportes", descripcion: "Programa que registra entradas/salidas de material, Ventas, Reportes y actualiza inventario en tiempo real.", tags: ["Python","Tkinter","SQLite"], imagen: "assets/image/bascula.jpg" }
];
const swCarousel = document.getElementById('software-carousel'), swPrevBtn = document.getElementById('sw-prev-btn'), swNextBtn = document.getElementById('sw-next-btn'), swIndicators = document.getElementById('sw-indicators');
let swCurrent = 0, swAutoInterval;
function buildSoftwareCarousel() {
    if (!swCarousel) return;
    swCarousel.innerHTML = ''; swIndicators.innerHTML = '';
    softwareProyectos.forEach((proj, i) => {
        const slide = document.createElement('div'); slide.className = 'sw-slide';
        slide.innerHTML = `<img src="${proj.imagen}" alt="${proj.nombre}" loading="lazy"><div class="tags">${proj.tags.map(t => `<span>${t}</span>`).join('')}</div><h3>${proj.nombre}</h3><p>${proj.descripcion}</p>`;
        swCarousel.appendChild(slide);
        const dot = document.createElement('button'); dot.className = 'indicator'; dot.dataset.index = i; dot.addEventListener('click', () => goToSlide(i));
        swIndicators.appendChild(dot);
    });
    updateSoftwareCarousel(); startAutoSlideSW();
}
function updateSoftwareCarousel() { swCarousel.style.transform = `translateX(-${swCurrent * 100}%)`; document.querySelectorAll('#sw-indicators .indicator').forEach((dot, i) => dot.classList.toggle('active', i === swCurrent)); }
function goToSlide(index) { swCurrent = index; updateSoftwareCarousel(); resetAutoSlideSW(); }
function nextSlideSW() { swCurrent = (swCurrent + 1) % softwareProyectos.length; updateSoftwareCarousel(); resetAutoSlideSW(); }
function prevSlideSW() { swCurrent = (swCurrent - 1 + softwareProyectos.length) % softwareProyectos.length; updateSoftwareCarousel(); resetAutoSlideSW(); }
function startAutoSlideSW() { clearInterval(swAutoInterval); swAutoInterval = setInterval(nextSlideSW, 6000); }
function resetAutoSlideSW() { clearInterval(swAutoInterval); startAutoSlideSW(); }
if (swPrevBtn) swPrevBtn.addEventListener('click', prevSlideSW);
if (swNextBtn) swNextBtn.addEventListener('click', nextSlideSW);
const swContainer = document.querySelector('.software-carousel-container');
if (swContainer) {
    swContainer.addEventListener('mouseenter', () => clearInterval(swAutoInterval));
    swContainer.addEventListener('mouseleave', startAutoSlideSW);
}
if (softwareProyectos.length) buildSoftwareCarousel();

// ========== SCROLL TO TOP ==========
const scrollTopBtn = document.getElementById('scroll-top-btn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('show', window.scrollY > 500), { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========== COOKIES ==========
(function() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    if (!localStorage.getItem('cookies-consent')) banner.classList.add('show');
    document.getElementById('cookie-accept').addEventListener('click', () => { localStorage.setItem('cookies-consent', 'accepted'); banner.classList.remove('show'); });
    document.getElementById('cookie-reject').addEventListener('click', () => { localStorage.setItem('cookies-consent', 'rejected'); banner.classList.remove('show'); });
})();