document.addEventListener("DOMContentLoaded", function () {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersTable = document.getElementById("ordersTable");
    const orderFilter = document.getElementById("orderFilter");

    // تحديث وعرض الطلبات في الجدول
    function renderOrders(filter) {
        ordersTable.innerHTML = "";
        let filteredOrders = orders;

        if (filter === "pending") {
            filteredOrders = orders.filter(order => order.status === "pending");
        } else if (filter === "delivered") {
            filteredOrders = orders.filter(order => order.status === "delivered");
        }

        filteredOrders.forEach((order, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.tableNumber}</td>
                <td>${order.items.map(item => item.item).join(", ")}</td>
                <td>${order.orderType} ${order.arrivalTime ? (Arriving: ${order.arrivalTime}) : ""}</td>
                <td>${order.status}</td>
                <td>
                    ${order.status === "pending" ? <button class="complete-btn" onclick="markAsDelivered(${index})">Mark as Delivered</button> : ""}
                </td>
            `;
            ordersTable.appendChild(row);
        });
    }


    // تحديث حالة الطلب إلى "Delivered"
    window.markAsDelivered = function (index) {
        orders[index].status = "Delivered";
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(orderFilter.value);
    };

    // تغيير الفلتر لتصفية الطلبات
    orderFilter.addEventListener("change", function () {
        renderOrders(this.value);
    });

    renderOrders("all"); // عرض كل الطلبات عند تحميل الصفحة
});
