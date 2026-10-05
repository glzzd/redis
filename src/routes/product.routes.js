const express = require("express");
const { getProducts } = require("../services/product.service");

const router = express.Router();

router.get("/products", async (req, res, next) => {
  try {
    const result = await getProducts();

    res.json({
      success: true,
      source: result.source,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;