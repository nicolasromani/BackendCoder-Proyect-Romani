const express = require("express");
const router = express.Router();

//tragio el productManager
const ProductManager = require("../controllers/productManager");
const productManager = new ProductManager("./src/models/productManager.json")

//usando motor de plantillas
router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home",{products});
    } catch (error) {
        console.log("Error al obtener productos", error);
        res.status(500).json({error: "Error del servidor"});
    }
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realTimeproducts");
    } catch (error) {
        console.log("Error en vista Real-Time", error);
        res.status(500).json({error: "Error del servidor"});
    }
})

module.exports = router;