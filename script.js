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

