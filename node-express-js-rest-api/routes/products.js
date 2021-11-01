const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "Handling Get Request to /products" });
});

router.post('/', (req, res, next) => {
    res.status(200).json({ message: "Handling POST Request to /products" });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;

    if (id === "special")
        res.status(200).json({ message: "You discover a special id", id });

    res.status(200).json({ message: "you pass an id" });
});

router.patch("/:productId", (req, res, next) => {
    res.status(200).json({ message: "Updated product" });
});

router.delete("/:productId", (req, res, next) => {
    res.status(200).json({ message: "Deleted product" });
});

module.exports = router;