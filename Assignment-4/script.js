// Services dataset
const availableServices = [
  { id: 1, name: "Dry Cleaning", price: 200, icon: "shirt-outline" },
  { id: 2, name: "Wash & Fold", price: 100, icon: "basket-outline" },
  { id: 3, name: "Ironing", price: 30, icon: "color-wand-outline" },
  { id: 4, name: "Stain Removal", price: 500, icon: "sparkles-outline" },
  {
    id: 5,
    name: "Leather & Suede Cleaning",
    price: 999,
    icon: "briefcase-outline",
  },
  {
    id: 6,
    name: "Wedding Dress Cleaning",
    price: 2800,
    icon: "heart-circle-outline",
  },
];

// Cart State (storing IDs of added services)
let cart = [];

// DOM Elements
const servicesListContainer = document.getElementById("services-list");
const cartTableBody = document.getElementById("cart-table-body");
const totalAmountElement = document.getElementById("total-amount");
const bookingForm = document.getElementById("booking-form");
const confirmationBox = document.getElementById("booking-confirmation-msg");
const heroBookBtn = document.getElementById("hero-book-btn");

// Smooth scroll from hero button to booking section
if (heroBookBtn) {
  heroBookBtn.addEventListener("click", () => {
    document
      .getElementById("booking-section")
      .scrollIntoView({ behavior: "smooth" });
  });
}

// Render Available Services
function renderServices() {
  servicesListContainer.innerHTML = "";

  availableServices.forEach((service) => {
    const isAdded = cart.includes(service.id);

    const row = document.createElement("div");
    row.className = "service-row";
    row.innerHTML = `
<div class="service-info">
<span class="service-icon"><ion-icon name="${service.icon}"></ion-icon></span>
<span class="service-name">${service.name}</span>
<span class="service-price">₹${service.price.toFixed(2)}</span>
</div>
<div>
<button
class="action-btn ${isAdded ? "remove-btn" : "add-btn"}"
onclick="toggleService(${service.id})">
${
  isAdded
    ? 'Remove Item <ion-icon name="close-circle-outline"></ion-icon>'
    : 'Add Item <ion-icon name="add-circle-outline"></ion-icon>'
}
</button>
</div>
`;
    servicesListContainer.appendChild(row);
  });
}

// Toggle Add/Remove
window.toggleService = function (serviceId) {
  if (cart.includes(serviceId)) {
    cart = cart.filter((id) => id !== serviceId);
  } else {
    cart.push(serviceId);
  }
  renderServices();
  renderCart();
};

// Render Cart Table & Calculate Total
function renderCart() {
  cartTableBody.innerHTML = "";

  if (cart.length === 0) {
    cartTableBody.innerHTML = `
<tr>
<td colspan="3" class="empty-cart-message">No added items</td>
</tr>
`;
    totalAmountElement.textContent = "₹0.00";
    return;
  }

  let total = 0;
  cart.forEach((id, index) => {
    const item = availableServices.find((s) => s.id === id);
    if (item) {
      total += item.price;
      const tr = document.createElement("tr");
      tr.innerHTML = `
<td>${index + 1}</td>
<td>${item.name}</td>
<td class="text-right">₹${item.price.toFixed(2)}</td>
`;
      cartTableBody.appendChild(tr);
    }
  });

  totalAmountElement.textContent = `₹${total.toFixed(2)}`;
}

// Booking Form Submission & EmailJS handler
bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (cart.length === 0) {
    alert("Please add at least one service to the cart before booking.");
    return;
  }

  // Compile list of booked services
  const selectedItems = availableServices.filter((s) => cart.includes(s.id));
  const orderSummary = selectedItems
    .map((item) => `${item.name} (₹${item.price})`)
    .join(", ");
  const totalAmount = totalAmountElement.textContent;

  // Parameters sent to EmailJS template
  const templateParams = {
    to_name: "Laundry Admin",
    customer_name: fullName,
    customer_email: email,
    customer_phone: phone,
    order_items: orderSummary,
    total_price: totalAmount,
  };

  // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual EmailJS values
  emailjs
    .send("service_qyl3ppu", "template_gb0dbe5", templateParams)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch(function (error) {
      console.error("FAILED...", error);
    });

  // Display custom confirmation message with user's name
  confirmationBox.innerHTML = `Thank you <strong>${fullName}</strong> for booking the service! We will get back to you soon.`;
  confirmationBox.classList.remove("hidden");

  // Reset form and cart
  bookingForm.reset();
  cart = [];
  renderServices();
  renderCart();
});

// Initial run
renderServices();
renderCart();
