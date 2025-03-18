document.addEventListener("DOMContentLoaded", function () {
    const ordersTable = document.getElementById("ordersTable");

    // وظيفة لجلب الطلبات من السيرفر
    function fetchOrders() {
        fetch("http://localhost:3000/latest-order")
            .then(response => response.json())
            .then(order => {
                ordersTable.innerHTML = ""; // مسح المحتوى الحالي

                if (order.message) {
                    ordersTable.innerHTML = `<tr><td colspan="3">${order.message}</td></tr>`;
                    return;
                }

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${order.tableNumber}</td>
                    <td>${order.order.map(item => item.item).join(", ")}</td>
                    <td>${new Date(order.time).toLocaleTimeString()}</td>
                `;
                ordersTable.appendChild(row);
            })
            .catch(error => console.error("❌ خطأ في جلب الطلبات:", error));
    }

    // تحديث الطلبات كل 5 ثوانٍ تلقائيًا
    setInterval(fetchOrders, 5000);
    fetchOrders(); // تشغيلها مباشرة عند تحميل الصفحة
});
