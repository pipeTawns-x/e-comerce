// Manejar el comportamiento del header al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const miniHeader = document.getElementById('miniHeader');
    const mainHeader = document.getElementById('mainHeader');
    const scrollThreshold = 50; // Cantidad de scroll para ocultar el mini header

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scroll hacia abajo - ocultar mini header
            document.body.classList.add('scrolled');
        } else {
            // Scroll hacia arriba - mostrar mini header
            if (scrollTop <= scrollThreshold) {
                document.body.classList.remove('scrolled');
            }
        }
        lastScrollTop = scrollTop;
    });

    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Funcionalidad del carrito
    const cartButtons = document.querySelectorAll('.product-card__add-to-cart-button');
    const cartCount = document.querySelector('.main-header__cart-count');
    let cartItems = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Aquí podrías agregar la lógica para agregar productos al carrito
            // y actualizar el modal correspondiente
            
            // Mostrar notificación de producto agregado
            const toast = new bootstrap.Toast(document.getElementById('addedToCartToast'));
            toast.show();
        });
    });
});