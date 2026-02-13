// Esperar a que el documento cargue
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionar la barra de navegación
    const navbar = document.querySelector('.navbar');

    // Escuchar el evento de "scroll" (cuando bajas con el mouse/dedo)
    window.addEventListener('scroll', () => {
        // Si has bajado más de 50 píxeles...
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // ...agrega la clase "scrolled"
        } else {
            navbar.classList.remove('scrolled'); // ...si subes, quítala
        }
    });

    // 2. MENÚ HAMBURGUESA (Nuevo)
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Muestra/Oculta el menú
            menuToggle.classList.toggle('is-active'); // Opcional: Para animar el botón
        });
    }
});

// === BARRA DE PROGRESO ===
window.addEventListener('scroll', () => {
    // Calculamos cuánto hemos bajado
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    
    // Calculamos la altura total del artículo
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Sacamos el porcentaje
    let scrolled = (winScroll / height) * 100;
    
    // Le pasamos ese porcentaje a la barra en CSS
    const myBar = document.getElementById("myBar");
    if (myBar) {
        myBar.style.width = scrolled + "%";
    }
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
