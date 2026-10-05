const express = require("express");
const productRoutes = require("./routes/product.routes");


const app = express();

app.use(express.json());


app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "API işləyir" });
})

app.use("/api/v1", productRoutes);


app.use((err, req, res, next) => {
    console.error(err);
    if(res.headersSent) {
        return next(err);
    }


    res.status(500).json({ success: false, message: "Something went wrong!" });
});

module.exports = app;