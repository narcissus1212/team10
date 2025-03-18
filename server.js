const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let orders = [];

app.post("/order", (req, res) => {
    const { tableNumber, order } = req.body;
    if (!tableNumber || !Array.isArray(order) || order.length === 0) {
        return res.status(400).json({ message: "يجب إدخال رقم الطاولة وقائمة الطلبات" });
    }
    const newOrder = { tableNumber, order, time: new Date().toISOString() };
    orders.push(newOrder);
    console.log("🔹 Order received:", newOrder);
    res.status(201).json({ message: "تم استقبال الطلب بنجاح!", order: newOrder });
});

app.get("/latest-order", (req, res) => {
    if (orders.length === 0) return res.status(404).json({ message: "لا يوجد طلبات متاحة" });
    res.json(orders[orders.length - 1]);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
