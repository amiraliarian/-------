const products = [
    { id: 1, name: 'گوشی هوشمند', category: 'electronics', price: 3000000 },
    { id: 2, name: 'تلویزیون', category: 'electronics', price: 8000000 },
    { id: 3, name: 'تی‌شرت', category: 'clothing', price: 100000 },
    { id: 4, name: 'شلوار جین', category: 'clothing', price: 200000 },
    { id: 5, name: 'پیتزا', category: 'food', price: 50000 },
    { id: 6, name: 'نوشابه', category: 'food', price: 10000 },
    { id: 7, name: 'لپ‌تاپ', category: 'electronics', price: 10000000 },
    { id: 8, name: 'دوربین عکاسی', category: 'electronics', price: 4500000 },
    { id: 9, name: 'کتونی', category: 'clothing', price: 300000 },
    { id: 10, name: 'کت', category: 'clothing', price: 500000 },
    { id: 11, name: 'چیپس', category: 'food', price: 15000 },
    { id: 12, name: 'بستنی', category: 'food', price: 20000 }
];

let cart = [];

function displayProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>قیمت: ${product.price} تومان</p>
            <button onclick="addToCart(${product.id})">اضافه به سبد</button>
        `;
        productList.appendChild(productDiv);
    });
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const filteredProducts = categoryFilter === 'all'
        ? products
        : products.filter(product => product.category === categoryFilter);
    displayProducts(filteredProducts);
}

function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayNotification(`${product.name} به سبد خرید اضافه شد`);
        updateCartDisplay();
    }
}

function displayNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.innerHTML = `${message} <br> <button onclick="hideNotification(); openCart()">رفتن به سبد خرید</button> <button onclick="hideNotification(); removeLastItem()">حذف محصول</button>`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}

function removeLastItem() {
    cart.pop();
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function openCart() {
    updateCartDisplay();
    const modal = document.getElementById('cart-modal');
    modal.style.display = "block";
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'cart-item';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>قیمت: ${product.price} تومان</p>
            <p>تعداد: 
                <button onclick="decreaseQuantity(${product.id})">-</button>
                ${product.quantity}
                <button onclick="increaseQuantity(${product.id})">+</button>
            </p>
            <button onclick="removeFromCart(${product.id})">حذف</button>
        `;
        cartContainer.appendChild(productElement);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalPriceElement = document.createElement('p');
    totalPriceElement.textContent = `مجموع قیمت: ${totalPrice} تومان`;
    cartContainer.appendChild(totalPriceElement);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity--;
    } else {
        removeFromCart(productId);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity++;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// مدیریت مدال
var modal = document.getElementById("cart-modal");
var btn = document.getElementById("cart-button");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    openCart();
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('category-filter').addEventListener('change', filterProducts);

window.onload = function() {
    localStorage.removeItem('cart');
    displayProducts(products);
}

document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    document.body.classList.toggle('blurred');
});
