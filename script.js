const customers = [
    {
        customerId: "CUST-001",
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@example.com",
        phone: "555-0101"
    },
    {
        customerId: "CUST-002",
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.j@example.com",
        phone: "555-0102"
    },
    {
        customerId: "CUST-003",
        firstName: "Carol",
        lastName: "Williams",
        email: "carol.w@example.com",
        phone: "555-0103"
    }
];

const container = document.getElementById("customer-container");


// Get the cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem("cart") || "[]";

    return JSON.parse(storedCart);
}


// Update the cart count at the top
function updateCartCount() {
    const cart = loadCart();

    document.getElementById("cart-count").textContent = cart.length;
}


// Add a customer to the cart
function addToCart(customerId) {

    const customer = customers.find(
        customer => customer.customerId === customerId
    );

    const cart = loadCart();

    // Prevent duplicates
    const alreadyInCart = cart.some(
        item => item.customerId === customerId
    );

    if (alreadyInCart) {
        alert(`${customer.firstName} is already in your cart.`);
        return;
    }

    // Add customer
    cart.push(customer);

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update number on cart button
    updateCartCount();

    alert(`${customer.firstName} was added to your cart.`);
}


// Display all customers
function renderCustomers() {

    container.innerHTML = "";

    for (const customer of customers) {

        const card = document.createElement("div");

        card.className = "customer-card";

        card.innerHTML = `
            <h2>${customer.firstName} ${customer.lastName}</h2>

            <p>
                <strong>Email:</strong>
                ${customer.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${customer.phone}
            </p>

            <button
                class="add-btn"
                onclick="addToCart('${customer.customerId}')"
            >
                + Add to Cart
            </button>
        `;

        container.appendChild(card);
    }
}


// Start the page
renderCustomers();
updateCartCount();