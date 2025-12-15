function addToCart(item, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(c => c.item === item);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ item, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateQtyDisplay(item);
}

function changeQty(item, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(c => c.item === item);
  if (existing) {
    existing.qty += delta;
    if (existing.qty <= 0) {
      cart = cart.filter(c => c.item !== item);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateQtyDisplay(item);
  loadCart();
}

function updateQtyDisplay(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(c => c.item === item);
  document.getElementById(item + "Qty").innerText = existing ? existing.qty : 0;
}

function showCart() {
  loadCart();
  document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let list = document.getElementById("cartItems");
  let total = 0;
  list.innerHTML = "";

  cart.forEach(c => {
    total += c.price * c.qty;
    list.innerHTML += `<li>${c.item} - ₱${c.price} x ${c.qty}</li>`;
  });

  document.getElementById("total").innerText = "Total: ₱" + total;
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  ["Espresso","Latte","Cappuccino","Mocha"].forEach(updateQtyDisplay);
  loadCart();
  closeCart();
}
