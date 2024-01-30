const express = require("express");
const router = express.Router();

//Traigo la informacion que voy a utilizar en router.products
const CartManager = require("../controllers/cartManager.js");
const cartManager = new CartManager("./src/models/CartManager.json");

//Para que acepte datos complejos
router.use(express.urlencoded({extended:true}));
//Declaro que utilizare JSON para mis datos
router.use(express.json());

router.post( "/", async (req, res) => {
    try {
        await cartManager.createCart();
        res.status(201).json({message: "Carrito creado exitosamente"});
    } catch (error) {
        console.log("Error al crear carrito", error);
        res.status(500).json({error: "Error del servidor"});
    }
})

router.get("/:cid", async (req, res) => {
    let cid = req.params.cid;
    
    try {
        const cart = await cartManager.getCartById(parseInt(cid));
        if (!cart) {
            res.json({error: "Carrito no encontrado"});
        } else {
            res.json(cart.products);
        }
    } catch (error) {
        console.log("Error al obtener el Carrito", error);
        res.status(500).json({error: "Error del servidor"});
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;
    
    try {
        const product = await cartManager.putProductIn(parseInt(cid),parseInt(pid),quantity);
        res.json(product);
    } catch (error) {
        console.log("Error al cargar el Carrito", error);
        res.status(500).json({error: "Error del servidor"});
    }
})


module.exports =  router;