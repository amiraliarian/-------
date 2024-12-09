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

let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
    if (categoryFilter === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === categoryFilter);
        displayProducts(filteredProducts);
    }
}

function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayNotification(`${product.name} به سبد خرید اضافه شد!`);
}

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>قیمت: ${item.price} تومان</p>
        `;
        cartDiv.appendChild(cartItemDiv);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const totalPriceElement = document.createElement('p');
    totalPriceElement.textContent = `مجموع قیمت: ${totalPrice} تومان`;
    cartDiv.appendChild(totalPriceElement);
}

function displayNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

document.getElementById('category-filter').addEventListener('change', filterProducts);

if (document.getElementById('product-list')) {
    displayProducts(products);
}

if (document.getElementById('cart')) {
    displayCart();
}
