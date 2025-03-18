document.addEventListener("DOMContentLoaded", function () {
    const ordersTable = document.getElementById("ordersTable");
    
    function fetchOrders() {
        fetch("http://localhost:3000/latest-order")
            .then(response => response.json())
            .then(order => {
                ordersTable.innerHTML = "";
                if (order.message) return ordersTable.innerHTML = `<tr><td colspan="3">${order.message}</td></tr>`;
                
                ordersTable.innerHTML += `
                    <tr>
                        <td>${order.tableNumber}</td>
                        <td>${order.order.map(item => item.item).join(", ")}</td>
                        <td>${new Date(order.time).toLocaleTimeString()}</td>
                    </tr>
                `;
            })
            .catch(error => console.error("❌ Error fetching orders:", error));
    }
    
    setInterval(fetchOrders, 5000);
    fetchOrders();
});
