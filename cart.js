const cartContainer = document.getElementById("cart-container");


// Load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem("cart") || "[]";

    return JSON.parse(storedCart);
}


// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Display the cart
function renderCart() {

    const cart = loadCart();

    cartContainer.innerHTML = "";

    // Empty cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty">
                <h2>Your cart is empty.</h2>
                <p>Go back to the directory and add a customer.</p>
            </div>
        `;

        return;
    }


    // Display each customer
    for (const customer of cart) {

        const card = document.createElement("div");

        card.className = "cart-card";

        card.innerHTML = `
            <h2>
                ${customer.firstName} ${customer.lastName}
            </h2>

            <p>
                <strong>Email:</strong>
                ${customer.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${customer.phone}
            </p>

            <div class="button-group">

                <button
                    class="edit-btn"
                    onclick="editCustomer('${customer.customerId}')"
                >
                    Edit
                </button>

                <button
                    class="remove-btn"
                    onclick="removeFromCart('${customer.customerId}')"
                >
                    Remove
                </button>

            </div>
        `;

        cartContainer.appendChild(card);
    }
}


// Edit customer information
function editCustomer(customerId) {

    const cart = loadCart();

    const customer = cart.find(
        customer => customer.customerId === customerId
    );

    if (!customer) {
        return;
    }


    const newFirstName = prompt(
        "Enter a new first name:",
        customer.firstName
    );

    if (
        newFirstName === null ||
        newFirstName.trim() === ""
    ) {
        return;
    }


    const newLastName = prompt(
        "Enter a new last name:",
        customer.lastName
    );

    if (
        newLastName === null ||
        newLastName.trim() === ""
    ) {
        return;
    }


    const newEmail = prompt(
        "Enter a new email:",
        customer.email
    );

    if (
        newEmail === null ||
        newEmail.trim() === ""
    ) {
        return;
    }


    const newPhone = prompt(
        "Enter a new phone number:",
        customer.phone
    );

    if (
        newPhone === null ||
        newPhone.trim() === ""
    ) {
        return;
    }


    // Update the object
    customer.firstName = newFirstName.trim();
    customer.lastName = newLastName.trim();
    customer.email = newEmail.trim();
    customer.phone = newPhone.trim();


    // Save updated data
    saveCart(cart);


    // Refresh the page display
    renderCart();
}


// Remove one customer
function removeFromCart(customerId) {

    const cart = loadCart();

    const updatedCart = cart.filter(
        customer => customer.customerId !== customerId
    );

    saveCart(updatedCart);

    renderCart();
}


// Remove everything from the cart
function clearCart() {

    const confirmed = confirm(
        "Are you sure you want to clear the entire cart?"
    );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem("cart");

    renderCart();
}


// Start the cart page
renderCart();