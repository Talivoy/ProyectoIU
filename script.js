// Datos de productos
const products = [
    {
        id: 1,
        name: "Polera Brainrot",
        description: "Polera de algodón con diseño Brainrot",
        price: 15000,
        image: "Recursos/polera1.jpg",
        category: "colecciones"
    },
    {
        id: 2,
        name: "Polera Anime",
        description: "Polera de anime edición limitada",
        price: 18000,
        image: "Recursos/polera2.jpg",
        category: "anime"
    },
    {
        id: 3,
        name: "Polera Calaca",
        description: "Polera con diseño de calaca chida",
        price: 16000,
        image: "Recursos/polera3.jpg",
        category: "calacas"
    },
    {
        id: 4,
        name: "Polera Retro",
        description: "Polera con diseño retro de los 80s",
        price: 17000,
        image: "Recursos/polera4.jpg",
        category: "retro"
    },
    {
        id: 5,
        name: "Polera Geek",
        description: "Polera con diseño para amantes de la tecnología",
        price: 16500,
        image: "Recursos/polera5.jpg",
        category: "geek"
    },
    {
        id: 6,
        name: "Polera Minimalista",
        description: "Polera con diseño minimalista y elegante",
        price: 15500,
        image: "Recursos/polera6.jpg",
        category: "minimalista"
    },
    // Agrega más productos aquí
];

// Estado del carrito
let cart = [];

// Función para formatear precio en pesos chilenos
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para cargar productos
function loadProducts(container, productList) {
    const productContainer = document.getElementById(container);
    if (!productContainer) return;

    productContainer.innerHTML = productList.map(product => `
        <div class="bg-white shadow-md rounded-lg p-6">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4">
            <h3 class="text-xl font-bold mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-4">${product.description}</p>
            <p class="text-2xl font-bold mb-4">${formatPrice(product.price)}</p>
            <select class="w-full mb-2 p-2 border rounded" id="size-${product.id}">
                <option value="">Selecciona una talla</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>
            <button 
                onclick="addToCart(${product.id})" 
                class="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
            >
                Añadir al Carrito
            </button>
        </div>
    `).join('');
}

// Función para añadir al carrito
function addToCart(productId) {
    const sizeSelect = document.getElementById(`size-${productId}`);
    const size = sizeSelect.value;
    
    if (!size) {
        alert('Por favor selecciona una talla');
        return;
    }

    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            size,
            quantity: 1
        });
    }

    updateCartUI();
}

// Función para actualizar cantidad
function updateQuantity(productId, size, change) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => !(i.id === productId && i.size === size));
        }
        updateCartUI();
    }
}

// Función para eliminar del carrito
function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    updateCartUI();
}

// Función para actualizar UI del carrito
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Actualizar items
    cartItems.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center p-2 border-b">
            <div>
                <p class="font-bold">${item.name}</p>
                <p class="text-sm">Talla: ${item.size}</p>
                <p>${formatPrice(item.price)} x ${item.quantity}</p>
            </div>
            <div class="flex items-center gap-2">
                <button 
                    onclick="updateQuantity(${item.id}, '${item.size}', -1)"
                    class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >-</button>
                <span>${item.quantity}</span>
                <button 
                    onclick="updateQuantity(${item.id}, '${item.size}', 1)"
                    class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >+</button>
                <button 
                    onclick="removeFromCart(${item.id}, '${item.size}')"
                    class="ml-2 text-red-500 hover:text-red-700"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos destacados en la página de inicio
    if (document.getElementById('featuredProducts')) {
        loadProducts('featuredProducts', products.slice(0, 3)); // Mostrar solo los primeros 3 productos
    }
    
    // Cargar todos los productos en la página de productos
    if (document.getElementById('productList')) {
        loadProducts('productList', products);
    }

    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const authButton = document.getElementById('authButton');
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const closeCartModal = document.getElementById('closeCartModal');
    const checkoutButton = document.getElementById('checkoutButton');
    let isMenuOpen = false;

    // Funcionalidad del menú móvil
    if (menuButton && mobileMenu) {
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            
            menuButton.innerHTML = isMenuOpen 
                ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                   </svg>`
                : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                   </svg>`;

            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.add('menu-open');
                }, 10);
            } else {
                mobileMenu.classList.remove('menu-open');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        }

        menuButton.addEventListener('click', toggleMenu);

        const mobileLinks = mobileMenu.getElementsByTagName('a');
        Array.from(mobileLinks).forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    toggleMenu();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                toggleMenu();
            }
        });
    }

    // Funcionalidad del modal de autenticación
    if (authButton && authModal && closeAuthModal) {
        authButton.addEventListener('click', () => {
            authModal.style.display = 'flex';
        });

        closeAuthModal.addEventListener('click', () => {
            authModal.style.display = 'none';
        });

        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.style.display = 'none';
            }
        });
    }

    // Funcionalidad del modal del carrito
    if (cartButton && cartModal && closeCartModal) {
        cartButton.addEventListener('click', () => {
            cartModal.style.display = 'flex';
        });

        closeCartModal.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });

        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            alert('Procediendo al pago...');
            // Aquí irá la lógica de pago
        });
    }

    // Inicializar UI del carrito
    updateCartUI();
});
