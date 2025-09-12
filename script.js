document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const cartButton = document.querySelector('.main-header__cart-button');
    const closeCartButton = document.querySelector('.cart-sidebar__close-button');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    const addToCartButtons = document.querySelectorAll('.product-card__add-to-cart-button');
    const cartItemsContainer = document.querySelector('.cart-sidebar__items');
    const cartTotalElement = document.querySelector('.cart-sidebar__total span');
    const cartCount = document.querySelector('.main-header__cart-count');
    const videoPlayButton = document.querySelector('.banner-section__video-play-button');
    const backgroundVideo = document.querySelector('.banner-section__background-video');
    const currentYearSpan = document.getElementById('current-year');

    // Elementos del header para el efecto de scroll
    const miniHeader = document.getElementById('miniHeader');
    const mainHeader = document.getElementById('mainHeader');
    const scrollThreshold = 30; // Píxeles a desplazar antes de la transición

    // Estado del carrito
    let cart = [];

    // --- Funcionalidad del Header con Scroll ---
    // Establecer el padding inicial del body que acomode la altura de ambos headers
    function setBodyPadding() {
        const miniHeaderHeight = miniHeader.offsetHeight;
        // La altura del mainHeader se obtiene dinámicamente, lo que incluye
        // su altura normal o su altura encogida cuando tiene la clase --scrolled.
        const mainHeaderHeight = mainHeader.offsetHeight;

        // El padding-top del body siempre será la suma de las alturas actuales de ambos headers.
        // Esto asegura que el contenido principal siempre esté debajo de ambos headers,
        // sin importar si el main-header está encogido o no.
        document.body.style.paddingTop = `${miniHeaderHeight + mainHeaderHeight}px`;
    }

    // Llama a la función al cargar la página para establecer el padding inicial
    setBodyPadding();
    // Llama a la función también al redimensionar la ventana para ajustar si cambian las alturas
    window.addEventListener('resize', setBodyPadding);

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            mainHeader.classList.add('main-header--scrolled');
        } else {
            mainHeader.classList.remove('main-header--scrolled');
        }
        // Siempre recalcula el padding-top del body para ajustarse a los cambios de altura
        setBodyPadding();
    });


    // --- Funcionalidad del Carrito ---
    // Toggle del carrito
    function toggleCart() {
        const isOpen = cartSidebar.classList.contains('cart-sidebar--open');
        if (isOpen) {
            cartSidebar.classList.remove('cart-sidebar--open');
            overlay.classList.remove('overlay--active');
            overlay.setAttribute('aria-hidden', 'true');
        } else {
            cartSidebar.classList.add('cart-sidebar--open');
            overlay.classList.add('overlay--active');
            overlay.setAttribute('aria-hidden', 'false');
        }
    }

    // Añadir producto al carrito
    function addToCart(event) {
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('.product-card__title').textContent;
        const productPrice = productCard.querySelector('.product-card__price').textContent;
        const productImage = productCard.querySelector('.product-card__image').src;

        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: parseFloat(productPrice.replace(/[^0-9.]/g, '')),
                image: productImage,
                quantity: 1
            });
        }

        updateCart();
        toggleCart(); // Abre el carrito automáticamente al añadir

        // Feedback visual
        const button = event.target;
        const originalText = button.textContent;
        const originalBgColor = button.style.backgroundColor;

        button.textContent = '✓ Añadido';
        button.style.backgroundColor = '#4CAF50';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalBgColor;
        }, 2000);
    }

    // Actualizar el carrito en la UI
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)} MXN</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-button minus" data-name="${item.name}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-button plus" data-name="${item.name}">+</button>
                    </div>
                </div>
                <button class="remove-item-button" data-name="${item.name}" aria-label="Eliminar ${item.name} del carrito">
                    <i data-feather="trash-2"></i>
                </button>
            `;

            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotalElement.textContent = `$${total.toFixed(2)} MXN`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        feather.replace();

        document.querySelectorAll('.quantity-button.minus').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });

        document.querySelectorAll('.quantity-button.plus').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });

        document.querySelectorAll('.remove-item-button').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    function increaseQuantity(event) {
        const productName = event.target.closest('button').getAttribute('data-name');
        const item = cart.find(item => item.name === productName);
        if (item) {
            item.quantity += 1;
            updateCart();
        }
    }

    function decreaseQuantity(event) {
        const productName = event.target.closest('button').getAttribute('data-name');
        const item = cart.find(item => item.name === productName);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.name !== productName);
            }
            updateCart();
        }
    }

    function removeItem(event) {
        const productName = event.target.closest('button').getAttribute('data-name');
        cart = cart.filter(item => item.name !== productName);
        updateCart();
    }

    // --- Control de Video ---
    function toggleVideoPlayback() {
        if (backgroundVideo.paused) {
            backgroundVideo.play();
            videoPlayButton.setAttribute('hidden', '');
        } else {
            backgroundVideo.pause();
            videoPlayButton.removeAttribute('hidden');
        }
    }

    function checkAutoplay() {
        const promise = backgroundVideo.play();
        if (promise !== undefined) {
            promise.catch(error => {
                videoPlayButton.removeAttribute('hidden');
                feather.replace();
            });
        }
    }

    // --- Event Listeners Globales ---
    cartButton.addEventListener('click', toggleCart);
    closeCartButton.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && cartSidebar.classList.contains('cart-sidebar--open')) {
            toggleCart();
        }
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    videoPlayButton.addEventListener('click', toggleVideoPlayback);
    backgroundVideo.addEventListener('click', toggleVideoPlayback);

    backgroundVideo.addEventListener('ended', () => {
        backgroundVideo.currentTime = 0;
        backgroundVideo.play();
    });

    currentYearSpan.textContent = new Date().getFullYear();

    checkAutoplay();

    // Polyfill para aspect-ratio
    if (!('aspectRatio' in document.documentElement.style)) {
        const containers = document.querySelectorAll('.product-card__image-container, .banner-section__video-container');
        containers.forEach(container => {
            if (container.classList.contains('product-card__image-container')) {
                container.style.height = container.offsetWidth + 'px';
            } else if (container.classList.contains('banner-section__video-container')) {
                container.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
                container.style.height = '0';
                container.style.position = 'relative';
            }
        });

        window.addEventListener('resize', () => {
            const productContainers = document.querySelectorAll('.product-card__image-container');
            productContainers.forEach(container => {
                container.style.height = container.offsetWidth + 'px';
            });
        });
    }

    // --- Funcionalidad del Modo Oscuro ---
    const themeToggleButton = document.getElementById('theme-toggle');

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        if (themeToggleButton) {
            themeToggleButton.innerHTML = '<i data-feather="sun"></i>';
            feather.replace();
        }
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        if (themeToggleButton) {
            themeToggleButton.innerHTML = '<i data-feather="moon"></i>';
            feather.replace();
        }
        localStorage.setItem('theme', 'light');
    }

    function toggleTheme() {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
});