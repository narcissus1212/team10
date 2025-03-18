document.addEventListener("DOMContentLoaded", function () {
    const ordersTable = document.getElementById("ordersTable");

    function fetchOrders() {
        fetch("http://localhost:3000/orders")
            .then(response => response.json())
            .then(orders => {
                ordersTable.innerHTML = ""; // مسح الجدول قبل إعادة ملئه

                if (!orders.length) {
                    ordersTable.innerHTML = <tr><td colspan="3">❌ لا يوجد طلبات متاحة</td></tr>;
                    return;
                }

                orders.forEach(order => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${order.tableNumber}</td>
                        <td>${order.order.map(item => item.item).join(", ")}</td>
                        <td>${new Date(order.time).toLocaleTimeString()}</td>
                    `;
                    ordersTable.appendChild(row);
                });
            })
            .catch(error => console.error("❌ خطأ في جلب الطلبات:", error));
    }

    document.getElementById("clearOrders").addEventListener("click", function () {
    if (confirm("هل أنت متأكد من مسح جميع الطلبات؟")) {
        fetch("http://localhost:3000/orders", { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                fetchOrders(); // تحديث الجدول بعد الحذف
            })
            .catch(error => console.error("❌ خطأ في مسح الطلبات:", error));
    }
});


    setInterval(fetchOrders, 5000);
    fetchOrders();
});
