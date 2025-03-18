document.addEventListener("DOMContentLoaded", function () {
    const ordersTable = document.getElementById("ordersTable");

    function fetchOrders() {
        fetch("http://localhost:3000/orders")
            .then(response => response.json())
            .then(orders => {
                ordersTable.innerHTML = "";
                orders.forEach((order, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${order.tableNumber}</td>
                        <td>${order.items.map(item => item.item).join(", ")}</td>
                        <td>${order.status}</td>
                        <td>
                            ${order.status === "pending" ? `<button onclick="markAsDelivered(${index})">Mark as Delivered</button>` : "Delivered"}
                        </td>
                    `;
                    ordersTable.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching orders:", error));
    }

    // تحديث الطلب إلى "delivered"
    window.markAsDelivered = function (index) {
        fetch("http://localhost:3000/order/deliver", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index })
        })
        .then(response => response.json())
        .then(() => fetchOrders()); // تحديث الجدول بعد تغيير الحالة
    };

    fetchOrders();
    setInterval(fetchOrders, 5000); // تحديث الطلبات كل 5 ثوانٍ
});
