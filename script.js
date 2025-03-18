let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

function showMenu() {
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";
}

function addItem(item, price) {
    selectedItems.push({ item, price });
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

    const notification = document.getElementById("notification");
    notification.textContent = `${item} added to your order!`;
    notification.classList.add("show");
    
    setTimeout(() => notification.classList.remove("show"), 3000);
}

function showReview() {
    document.getElementById("menu-section").style.display = "none";
    document.getElementById("review-section").style.display = "block";

    let totalPrice = 0;
    const orderSummary = document.querySelector(".order-summary");
    orderSummary.innerHTML = "";

    selectedItems.forEach((item, index) => {
        totalPrice += item.price;
        orderSummary.innerHTML += `
            <div class="order-item">
                <span>${item.item} - ${item.price} EGP</span>
                <div>
                    <button class="delete-btn" onclick="removeItem(${index})">Remove</button>
                    <button class="add-btn" onclick="showMenu()">Add Another Item</button>
                </div>
            </div>
        `;
    });

    orderSummary.innerHTML += `<div class="total-price">Total Price: ${totalPrice} EGP</div>`;
}

function removeItem(index) {
    selectedItems.splice(index, 1);
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    showReview();
}

function submitOrder() {
    const tableNumber = document.getElementById("table-number").value;
    if (!tableNumber) return alert("Please enter your table number.");
    if (selectedItems.length === 0) return alert("Your order is empty!");

    fetch("http://localhost:3000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableNumber, order: selectedItems })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        localStorage.clear();
        window.location.reload();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to send order. Please try again.");
    });
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
        .then(reg => console.log("Service Worker registered with scope:", reg.scope))
        .catch(err => console.log("Service Worker registration failed:", err));
    });
}
