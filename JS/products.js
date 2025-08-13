// Dữ liệu sản phẩm
const products = [
    {
        id: 1,
        name: "MacBook Pro M2",
        category: "laptop",
        price: 45000000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
        description: "Laptop cao cấp với chip M2 mạnh mẽ, màn hình Retina 14 inch",
        stock: 15
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        category: "phone",
        price: 28000000,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
        description: "Điện thoại thông minh mới nhất với camera 48MP",
        stock: 25
    },
    {
        id: 3,
        name: "Samsung Galaxy S24",
        category: "phone",
        price: 22000000,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
        description: "Flagship Android với AI tích hợp và camera đỉnh cao",
        stock: 20
    },
    {
        id: 4,
        name: "Dell XPS 13",
        category: "laptop",
        price: 35000000,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
        description: "Ultrabook mỏng nhẹ với hiệu năng cao và thiết kế đẹp",
        stock: 12
    },
    {
        id: 5,
        name: "AirPods Pro",
        category: "accessory",
        price: 6500000,
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
        description: "Tai nghe không dây với chống ồn chủ động",
        stock: 30
    },
    {
        id: 6,
        name: "iPad Pro 12.9",
        category: "laptop",
        price: 32000000,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
        description: "Máy tính bảng cao cấp với chip M2 và Apple Pencil",
        stock: 18
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        category: "accessory",
        price: 8500000,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
        description: "Tai nghe over-ear với chống ồn hàng đầu thế giới",
        stock: 22
    },
    {
        id: 8,
        name: "Apple Watch Series 9",
        category: "accessory",
        price: 12000000,
        image: "https://www.apple.com/vn/iphone/home/images/overview/consider_modals/innovation/modal_second__e1xvbvxfc5oy_large_2x.jpg",
        description: "Đồng hồ thông minh với tính năng sức khỏe tiên tiến",
        stock: 28
    }
];

// Giỏ hàng
let cart = [];
// Cờ để tránh gắn nhiều lần khiến mở modal nhiều lớp backdrop
let cartBtnBound = false;

// Khởi tạo trang web
document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    updateCartCount();
});

// Thiết lập các event listeners
function setupEventListeners() {
    // Cart button có thể chưa tồn tại do header tải async qua fetch
    const btn = document.getElementById('cartBtn');
    if (btn && !cartBtnBound) {
        cartBtnBound = true;
        btn.addEventListener('click', function () { showCart(); });
    } else if (!btn) {
        setTimeout(setupEventListeners, 200);
    }
}

// Hiển thị sản phẩm
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');

    // Xóa nội dung cũ
    productsGrid.innerHTML = '';

    // Hiển thị tất cả sản phẩm
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function displayFirstProducts() {
    const productsGrid = document.getElementById('productsGrid');

    // Xóa nội dung cũ
    productsGrid.innerHTML = '';

    // Lọc và hiển thị chỉ 3 sản phẩm đầu tiên
    const firstThreeProducts = products.filter(product => product.id >= 1 && product.id <= 4);

    firstThreeProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Tạo card sản phẩm
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-6 mb-4';

    col.innerHTML = `
        <div class="card product-card h-100 shadow-sm">
            <div class="position-relative">
                <img src="${product.image}" class="card-img-top" alt="${product.name}"
                     style="height: 200px; object-fit: cover;"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/500x300?text=No+Image';">
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted small">${product.description}</p>
                <div class="mt-auto">
                    <div class="price mb-2">
                        ${formatPrice(product.price)}
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-success">
                            <i class="fas fa-check-circle me-1"></i>Còn ${product.stock} sản phẩm
                        </small>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-1"></i>Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    return col;
}


// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Thêm vào giỏ hàng
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            showAlert('Sản phẩm đã hết hàng!', 'warning');
            return;
        }
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    showAlert('Đã thêm sản phẩm vào giỏ hàng!', 'success');
}

// Cập nhật số lượng giỏ hàng
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Hiển thị giỏ hàng
function showCart() {
    const modalEl = document.getElementById('cartModal');
    if (!modalEl || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;
    // Dọn backdrop cũ nếu có (tránh bị kẹt do mở nhiều lần)
    document.querySelectorAll('.modal-backdrop').forEach(function (el) { el.remove(); });
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');

    const cartModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5>Giỏ hàng trống</h5>
                <p class="text-muted">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
            </div>
        `;
        cartTotal.textContent = '0đ';
    } else {
        let cartHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartHTML += `
                <div class="d-flex align-items-center mb-3 p-3 border rounded">
                    <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">${formatPrice(item.price)}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-3">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger ms-3" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        cartItems.innerHTML = cartHTML;
        cartTotal.textContent = formatPrice(total);
    }

    // Đảm bảo backdrop/scroll được dọn khi đóng
    modalEl.addEventListener('hidden.bs.modal', function () {
        document.querySelectorAll('.modal-backdrop').forEach(function (el) { el.remove(); });
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('padding-right');
    }, { once: true });

    cartModal.show();
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    const product = products.find(p => p.id === productId);

    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else if (newQuantity > product.stock) {
        showAlert('Số lượng vượt quá tồn kho!', 'warning');
    } else {
        item.quantity = newQuantity;
        updateCartCount();
        showCart(); // Refresh cart display
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart(); // Refresh cart display
    showAlert('Đã xóa sản phẩm khỏi giỏ hàng!', 'info');
}


// Hiển thị thông báo
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}



