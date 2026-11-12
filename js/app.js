/* ==========================================================================
   EmberBite — Main Application Logic
   Pure Vanilla JS (ES6+) • Zero Libraries • Fully Accessible
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Cart State Management (localStorage)
  // --------------------------------------------------------------------------
  const CART_STORAGE_KEY = 'emberbite_cart';
  const PROMO_STORAGE_KEY = 'emberbite_promo';

  function resolveImagePath(path) {
    if (!path) return '';
    const clean = path.replace(/^(\.\.\/)+/, '');
    const isInsidePages = window.location.pathname.includes('/pages/');
    return isInsidePages ? '../' + clean : clean;
  }

  function getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      updateCartUI();
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }

  function getAppliedPromo() {
    try {
      const data = localStorage.getItem(PROMO_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function savePromo(promo) {
    if (!promo) {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    } else {
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promo));
    }
    updateCartUI();
  }

  function calculateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    const promo = getAppliedPromo();
    let discount = 0;

    if (promo && subtotal >= (promo.minOrder || 0)) {
      if (promo.discount > 1) {
        discount = (subtotal * promo.discount) / 100;
      } else {
        discount = promo.discount;
      }
    }

    const deliveryFee = subtotal > 0 ? (subtotal > 45 ? 0 : 3.99) : 0;
    const tax = subtotal * 0.08875; // NYC sales tax rate
    const total = Math.max(0, subtotal - discount + deliveryFee + tax);

    return {
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
  }

  function addItemToCart(configuredItem) {
    const cart = getCart();
    // Unique key based on ID, size, crust, toppings and instructions
    const itemKey = `${configuredItem.id}_${configuredItem.size}_${configuredItem.crust}_${configuredItem.toppings.sort().join(',')}`;
    const existingIndex = cart.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += configuredItem.quantity;
    } else {
      cart.push({
        ...configuredItem,
        key: itemKey
      });
    }

    saveCart(cart);
    showToast(`Added ${configuredItem.name} to your Order Bag!`);
    openCartDrawer();
  }

  function updateItemQuantity(itemKey, delta) {
    const cart = getCart();
    const item = cart.find(i => i.key === itemKey);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      const filtered = cart.filter(i => i.key !== itemKey);
      saveCart(filtered);
    } else {
      saveCart(cart);
    }
  }

  function removeItemFromCart(itemKey) {
    const cart = getCart();
    const filtered = cart.filter(i => i.key !== itemKey);
    saveCart(filtered);
  }

  // --------------------------------------------------------------------------
  // Cart Drawer UI & Event Binding
  // --------------------------------------------------------------------------
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('drawer-backdrop');
  const cartToggleBtns = document.querySelectorAll('[data-cart-toggle]');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openCartDrawer() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.add('is-open');
      cartBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      drawerCloseBtn?.focus();
    }
  }

  function closeCartDrawer() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove('is-open');
      cartBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  cartToggleBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  drawerCloseBtn?.addEventListener('click', closeCartDrawer);
  cartBackdrop?.addEventListener('click', closeCartDrawer);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && cartDrawer?.classList.contains('is-open')) {
      closeCartDrawer();
    }
  });

  function updateCartUI() {
    const totals = calculateTotals();
    const cart = getCart();

    // Update header badges
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
      b.textContent = totals.itemCount;
      b.style.display = totals.itemCount > 0 ? 'inline-flex' : 'none';
    });

    // Render Drawer contents
    const drawerItems = document.getElementById('drawer-items');
    const drawerSubtotal = document.getElementById('drawer-subtotal');
    const drawerDiscount = document.getElementById('drawer-discount');
    const drawerDiscountRow = document.getElementById('drawer-discount-row');
    const drawerDelivery = document.getElementById('drawer-delivery');
    const drawerTotal = document.getElementById('drawer-total');

    if (drawerItems) {
      if (cart.length === 0) {
        drawerItems.innerHTML = `
          <div class="cart-empty-state">
            <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <p><strong>Your Order Bag is empty</strong></p>
            <p style="font-size: 0.875rem; margin-top: 0.5rem;">Explore our flame smash burgers, crispy chicken, and loaded bites!</p>
          </div>
        `;
      } else {
        drawerItems.innerHTML = cart.map(item => `
          <div class="cart-item-row" data-key="${item.key}">
            <img src="${resolveImagePath(item.image)}" alt="${item.name}" class="cart-item-thumb">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p class="cart-item-options">${item.size} • ${item.crust}${item.toppings.length ? '<br>+' + item.toppings.join(', ') : ''}</p>
              <div class="cart-item-stepper">
                <button type="button" class="cart-stepper-btn" data-action="decrease" data-key="${item.key}" aria-label="Decrease quantity">-</button>
                <span class="cart-stepper-qty">${item.quantity}</span>
                <button type="button" class="cart-stepper-btn" data-action="increase" data-key="${item.key}" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <div class="cart-item-price-col">
              <span class="cart-item-price">$${(item.unitPrice * item.quantity).toFixed(2)}</span>
              <button type="button" class="cart-item-remove-btn" data-action="remove" data-key="${item.key}">Remove</button>
            </div>
          </div>
        `).join('');

        // Delegate drawer item actions
        drawerItems.querySelectorAll('[data-action]').forEach(btn => {
          btn.addEventListener('click', e => {
            const action = btn.dataset.action;
            const key = btn.dataset.key;
            if (action === 'increase') updateItemQuantity(key, 1);
            if (action === 'decrease') updateItemQuantity(key, -1);
            if (action === 'remove') removeItemFromCart(key);
          });
        });
      }
    }

    if (drawerSubtotal) drawerSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (drawerDelivery) drawerDelivery.textContent = totals.deliveryFee === 0 ? 'FREE' : `$${totals.deliveryFee.toFixed(2)}`;
    if (drawerTotal) drawerTotal.textContent = `$${totals.total.toFixed(2)}`;

    if (drawerDiscountRow && drawerDiscount) {
      if (totals.discount > 0) {
        drawerDiscountRow.style.display = 'flex';
        drawerDiscount.textContent = `-$${totals.discount.toFixed(2)}`;
      } else {
        drawerDiscountRow.style.display = 'none';
      }
    }

    // Checkout page sync if on cart/checkout page
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');
    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `$${totals.total.toFixed(2)}`;
  }

  // --------------------------------------------------------------------------
  // Promo Code Application
  // --------------------------------------------------------------------------
  const promoForm = document.getElementById('drawer-promo-form');
  promoForm?.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('promo-code-input');
    const code = input?.value.trim().toUpperCase();
    if (!code) return;

    const availableDeals = window.EMBER_DATA?.deals || [];
    const matchedDeal = availableDeals.find(d => d.code === code);

    if (matchedDeal) {
      savePromo(matchedDeal);
      showToast(`Promo ${code} applied successfully!`);
      input.value = '';
    } else {
      showToast('Invalid promo code. Try EMBER20 or FREEKNOTS');
    }
  });

  // --------------------------------------------------------------------------
  // Native HTML5 <dialog> Item Customization Modal
  // --------------------------------------------------------------------------
  const customModal = document.getElementById('customization-modal');
  let currentActiveItem = null;

  function openCustomizer(itemId) {
    if (!window.EMBER_DATA) return;
    const item = window.EMBER_DATA.items.find(i => i.id === itemId);
    if (!item) return;

    currentActiveItem = item;

    // Populate modal fields
    const imgEl = document.getElementById('modal-img');
    const titleEl = document.getElementById('modal-title');
    const descEl = document.getElementById('modal-desc');
    const sizesContainer = document.getElementById('modal-sizes-group');
    const crustsSelect = document.getElementById('modal-crust-select');
    const toppingsContainer = document.getElementById('modal-toppings-group');
    const instructionsEl = document.getElementById('modal-instructions');
    const qtyEl = document.getElementById('modal-qty-val');

    if (imgEl) imgEl.src = resolveImagePath(item.image);
    if (titleEl) titleEl.textContent = item.name;
    if (descEl) descEl.textContent = item.description;
    if (instructionsEl) instructionsEl.value = '';
    if (qtyEl) qtyEl.textContent = '1';

    // Sizes
    if (sizesContainer) {
      sizesContainer.innerHTML = item.sizes.map((s, idx) => `
        <label class="option-radio-label ${idx === 0 ? 'is-selected' : ''}">
          <input type="radio" name="modal-size" value="${s.id}" data-extra="${s.extra}" ${idx === 0 ? 'checked' : ''}>
          <span>${s.name} ${s.extra > 0 ? '(+$' + s.extra.toFixed(2) + ')' : ''}</span>
        </label>
      `).join('');

      sizesContainer.querySelectorAll('.option-radio-label').forEach(lbl => {
        lbl.addEventListener('click', () => {
          sizesContainer.querySelectorAll('.option-radio-label').forEach(l => l.classList.remove('is-selected'));
          lbl.classList.add('is-selected');
          updateModalPrice();
        });
      });
    }

    // Crusts
    if (crustsSelect) {
      crustsSelect.innerHTML = item.crusts.map(c => `
        <option value="${c}">${c}</option>
      `).join('');
    }

    // Toppings
    if (toppingsContainer) {
      toppingsContainer.innerHTML = item.toppings.map(t => `
        <label class="topping-label">
          <div class="topping-left">
            <input type="checkbox" name="modal-topping" value="${t.name}" data-price="${t.price}">
            <span>${t.name}</span>
          </div>
          <strong>+$${t.price.toFixed(2)}</strong>
        </label>
      `).join('');

      toppingsContainer.querySelectorAll('input[type="checkbox"]').forEach(box => {
        box.addEventListener('change', updateModalPrice);
      });
    }

    updateModalPrice();

    if (customModal && typeof customModal.showModal === 'function') {
      customModal.showModal();
    }
  }

  function updateModalPrice() {
    if (!currentActiveItem) return;

    let totalUnit = currentActiveItem.basePrice;

    // Selected size extra
    const selectedSizeRadio = document.querySelector('input[name="modal-size"]:checked');
    if (selectedSizeRadio) {
      totalUnit += parseFloat(selectedSizeRadio.dataset.extra || 0);
    }

    // Selected toppings
    const checkedToppings = document.querySelectorAll('input[name="modal-topping"]:checked');
    checkedToppings.forEach(t => {
      totalUnit += parseFloat(t.dataset.price || 0);
    });

    const qty = parseInt(document.getElementById('modal-qty-val')?.textContent || '1', 10);
    const finalTotal = totalUnit * qty;

    const addBtn = document.getElementById('modal-add-btn');
    if (addBtn) {
      addBtn.textContent = `Add to Bag • $${finalTotal.toFixed(2)}`;
    }
  }

  // Modal Quantity Stepper
  document.getElementById('modal-qty-minus')?.addEventListener('click', () => {
    const qtyEl = document.getElementById('modal-qty-val');
    let q = parseInt(qtyEl?.textContent || '1', 10);
    if (q > 1) {
      qtyEl.textContent = q - 1;
      updateModalPrice();
    }
  });

  document.getElementById('modal-qty-plus')?.addEventListener('click', () => {
    const qtyEl = document.getElementById('modal-qty-val');
    let q = parseInt(qtyEl?.textContent || '1', 10);
    qtyEl.textContent = q + 1;
    updateModalPrice();
  });

  // Modal Add Button
  document.getElementById('modal-add-btn')?.addEventListener('click', () => {
    if (!currentActiveItem) return;

    const selectedSizeInput = document.querySelector('input[name="modal-size"]:checked');
    const selectedCrust = document.getElementById('modal-crust-select')?.value || currentActiveItem.crusts[0];
    const checkedToppings = Array.from(document.querySelectorAll('input[name="modal-topping"]:checked')).map(t => t.value);
    const instructions = document.getElementById('modal-instructions')?.value.trim() || '';
    const quantity = parseInt(document.getElementById('modal-qty-val')?.textContent || '1', 10);

    let unitPrice = currentActiveItem.basePrice;
    if (selectedSizeInput) unitPrice += parseFloat(selectedSizeInput.dataset.extra || 0);
    document.querySelectorAll('input[name="modal-topping"]:checked').forEach(t => {
      unitPrice += parseFloat(t.dataset.price || 0);
    });

    const sizeName = selectedSizeInput?.closest('label')?.querySelector('span')?.textContent.split('(')[0].trim() || 'Standard';

    addItemToCart({
      id: currentActiveItem.id,
      name: currentActiveItem.name,
      image: currentActiveItem.image,
      unitPrice,
      size: sizeName,
      crust: selectedCrust,
      toppings: checkedToppings,
      instructions,
      quantity
    });

    customModal?.close();
  });

  document.getElementById('modal-close-btn')?.addEventListener('click', () => {
    customModal?.close();
  });

  // --------------------------------------------------------------------------
  // Global Toast Notifications
  // --------------------------------------------------------------------------
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 300ms ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // Menu Category Filtering
  // --------------------------------------------------------------------------
  function initMenuFilters() {
    const filterPills = document.querySelectorAll('.category-pill');
    const productCards = document.querySelectorAll('.product-card[data-category]');

    filterPills.forEach(pill => {
      pill.addEventListener('click', e => {
        e.preventDefault();
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const cat = pill.dataset.category;
        productCards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Bind all Customize & Add buttons across pages
  function bindCustomizerTriggers() {
    document.querySelectorAll('[data-open-customizer]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const itemId = btn.dataset.openCustomizer;
        openCustomizer(itemId);
      });
    });
  }

  // --------------------------------------------------------------------------
  // Mobile Nav Toggle
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.querySelector('[data-mobile-menu-toggle]');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

  mobileMenuBtn?.addEventListener('click', () => {
    const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !expanded);
    if (mobileNavDrawer) {
      mobileNavDrawer.classList.toggle('is-open');
    }
  });

  // --------------------------------------------------------------------------
  // Page Boot
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    initMenuFilters();
    bindCustomizerTriggers();

    // Order mode toggle
    document.querySelectorAll('.order-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.order-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast(`Ordering switched to ${btn.textContent.trim()}`);
      });
    });
  });

  // Expose global methods
  window.EmberBite = {
    openCustomizer,
    openCartDrawer,
    closeCartDrawer,
    showToast,
    getCart,
    addItemToCart,
    resolveImagePath
  };
})();
