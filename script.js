let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

function showMenu() {
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";
}

// إضافة عنصر جديد للطلب
function addItem(item, price) {
    selectedItems.push({ item, price });
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

    const notification = document.getElementById("notification");
    notification.textContent = `${item} added to your order!`;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// عرض الطلبات المحفوظة
function showReview() {
    document.getElementById("menu-section").style.display = "none";
    document.getElementById("review-section").style.display = "block";

    let totalPrice = 0;
    const orderSummary = document.querySelector(".order-summary");
    orderSummary.innerHTML = "";

    selectedItems.forEach((item, index) => {
        totalPrice += item.price;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("order-item");

        itemDiv.innerHTML = `
            <span>${item.item} - ${item.price} EGP</span>
            <div>
                <button class="delete-btn" onclick="removeItem(${index})">Remove</button>
                <button class="add-btn" onclick="showMenu()">Add Another Item</button>
            </div>
        `;

        orderSummary.appendChild(itemDiv);
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-price");
    totalDiv.textContent = `Total Price: ${totalPrice} EGP`;
    orderSummary.appendChild(totalDiv);
}

// حذف عنصر من الطلب
function removeItem(index) {
    selectedItems.splice(index, 1);
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    showReview();
}

// إرسال الطلب إلى السيرفر
function submitOrder() {
    const tableNumber = document.getElementById("table-number").value;
    if (!tableNumber) {
        alert("Please enter your table number.");
        return;
    }

    if (selectedItems.length === 0) {
        alert("Your order is empty!");
        return;
    }

    fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableNumber, items: selectedItems, status: "pending" })
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

// تسجيل Service Worker لو كنتِ تستخدمين PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
        .then((registration) => console.log("Service Worker registered with scope:", registration.scope))
        .catch((error) => console.log("Service Worker registration failed:", error));
    });
}
