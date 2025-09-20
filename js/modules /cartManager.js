// js/modules/cartManager.js

export function setupCart() {
    const cartButtons = document.querySelectorAll('.product-card__add-to-cart-button');
    const cartCount = document.querySelector('.main-header__cart-count');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.querySelector('.modal-body.cart-sidebar__items');
    const cartTotalElement = document.querySelector('.cart-sidebar__total span');
    const checkoutButton = document.querySelector('.cart-sidebar__checkout-button');

    let cartItems = [];

    // Función para agregar productos al carrito
    cartButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const title = productCard.querySelector('.product-card__title').textContent;
            const priceText = productCard.querySelector('.product-card__price').textContent;
            const price = parseFloat(priceText.replace('$', '').replace(',', '').replace(' MXN', ''));
            const image = productCard.querySelector('.product-card__image').src;
            
            const existingItemIndex = cartItems.findIndex(item => item.title === title);
            
            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].quantity += 1;
            } else {
                cartItems.push({
                    id: Date.now() + index,
                    title: title,
                    price: price,
                    quantity: 1,
                    image: image
                });
            }
            
            updateCartCount();
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
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
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
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
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
            return 0.12;
        } else if (totalItems > 2) {
            return 0.10;
        }
        return 0;
    }

    // Función para eliminar producto del carrito
    function removeFromCart(itemId) {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            if (cartItems[itemIndex].quantity > 1) {
                cartItems[itemIndex].quantity -= 1;
            } else {
                cartItems.splice(itemIndex, 1);
            }
            
            updateCartCount();
            
            if (document.querySelector('.modal.show')) {
                updateCartModal();
            }
            
            showNotification('Producto eliminado del carrito');
        }
    }

    // Función para actualizar el modal del carrito
    function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        
        let total = 0;
        let totalItems = 0;
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
            cartTotalElement.textContent = '$0.00 MXN';
            return;
        }
        
        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            totalItems += item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h6 class="cart-item-name">${item.title}</h6>
                    <p class="cart-item-price">$${item.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-button decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-button increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item-button" data-id="${item.id}">
                        <i data-feather="trash-2"></i>
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        const removeButtons = document.querySelectorAll('.remove-item-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
        
        const increaseButtons = document.querySelectorAll('.quantity-button.increase');
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const item = cartItems.find(i => i.id === itemId);
                if (item) {
                    item.quantity++;
                    updateCartCount();
                    updateCartModal();
                }
            });
        });

        const decreaseButtons = document.querySelectorAll('.quantity-button.decrease');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const item = cartItems.find(i => i.id === itemId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    updateCartCount();
                    updateCartModal();
                } else if (item && item.quantity === 1) {
                     removeFromCart(itemId);
                }
            });
        });

        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        const discount = calculateDiscount(totalItems);
        const discountAmount = total * discount;
        const finalTotal = total - discountAmount;
        
        cartTotalElement.textContent = `$${finalTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
        
        if (discount > 0) {
            const discountInfo = document.createElement('div');
            discountInfo.className = 'cart-sidebar__discount';
            discountInfo.innerHTML = `
                <p>Descuento aplicado: ${discount * 100}% ($${discountAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN)</p>
            `;
            cartItemsContainer.appendChild(discountInfo);
        }
    }

    cartModal.addEventListener('show.bs.modal', function() {
        updateCartModal();
    });

    checkoutButton.addEventListener('click', function() {
        if (cartItems.length === 0) {
            showNotification('El carrito está vacío');
            return;
        }
        
        showNotification('Procesando pago...');
        
        setTimeout(() => {
            cartItems = [];
            updateCartCount();
            
            const modal = bootstrap.Modal.getInstance(cartModal);
            modal.hide();
            
            showNotification('¡Pago realizado con éxito!');
        }, 2000);
    });
}