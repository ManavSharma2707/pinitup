$(document).ready(function() {
    // Mobile Menu Toggle
    $('.mobile-menu-toggle').click(function() {
        $('#navbar .nav-links').slideToggle(300);
    });

    // Cart Functionality
    let cart = [];
    const cartSidebar = $('#cart-sidebar');
    const overlay = $('#overlay');

    $('#cart-toggle, #close-cart').click(function() {
        cartSidebar.toggleClass('active');
        overlay.toggleClass('active');
    });

    // Smooth Scrolling
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800);
        }
    });

    // Product Data (15 SKUs)
    const products = [
        { id: 1, name: 'Abstract Art', price: 59, category: 'artistic', image: 'images/IMG_4375.jpg', desc: 'Modern abstract design badge' },
        { id: 2, name: 'Abstract Art', price: 59, category: 'artistic', image: 'images/IMG_4402.jpg', desc: 'Modern abstract design badge' },
        { id: 3, name: 'Abstract Art', price: 59, category: 'artistic', image: 'images/IMG_4427.jpg', desc: 'Modern abstract design badge' },
        { id: 4, name: 'Minimal Flower', price: 49, category: 'minimalist', image: 'images/IMG_4381.jpg', desc: 'Simple floral design' },
        { id: 5, name: 'Minimal Flower', price: 49, category: 'minimalist', image: 'images/IMG_4440.jpg', desc: 'Simple floral design' },
        { id: 6, name: 'Minimal Flower', price: 49, category: 'minimalist', image: 'images/IMG_4444.jpg', desc: 'Simple floral design' },
        { id: 7, name: 'Power Statement', price: 69, category: 'statement', image: 'images/IMG_4464.jpg', desc: 'Bold empowerment badge' },
        { id: 8, name: 'Power Statement', price: 69, category: 'statement', image: 'images/IMG_4470.jpg', desc: 'Bold empowerment badge' },
        { id: 9, name: 'Power Statement', price: 69, category: 'statement', image: 'images/IMG_4471.jpg', desc: 'Bold empowerment badge' },
        { id: 10, name: 'Power Statement', price: 69, category: 'statement', image: 'images/IMG_4391.jpg', desc: 'Bold empowerment badge' },
        // Add 12 more products following same structure
    ];

    // Load Products
    function loadProducts(filter = 'all') {
        const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
        
        $('#products-grid').empty();
        filteredProducts.forEach(product => {
            $('#products-grid').append(`
                <div class="product-card" data-category="${product.category}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-overlay">
                            <div class="product-buttons">
                                <div class="product-btn quick-view" data-id="${product.id}"><i class="fas fa-eye"></i></div>
                                <div class="product-btn add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-bag"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">
                            <span class="price">₹${product.price}</span>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    // Initial Product Load
    loadProducts();

    // Product Filtering
    $('.filter-content a').click(function(e) {
        e.preventDefault();
        const filter = $(this).data('filter');
        loadProducts(filter);
        $('.filter-btn').text($(this).text());
        $('.filter-content').removeClass('show');
    });

    // Toggle Filter Dropdown
    $('.filter-btn').click(function() {
        $('.filter-content').toggleClass('show');
    });

    // Quick View Modal
    $(document).on('click', '.quick-view', function() {
        const productId = $(this).data('id');
        const product = products.find(p => p.id === productId);
        
        $('#modal-body').html(`
            <div class="modal-product">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-details">
                    <h2>${product.name}</h2>
                    <p class="price">₹${product.price}</p>
                    <p class="description">${product.desc}</p>
                    <button class="cta-button add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `);
        
        $('#product-modal, #overlay').fadeIn();
    });
    
    

    // Add to Cart Functionality
    $(document).on('click', '.add-to-cart', function() {
        const productId = $(this).data('id');
        const product = products.find(p => p.id === productId);
        
        const cartItem = {
            ...product,
            quantity: 1
        };

        const existingItem = cart.find(item => item.id === productId);
        if(existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(cartItem);
        }

        updateCartDisplay();
    });

    // Update Cart Display
    function updateCartDisplay() {
        $('.cart-count').text(cart.reduce((sum, item) => sum + item.quantity, 0));
        
        $('#cart-items').empty();
        if(cart.length === 0) {
            $('#cart-items').html('<div class="empty-cart-message">Your cart is empty</div>');
        } else {
            cart.forEach(item => {
                $('#cart-items').append(`
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>₹${item.price} x ${item.quantity}</p>
                            <button class="remove-item" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `);
            });
        }

        $('#cart-total-amount').text('₹' + cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
    }

    // Remove Cart Item
    $(document).on('click', '.remove-item', function() {
        const productId = $(this).data('id');
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
    });
    // Checkout button functionality
$('.checkout-btn').click(function() {
    cart = []; // Clear the cart
    updateCartDisplay(); // Refresh the cart display
    alert("Your order has been placed!"); // Show order confirmation
});


    // Modal Close
    $('.close-modal, #overlay').click(function() {
        $('#product-modal, #overlay').fadeOut();
    });

    // Header Scroll Effect
    $(window).scroll(function() {
        $('#header').toggleClass('scrolled', $(this).scrollTop() > 59);
    });

    // Form Submission
    $('#newsletter-form, #contact-form').submit(function(e) {
        e.preventDefault();
        $(this).trigger('reset');
        alert('Thank you for your submission!');
    });

    // Close Cart When Clicking Outside
    overlay.click(function() {
        cartSidebar.removeClass('active');
        overlay.removeClass('active');
    });
});
// Close mobile menu when clicking links
$(document).on('click', '#navbar .nav-links a', function() {
    if ($(window).width() <= 768) {
        $('#navbar .nav-links').slideUp(300);
    }
});

// Window resize handler
$(window).resize(function() {
    if ($(window).width() > 768) {
        $('#navbar .nav-links').css('display', 'flex');
    } else {
        $('#navbar .nav-links').css('display', 'none');
    }
});

