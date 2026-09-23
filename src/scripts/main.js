document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    function updateCart() {
        cartCount.textContent = cart.length;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '$0.00';
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.emoji || '🛍️'}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <button class="cart-item-remove" data-index="${index}">&times;</button>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + item.price, 0);
            cartTotal.textContent = `$${total.toFixed(2)}`;

            document.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    cart.splice(index, 1);
                    updateCart();
                    showToast('Item removed from cart');
                });
            });
        }
    }

    function openCart() {
        cartModal.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCartModal() {
        cartModal.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    overlay.addEventListener('click', closeCartModal);

    const productEmojis = {
        'Premium Dog Food': '🦴',
        'Plush Squeaky Toy': '🧸',
        'Orthopedic Dog Bed': '🛏️',
        'Tennis Ball Set': '🎾',
        'Designer Collar': '🎀',
        'Oatmeal Shampoo': '🧴',
        'Dental Chews': '🦷',
        'Reflective Harness': '🦺'
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.dataset.product;
            const productPrice = parseFloat(button.dataset.price);
            
            cart.push({
                name: productName,
                price: productPrice,
                emoji: productEmojis[productName] || '🛍️'
            });

            updateCart();
            showToast(`${productName} added to cart!`, 'success');
            
            button.textContent = 'Added!';
            button.style.background = '#419D78';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.background = '';
            }, 1000);
        });
    });

    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        showToast('Thanks for subscribing! Check your email for 15% off.', 'success');
        newsletterForm.reset();
    });

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Message sent! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });

    function showToast(message, type = '') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty!');
        } else {
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            showToast(`Order placed! Total: $${total.toFixed(2)}`, 'success');
            cart.length = 0;
            updateCart();
            closeCartModal();
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .category-card, .testimonial-card, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
});
