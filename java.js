// ========== CONFIGURACIÓN PERSONAL ==========
const MY_EMAIL = 'arcemejiaivan@outlook.com';
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
document.addEventListener('DOMContentLoaded', actualizarEmail);

// ========== MENÚ MÓVIL FULLSCREEN ==========
const menuToggle = document.getElementById('menu-toggle');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileLinks = document.querySelectorAll('.mobile-menu-content a');

function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    const icon = menuToggle?.querySelector('i');
    if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); }
}
function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    const icon = menuToggle?.querySelector('i');
    if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
}
if (menuToggle) menuToggle.addEventListener('click', () => {
    mobileMenuOverlay.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
});
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay?.classList.contains('active')) closeMobileMenu();
});

// ========== CARRUSEL HERO ==========
const carouselData = [
    {
        image: "url('assets/image/1.JPG')",
        title: "Web y software <br> <span class='highlight'>para negocios reales.</span>",
        description: "Landing pages a la medida y software de escritorio en Python listo para instalar. Precios claros, licencias perpetuas y soporte directo."
    },
    {
        image: "url('assets/image/2.JPG')",
        title: "Páginas web <br> <span class='highlight'>claras y funcionales.</span>",
        description: "Sitios sencillos, rápidos y que cumplen su objetivo. HTML, CSS y JS sin sobreingeniería ni frameworks innecesarios."
    },
    {
        image: "url('assets/image/3.JPG')",
        title: "Sistemas de escritorio <br> <span class='highlight'>listos para tu negocio.</span>",
        description: "POS, inventario, gestión dental y más. Licencia perpetua, sin mensualidades y funcionan sin internet."
    }
];

let currentSlide = 0, autoSlideInterval, isTransitioning = false;
const hero = document.getElementById('hero');
const heroBadge = document.getElementById('hero-badge');
const heroTitle = document.getElementById('hero-title');
const heroDescription = document.getElementById('hero-description');
const indicators = document.querySelectorAll('#carousel-indicators .indicator');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updateSlide(index) {
    if (isTransitioning || !hero || index === currentSlide) return;
    isTransitioning = true;

    const safety = setTimeout(() => { isTransitioning = false; }, 1200);

    hero.style.setProperty('--next-image', carouselData[index].image);
    hero.style.setProperty('--next-opacity', '1');
    if (heroBadge) heroBadge.innerHTML = carouselData[index].badge;
    if (heroTitle) heroTitle.innerHTML = carouselData[index].title;
    if (heroDescription) heroDescription.textContent = carouselData[index].description;
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));

    const onTransitionEnd = (e) => {
        if (e.propertyName === 'opacity' && e.target === hero) {
            clearTimeout(safety);
            hero.style.backgroundImage = carouselData[index].image;
            hero.style.setProperty('--next-opacity', '0');
            hero.removeEventListener('transitionend', onTransitionEnd);
            currentSlide = index;
            isTransitioning = false;
            resetAutoSlide();
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
    hero.style.setProperty('--next-image', 'none');
    hero.style.setProperty('--next-opacity', '0');
    resetAutoSlide();
    hero.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    hero.addEventListener('mouseleave', resetAutoSlide);
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// ========== NAVBAR SCROLL ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => { if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50); }, { passive: true });

// ========== SCROLL REVEAL ==========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ========== FALLBACK SCROLL REVEAL ==========
// Fuerza visibilidad de elementos ya visibles si el observer no dispara
function forceRevealVisible() {
    document.querySelectorAll('.reveal:not(.active)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('load', () => {
    setTimeout(forceRevealVisible, 150);
});
window.addEventListener('resize', () => {
    clearTimeout(window.__revealResizeT);
    window.__revealResizeT = setTimeout(forceRevealVisible, 200);
});

// ========== PORTFOLIO ==========
const proyectos = [
    {
        numero: "01",
        nombre: "GTR Plast — Comercializadora de resinas plásticas",
        tipo: "Sitio corporativo con catálogo de productos, formulario de contacto directo por WhatsApp, ubicación y ficha técnica por material.",
        tags: ["HTML", "CSS", "JavaScript", "Responsive"],
        url: "https://gtrplast.com.mx/",
        urlLabel: "gtrplast.com.mx",
        imagen: "assets/image/gtr.jpg"
    },
    {
        numero: "02",
        nombre: "Odontología Arce — Clínica dental",
        tipo: "Sitio para clínica dental con servicios, agenda de citas vía WhatsApp, galería y sección de ubicación. Diseño limpio y confiable.",
        tags: ["HTML", "CSS", "JavaScript", "SEO básico"],
        url: "https://odontologiaarce.com.mx",
        urlLabel: "odontologiaarce.com.mx",
        imagen: "assets/image/odontologia.JPG"
    }
];

const grid = document.getElementById('portfolio-grid');

function cargarProyectos() {
    if (!grid) return;
    grid.innerHTML = '';

    proyectos.forEach((p, i) => {
        const card = document.createElement('article');
        card.className = 'project-card reveal';
        card.style.transitionDelay = `${i * 0.12}s`;

        const urlCorta = p.urlLabel || p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

        card.innerHTML = `
            <div class="project-browser">
                <div class="browser-bar">
                    <span class="browser-dot red"></span>
                    <span class="browser-dot yellow"></span>
                    <span class="browser-dot green"></span>
                    <span class="browser-url">${urlCorta}</span>
                </div>
                <div class="project-media">
                    <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" decoding="async">
                    <div class="project-overlay">
                        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="project-visit-btn">
                            <i class="fas fa-external-link-alt"></i> Visitar sitio
                        </a>
                    </div>
                </div>
            </div>

            <div class="project-body">
                <span class="project-number">PROYECTO ${p.numero}</span>
                <h3>${p.nombre}</h3>
                <p>${p.tipo}</p>
                <div class="tags">
                    ${p.tags.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="project-footer">
                    <span class="project-status">Sitio en línea</span>
                    <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                        Ver proyecto <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    setTimeout(forceRevealVisible, 100);
}

cargarProyectos();

// ========== FORMULARIO DE CONTACTO (FORMSPREE) ==========
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const submitBtn = document.getElementById('btn-submit');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const gotcha = document.getElementById('gotcha');
        if (gotcha && gotcha.value.trim() !== '') return;

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
                body: JSON.stringify({ name: nombre, email: email, message: mensaje })
            });

            if (response.ok) {
                mostrarFeedback('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    mostrarFeedback(data.errors.map(err => err.message).join(', '), 'error');
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

// ========== BOTÓN WHATSAPP ==========
const btnWhatsapp = document.getElementById('btn-whatsapp');
if (btnWhatsapp) btnWhatsapp.addEventListener('click', () => {
    window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MSG)}`, '_blank');
});

// ========== SOFTWARE / PRODUCTOS PYTHON ==========
const softwareProductos = [
    {
        nombre: "MiTienda POS — Punto de venta para tiendas y comercios",
        descripcion: "Sistema de punto de venta ideal para abarrotes, panaderías, carnicerías, fondas, farmacias, ferreterías y cualquier negocio de mostrador. Licencia de por vida, sin mensualidades. Funciona sin internet.",
        tags: ["Python", "POS", "Escritorio"],
        imagen: "assets/image/invbas punto de venta.png",
        badge: "Nuevo",
        features: [
            "Control de fiado por cliente con abonos y saldos",
            "Cortes de caja en 2 minutos: fondo, retiros y diferencias",
            "Alertas automáticas de stock bajo",
            "Ventas a granel (kg/L) y precios de mayoreo automáticos",
            "Usuarios con roles: cajero, encargado y dueño",
            "Reportes de ventas, márgenes y productos más rentables"
        ],
        idealPara: [
            { icono: "🏪", label: "Abarrotes" },
            { icono: "🥖", label: "Panaderías" },
            { icono: "🥩", label: "Carnicerías" },
            { icono: "🌮", label: "Fondas" },
            { icono: "💊", label: "Farmacias" },
            { icono: "🔧", label: "Ferreterías" }
        ],
        precio: "Desde $900 MXN",
        mensajeWhatsApp: "Hola, tengo un negocio y me interesa *MiTienda POS*. ¿Me puedes dar más información y precio final?"
    },
    {
        nombre: "Invbas Plástico — Sistema de Inventario para Bodegas",
        descripcion: "Sistema especializado para bodegas de plásticos (PEAD, PEBD, PP, PET y más). Control en tiempo real, trazabilidad por lote y cálculo automático de utilidad. Licencia perpetua, sin mensualidades.",
        tags: ["Python", "Inventario", "Escritorio"],
        imagen: "assets/image/invbas.png",
        badge: "",
        features: [
            "Control en tiempo real: stock, entradas, salidas, ventas y mermas",
            "Trazabilidad por lote con historial completo de cada material",
            "Cálculo automático de utilidad bruta (compras vs ventas)",
            "Reportes visuales exportables a Excel",
            "Usuarios con roles (admin, supervisor, operador) y auditoría",
            "Respaldos automáticos cada 4 horas"
        ],
        idealPara: [
            { icono: "🏭", label: "Bodegas de plásticos" },
            { icono: "♻️", label: "Recicladoras" },
            { icono: "📦", label: "Distribuidoras" },
            { icono: "🧴", label: "Fábricas de envases" }
        ],
        precio: "Desde $3,500 MXN",
        mensajeWhatsApp: "Hola, me interesa *Invbas Plástico Software* (sistema de inventario para bodegas de plásticos). ¿Me puedes dar más información y precio final?"
    }
];

const softwareGrid = document.getElementById('software-grid');

function buildSoftwareProducts() {
    if (!softwareGrid) return;
    softwareGrid.innerHTML = '';

    softwareProductos.forEach((prod, i) => {
        const card = document.createElement('article');
        card.className = 'product-card reveal';
        card.style.transitionDelay = `${i * 0.1}s`;

        const featuresHTML = prod.features
            .map(f => `<li><i class="fas fa-check"></i><span>${f}</span></li>`)
            .join('');

        const badgeHTML = prod.badge
            ? `<span class="product-badge">${prod.badge}</span>`
            : '';

        const idealHTML = prod.idealPara
            ? `
                <div class="product-ideal">
                    <span class="ideal-title">Ideal para:</span>
                    <div class="ideal-chips">
                        ${prod.idealPara.map(g => `
                            <span class="ideal-chip">
                                <span class="ideal-emoji">${g.icono}</span>${g.label}
                            </span>
                        `).join('')}
                    </div>
                </div>
            `
            : '';

        card.innerHTML = `
            <div class="product-media">
                <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy" decoding="async">
                ${badgeHTML}
            </div>
            <div class="product-body">
                <div class="tags">${prod.tags.map(t => `<span>${t}</span>`).join('')}</div>
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <ul class="product-features">${featuresHTML}</ul>
                ${idealHTML}
                <div class="product-price">
                    <span class="price-label">Precio</span>
                    <span class="price-value">${prod.precio}</span>
                </div>
                <div class="product-actions">
                    <button type="button" class="btn-buy" data-index="${i}">
                        <i class="fab fa-whatsapp"></i> Comprar
                    </button>
                    <button type="button" class="btn-demo" data-index="${i}">
                        <i class="fas fa-desktop"></i> Ver demo
                    </button>
                </div>
            </div>
        `;

        softwareGrid.appendChild(card);
    });

    softwareGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    setTimeout(forceRevealVisible, 100);

    // Botones comprar
    softwareGrid.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', () => {
            const prod = softwareProductos[btn.dataset.index];
            const msg = prod.mensajeWhatsApp || `Hola, me interesa el sistema ${prod.nombre}.`;
            window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
        });
    });

    // Botones demo
    softwareGrid.querySelectorAll('.btn-demo').forEach(btn => {
        btn.addEventListener('click', () => {
            const prod = softwareProductos[btn.dataset.index];
            const msg = `Hola, me gustaría ver una demo del sistema *${prod.nombre}*. ¿Cuándo podemos agendar?`;
            window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
        });
    });
}

buildSoftwareProducts();

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

    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    if (acceptBtn) acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-consent', 'accepted');
        banner.classList.remove('show');
    });
    if (rejectBtn) rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-consent', 'rejected');
        banner.classList.remove('show');
    });
})();

// ========== INVBAS DENTAL - BOTONES WHATSAPP ==========
(function() {
    const MSG_BUY = 'Hola, me interesa *INVBAS DENTAL* (sistema integral para consultorios dentales con cumplimiento NOM-024) por $6,500 MXN. ¿Me puedes dar más información para adquirirlo?';
    const MSG_DEMO = 'Hola, me gustaría ver una *demo de INVBAS DENTAL* antes de comprar. ¿Cuándo podemos agendar?';

    const buyBtn = document.getElementById('dental-buy');
    const demoBtn = document.getElementById('dental-demo');
    const buyBottom = document.getElementById('dental-buy-bottom');

    if (buyBtn) buyBtn.addEventListener('click', () =>
        window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(MSG_BUY)}`, '_blank')
    );
    if (buyBottom) buyBottom.addEventListener('click', () =>
        window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(MSG_BUY)}`, '_blank')
    );
    if (demoBtn) demoBtn.addEventListener('click', () =>
        window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(MSG_DEMO)}`, '_blank')
    );
})();

// ========== INVBAS DENTAL - TOGGLE "VER MÁS" ==========
(function() {
    const toggleBtn = document.getElementById('dental-toggle');
    const details = document.getElementById('dental-details');
    if (!toggleBtn || !details) return;

    const toggleText = toggleBtn.querySelector('.toggle-text');
    const MOBILE_BREAKPOINT = 1000;

    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function setOpen(open) {
        if (open) {
            details.classList.add('is-open');
            toggleBtn.classList.add('is-open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            if (toggleText) toggleText.textContent = 'Ver menos';
        } else {
            details.classList.remove('is-open');
            toggleBtn.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            if (toggleText) toggleText.textContent = 'Ver toda la información';
        }
    }

    function applyResponsiveState() {
        if (isMobile()) {
            toggleBtn.style.display = 'inline-flex';
        } else {
            toggleBtn.style.display = 'none';
            details.classList.add('is-open');
            toggleBtn.classList.add('is-open');
        }
    }

    // Estado inicial
    applyResponsiveState();

    // Click toggle
    toggleBtn.addEventListener('click', () => {
        const isOpen = details.classList.contains('is-open');
        setOpen(!isOpen);
    });

    // Al redimensionar
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (isMobile()) {
                toggleBtn.style.display = 'inline-flex';
            } else {
                toggleBtn.style.display = 'none';
                details.classList.add('is-open');
            }
        }, 200);
    });
})();