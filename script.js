// ==========================================
// CONTROL DEL PRE-LOADER (1 VEZ POR SESIÓN)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById("preloader");
    
    if (preloader) {
        // Si el navegador recuerda que ya vimos el preloader hoy...
        if (sessionStorage.getItem("preloaderVisto")) {
            preloader.style.display = "none"; // Lo aniquilamos al instante
        } else {
            // Si es la primera vez, marcamos que ya lo vio para la próxima
            sessionStorage.setItem("preloaderVisto", "true");
            
            // (El resto de tu código del preloader y el typewriter seguirá 
            // funcionando normal y se desvanecerá cuando termine)
        }
    }
});

// Esperar a que el documento cargue
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionar la barra de navegación
    const navbar = document.querySelector('.navbar');
    const myBar = document.getElementById("myBar");
    const parallaxBg = document.getElementById("parallaxBg");
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // === UN SOLO LISTENER DE SCROLL, LIMITADO CON requestAnimationFrame ===
    // Antes había dos listeners de 'scroll' separados corriendo sin límite,
    // y uno de ellos recalculaba el layout de toda la página en cada evento.
    // Ahora se agrupa el trabajo y se ejecuta como máximo una vez por fotograma,
    // que es lo que el navegador puede dibujar de todas formas.
    let ticking = false;

    function updateOnScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // Navbar: agrega/quita la clase "scrolled" pasados los 50px
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }

        // Barra de progreso de lectura (solo existe en páginas de artículo)
        if (myBar) {
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (scrollY / height) * 100 : 0;
            myBar.style.width = scrolled + "%";
        }

        // Parallax de la sección "Pausa Visual" (reemplazo de background-attachment: fixed)
        // Se mueve mucho más lento que el resto de la página, usando transform en vez de
        // repintar el fondo — así el navegador solo compone, no recalcula la imagen.
        if (parallaxBg && !reduceMotion) {
            const rect = parallaxBg.parentElement.getBoundingClientRect();
            // Solo calcula mientras la sección está cerca de la pantalla, para no gastar de más
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const speed = 0.3;
                parallaxBg.style.transform = `translateY(${rect.top * speed}px)`;
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, { passive: true });
});

// === EFECTO FADE-IN ===
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15, /* Reacciona cuando el 15% del elemento ya entró en pantalla */
    rootMargin: "0px 0px -50px 0px" 
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target); /* Deja de vigilarlo una vez que ya apareció */
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

/* ========================================= */
/* === TERMINAL DE ACCESO (TYPEWRITER) === */
/* ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const typewriterElement = document.getElementById("typewriter");
    
    // Si no hay preloader en la página actual, ignorar y salir
    if (!preloader || !typewriterElement) return;

    // Tu frase de acceso
    const textToType = "> Ajustando presión..."; 
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            typewriterElement.innerHTML += textToType.charAt(i);
            i++;
            // AJUSTE 1: Subimos de 40ms a 60ms para un tecleo más firme y legible
            setTimeout(typeWriter, 90); 
        } else {
            // AJUSTE 2: Aumentamos a 1500ms (1.5 segundos) de pausa térmica. 
            // Aquí el navegador tiene tiempo de sobra para cargar fotos pesadas y fuentes.
            setTimeout(() => {
                preloader.classList.add("fade-out-preloader");
            }, 1500); 
        }
    }

    // Iniciar el efecto de escritura con un ligero retraso de 400ms al cargar
    setTimeout(typeWriter, 400);
});

// =========================================
// CONTROL DEL AVISO DE TELEMETRÍA (BLINDADO)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("accept-cookies");

    if (cookieBanner && acceptButton) {
        // Si el usuario YA aceptó antes, lo ocultamos de inmediato
        if (localStorage.getItem("telemetria_aceptada") === "true") {
            cookieBanner.classList.remove("show");
            cookieBanner.style.display = "none"; // Lo borramos visualmente por completo
        }

        // Cuando el usuario hace clic en "Entendido"
        acceptButton.addEventListener("click", function() {
            localStorage.setItem("telemetria_aceptada", "true");
            cookieBanner.style.opacity = "0";
            setTimeout(() => {
                cookieBanner.style.display = "none";
            }, 400); // Se desvanece suavemente
        });
    }
});