const fs = require("fs");

class CartManager {
    static id = 0;

    constructor(path) {
        this.cart = [];
        this.path = path;
    }

    async createCart() {
        try {
            const arrayCart = await this.getCarts();

            const newCart = {
                products: []
            }
            
            if (arrayCart.length > 0) {
                CartManager.id = arrayCart.reduce((maxId, cart) => Math.max(maxId, cart.id),0);
            }

            newCart.id = ++CartManager.id;

            arrayCart.push(newCart);

            await this.saveCart(arrayCart);

        } catch (error) {
            console.log("Error al crear Carrito", error);
            throw error;
        }
    }

    async saveCart(arrayCart) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(arrayCart, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo en el Array de carritos", error);
            throw error;            
        }
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const response = await fs.promises.readFile (this.path, "utf-8");
                const arrayResponse = JSON.parse(response);
                return arrayResponse;
            } else {
                await this.saveCart(this.cart);
                return this.cart;
            }
        } catch (error) {
            console.log ("Error al leer el Archivo!");
        }
    }

    async getCartById(id) {
        try {
            const objectRequest = await fs.promises.readFile(this.path, "utf-8");
            const objectResponse = JSON.parse(objectRequest);
            const cartId = objectResponse.find(e => e.id === id);
            if (cartId) {
                return cartId;
            } else {
                console.log ("No se posee Carritos con el ID especificado");
            } 
        } catch (error) {
            console.log("Error al buscar el carrito por ID");
        }
    }

    async putProductIn(cid, pid, quantity = 1) {
        const arrayProduct = await this.getCartById(cid);
        const verifyCart = arrayProduct.products.find(p => p.product === pid);
        const arrayCarts = await this.getCarts();

        if (verifyCart) {
            verifyCart.quantity += quantity;
        } else {
            arrayProduct.products.push({product: pid, quantity});
        }

        for (let i = 0; i < arrayCarts.length; i++) {
            if (arrayCarts[i].id === cid) {
                arrayCarts[i] = { ...arrayCarts[i], ...arrayProduct };
            }
        }

        await this.saveCart(arrayCarts);
        return arrayProduct;
    }
}

module.exports = CartManager;