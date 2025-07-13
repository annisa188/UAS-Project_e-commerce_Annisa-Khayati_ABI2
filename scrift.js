/* ===== DATA PRODUK ===== */
const products = [
  { id: 1,  name: "Abaya Nissfashion",price: 110000, image: "img.html/abaya.jpg" },
  { id: 2,  name: "Oneset Formal",price: 70000, image: "img.html/onesetformal.jpg" },
  { id: 3,  name: "Blouse Nissfashion",       price: 40000, image: "img.html/blouse.jpg" },
  { id: 4,  name: "Rok Cargo",price: 55000, image: "img.html/rokcargo.jpg" },
  { id: 5,  name: "Sweater Nissfashion",         price: 45000, image: "img.html/sweater1.jpg" },
  { id: 6,  name: "Overall Nissfashion",                price: 85000, image: "img.html/overall.jpg" },
  { id: 7,  name: "kemeja formal",price: 35000, image: "img.html/kemeja.jpg" },
  { id: 8,  name: "cardigan",price: 30000, image: "img.html/cardigan.jpg" },
  { id: 9 ,  name: "oneset olahraga Nissfashion",     price: 125000, image: "img.html/onesetolahraga.jpg" },
  { id: 10,  name: "Rok Nissfashion",price: 95000, image: "img.html/rok.jpg" },
  { id: 11,  name: "Jeans kulot",price: 60000, image: "img.html/jeanskulot.jpg" },
  { id: 12,  name: "Tunik Brukat",price: 75000, image: "img.html/tunikbrukat.jpg" },
  { id: 13,  name: "Outher wanita Nissfashion",price: 50000, image: "img.html/outher.jpg" },
  { id: 14,  name: "Cardigan crop",price: 40000, image: "img.html/cardigancrop.jpg" },
  { id: 15,  name: "oneset rok Nissfashion",price: 100000, image: "img.html/onesetrok.jpg" },
  { id: 16,  name: "Dress Muslimah",price: 90000, image: "img.html/dressmuslimah.jpg" },
  { id: 17,  name: "Vest rajut",price: 40000, image: "img.html/vest.jpg" },
  { id: 18,  name: "Kebaya Nisfashion",price: 125000, image: "img.html/kebaya.jpg" },
  { id: 19, name: "cardigan Rajut",price: 65000, image: "img.html/cardiganrajut.jpg" }
];  
/* ===== STATE KERANJANG ===== */
let cart = [];

/* ===== UTIL ===== */
const rupiah = n =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n);

/* ===== RENDER PRODUK ===== */
function renderProducts() {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <div class="info">
        <h3>${p.name}</h3>
        <p class="price">${rupiah(p.price)}</p>
        <button class="btn buy" onclick="addToCart(${p.id})">Beli</button>
      </div>
    </div>
  `).join('');
}

/* ===== KERANJANG ===== */
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    const p = products.find(pr => pr.id === id);
    cart.push({ ...p, qty: 1 });
  }
  updateCartCount();
  renderCartItems();
  showCart();
}

function updateCartCount() {
  const totalQty = cart.reduce((a, i) => a + i.qty, 0);
  document.querySelectorAll('.cart-count')
          .forEach(el => el.textContent = totalQty);
}

function renderCartItems() {
  const box = document.getElementById('cart-items');
  if (!box) return;

  let subtotal = 0;
  box.innerHTML = cart.map(it => {
    subtotal += it.price * it.qty;
    return `
      <div class="cart-item">
        <img src="${it.image}" alt="${it.name}">
        <div class="cart-item-details">
          <h4>${it.name}</h4>
          <p class="qty">Qty: ${it.qty}</p>
          <p>${rupiah(it.price * it.qty)}</p>
        </div>
      </div>
    `;
  }).join('');

  document.querySelector('.total').textContent = `Total: ${rupiah(subtotal)}`;
}

/* ===== CART UI ===== */
function toggleCart() { document.getElementById('cartDrawer').classList.toggle('open'); }
function showCart()   { document.getElementById('cartDrawer').classList.add('open'); }
function hideCart()   { document.getElementById('cartDrawer').classList.remove('open'); }

function checkout() {
  if (cart.length === 0) {
    alert('Keranjang kosong!');
    return;
  }
  
  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  if (confirm(`Total pembayaran ${rupiah(total)}. Lanjut bayar?`)) {
    alert('Pembayaran berhasil! Terima kasih telah berbelanja.');
    cart = [];
    renderCartItems();
    updateCartCount();
    hideCart();
  }
}

/* ===== INISIALISASI ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
});
