const express = require("express");
const router = express.Router();

//Traigo la informacion que voy a utilizar en router.products
const ProductManager = require("../controllers/productManager");
const productManager = new ProductManager("./src/models/productManager.json");

//Para que acepte datos complejos
router.use(express.urlencoded({extended:true}));
//Declaro que utilizare JSON para mis datos
router.use(express.json());


//Routes
router.get("/", async (req, res) => {
    try {
        let limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products)
        }
    } catch (error) {
        console.log("Error al obtener productos", error);
        res.status(500).json({error: "Error del servidor"});
    }
    
})

router.get("/:pid", async (req, res) => {
    let pid = req.params.pid;
    
    try {
        const product = await productManager.getProductById(parseInt(pid));
        if (!product) {
            res.json({error: "Producto no encontrado"});
        } else {
            res.json(product);
        }
    } catch (error) {
        console.log("Error al obtener el producto", error);
        res.status(500).json({error: "Error del servidor"});
    }
})

router.post( "/", async (req, res) => {
    const newProduct = req.body;

    try {
        const product = await productManager.addProduct(newProduct);
        if (product) {
            res.status(201).json({message: "Producto agregado exitosamente"});
        } else {
            res.status(501).json({error: "Todos los campos son OBLIGATORIOS y/o los CODE no se pueden repetir"});
        }
    } catch (error) {
        console.log("Error al agregar producto", error);
        res.status(500).json({error: "Error del servidor"});
    }

})

router.put("/:pid", async (req, res) => {
    const newData = req.body;
    const id = req.params.pid;

    try {
        await productManager.updateProduct(parseInt(id), newData);
        res.status(201).json({message: "Producto actualizado correctamente"});
    } catch (error) {
        console.log("Error al agregar producto", error);
        res.status(500).json({error: "Error del servidor"});
    }
})

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(parseInt(id))
        res.status(201).json({message: "Producto borrado correctamente"});
    } catch (error) {
        console.log("Error al eliminar producto", error);
        res.status(500).json({error: "Error del servidor"});
    }
})


module.exports =  router;
