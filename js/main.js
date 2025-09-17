// Manejar el comportamiento del header al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const miniHeader = document.getElementById('miniHeader');
    const mainHeader = document.getElementById('mainHeader');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            document.body.classList.add('scrolled');
        } else {
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
    let cartItems = [];
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.querySelector('.cart-sidebar__items');
    const cartTotalElement = document.querySelector('.cart-sidebar__total span');

    // Funcionalidad del menú lateral
    const menuButton = document.querySelector('.main-header__menu-button');
    const menuCloseButton = document.querySelector('.side-menu__close-button');
    const sideMenu = document.getElementById('sideMenu');

    // Abrir menú lateral
    menuButton.addEventListener('click', function() {
        sideMenu.classList.add('side-menu--open');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar menú lateral
    menuCloseButton.addEventListener('click', function() {
        sideMenu.classList.remove('side-menu--open');
        document.body.style.overflow = 'auto';
    });

    // Cerrar menú al hacer clic fuera de él
    sideMenu.addEventListener('click', function(e) {
        if (e.target === sideMenu) {
            sideMenu.classList.remove('side-menu--open');
            document.body.style.overflow = 'auto';
        }
    });

    // Función para agregar productos al carrito
    cartButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const title = productCard.querySelector('.product-card__title').textContent;
            const priceText = productCard.querySelector('.product-card__price').textContent;
            const price = parseFloat(priceText.replace('$', '').replace(',', '').replace(' MXN', ''));
            const image = productCard.querySelector('.product-card__image').src;
            
            // Verificar si el producto ya está en el carrito
            const existingItemIndex = cartItems.findIndex(item => item.title === title);
            
            if (existingItemIndex !== -1) {
                // Si ya existe, incrementar la cantidad
                cartItems[existingItemIndex].quantity += 1;
            } else {
                // Si no existe, agregar nuevo producto
                cartItems.push({
                    id: Date.now() + index, // ID único
                    title: title,
                    price: price,
                    quantity: 1,
                    image: image
                });
            }
            
            // Actualizar contador del carrito
            updateCartCount();
            
            // Mostrar notificación de producto agregado
            showNotification('Producto agregado al carrito');
        });
    });

    // Función para actualizar el contador del carrito
    function updateCartCount() {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Función para mostrar notificaciones
    function showNotification(message) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Agregar estilos
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#000';
        notification.style.color = '#fff';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '10000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        
        // Agregar al documento
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Función para calcular el descuento
    function calculateDiscount(totalItems) {
        if (totalItems > 3) {
            return 0.12; // 12% de descuento para más de 3 artículos
        } else if (totalItems > 2) {
            return 0.10; // 10% de descuento para más de 2 artículos
        }
        return 0;
    }

    // Función para eliminar producto del carrito
    function removeFromCart(itemId) {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            if (cartItems[itemIndex].quantity > 1) {
                // Si hay más de uno, reducir la cantidad
                cartItems[itemIndex].quantity -= 1;
            } else {
                // Si solo hay uno, eliminar el producto
                cartItems.splice(itemIndex, 1);
            }
            
            // Actualizar contador del carrito
            updateCartCount();
            
            // Actualizar modal si está abierto
            if (document.querySelector('.modal.show')) {
                updateCartModal();
            }
            
            // Mostrar notificación
            showNotification('Producto eliminado del carrito');
        }
    }

    // Función para actualizar el modal del carrito
    function updateCartModal() {
        // Limpiar contenedor de items
        cartItemsContainer.innerHTML = '';
        
        let total = 0;
        let totalItems = 0;
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
            cartTotalElement.textContent = '$0.00 MXN';
            return;
        }
        
        // Calcular total y agregar items al modal
        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            totalItems += item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-sidebar__item';
            cartItem.innerHTML = `
                <div class="cart-sidebar__item-image">
                    <img src="${item.image}" alt="${item.title}" width="60" height="60">
                </div>
                <div class="cart-sidebar__item-details">
                    <h6 class="cart-sidebar__item-title">${item.title}</h6>
                    <p class="cart-sidebar__item-price">$${item.price.toLocaleString('es-MX')} MXN x ${item.quantity}</p>
                    <p class="cart-sidebar__item-total">Subtotal: $${itemTotal.toLocaleString('es-MX')} MXN</p>
                </div>
                <div class="cart-sidebar__item-actions">
                    <button class="cart-sidebar__remove-button" data-id="${item.id}">
                        <i data-feather="trash-2"></i>
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Agregar event listeners a los botones de eliminar
        const removeButtons = document.querySelectorAll('.cart-sidebar__remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
        
        // Reemplazar iconos feather
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        // Calcular descuento
        const discount = calculateDiscount(totalItems);
        const discountAmount = total * discount;
        const finalTotal = total - discountAmount;
        
        // Actualizar total en el modal
        cartTotalElement.textContent = `$${finalTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
        
        // Mostrar información de descuento si aplica
        if (discount > 0) {
            const discountInfo = document.createElement('div');
            discountInfo.className = 'cart-sidebar__discount';
            discountInfo.innerHTML = `
                <p>Descuento aplicado: ${discount * 100}% ($${discountAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN)</p>
            `;
            cartItemsContainer.appendChild(discountInfo);
        }
    }

    // Actualizar el modal del carrito cuando se abra
    cartModal.addEventListener('show.bs.modal', function() {
        updateCartModal();
    });

    // Botón de proceder al pago
    const checkoutButton = document.querySelector('.cart-sidebar__checkout-button');
    checkoutButton.addEventListener('click', function() {
        if (cartItems.length === 0) {
            showNotification('El carrito está vacío');
            return;
        }
        
        // Aquí iría la lógica de checkout
        showNotification('Procesando pago...');
        
        // Simular proceso de pago
        setTimeout(() => {
            // Limpiar carrito después del pago
            cartItems = [];
            updateCartCount();
            
            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(cartModal);
            modal.hide();
            
            showNotification('¡Pago realizado con éxito!');
        }, 2000);
    });

    // Actualizar año actual
    document.getElementById('current-year').textContent = new Date().getFullYear();
});