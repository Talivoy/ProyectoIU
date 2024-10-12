
// Datos de ejemplo para productos destacados
const featuredProducts = [
    { id: 1, name: "Producto Destacado 1", description: "Descripción del Producto 1", price: 15.000 },
    { id: 2, name: "Producto Destacado 2", description: "Descripción del Producto 2", price: 15.000 },
    { id: 3, name: "Producto Destacado 3", description: "Descripción del Producto 3", price: 15.000 },
];

// Carrito de compras
let cart = [];

// Función para cargar productos destacados
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    featuredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'bg-white shadow-md rounded-lg p-6';
        productElement.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-4">${product.description}</p>
            <div class="bg-gray-200 h-48 mb-4 flex items-center justify-center text-gray-500">Imagen del Producto</div>
            <p class="text-2xl font-bold mb-4">$${product.price.toFixed(2)}</p>
            <button class="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600" onclick="addToCart(${product.id})">Añadir al Carrito</button>
        `;
        container.appendChild(productElement);
    });
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartModal();
    }
}

// Función para actualizar el modal del carrito
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-2';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Event listeners para los botones de los modales
document.getElementById('authButton').addEventListener('click', () => {
    document.getElementById('authModal').style.display = 'flex';
});

document.getElementById('cartButton').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'flex';
});

document.getElementById('closeAuthModal').addEventListener('click', () => {
    document.getElementById('authModal').style.display = 'none';
});

document.getElementById('closeCartModal').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});

// Cargar productos destacados al iniciar la página
window.addEventListener('load', loadFeaturedProducts);