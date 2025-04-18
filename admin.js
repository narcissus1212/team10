document.addEventListener("DOMContentLoaded", function () {
    const ordersTable = document.getElementById("ordersTable");

    function fetchOrders() {
        fetch("http://localhost:3000/orders")
            .then(response => response.json())
            .then(orders => {
                ordersTable.innerHTML = ""; // مسح الجدول قبل إعادة ملئه

                if (!orders.length) {
                    ordersTable.innerHTML = `<tr><td colspan="4">❌ لا يوجد طلبات متاحة</td></tr>`;
                    return;
                }

                orders.forEach(order => {
                    const row = document.createElement("tr");

                    // إنشاء الـ dropdown الخاص بالحالة
                    const statusOptions = ["Being Cooked", "On The Way", "Done"];
                    const statusSelect = document.createElement("select");

                    statusOptions.forEach(status => {
                        const option = document.createElement("option");
                        option.value = status;
                        option.text = status;
                        if (order.status === status) option.selected = true;
                        statusSelect.appendChild(option);
                    });

                    statusSelect.addEventListener("change", () => {
                        // تحديث الحالة في الواجهة (ممكن تضيف API call هنا لتحديث الـ backend)
                        fetch(`http://localhost:3000/orders/${order.id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: statusSelect.value })
                        })
                        .then(res => res.json())
                        .then(data => console.log("✅ تم تحديث الحالة:", data))
                        .catch(err => console.error("❌ فشل تحديث الحالة:", err));
                    });

                    // إنشاء زر حذف أو إجراء آخر
