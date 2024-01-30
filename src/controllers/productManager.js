const fs = require("fs");

class ProductManager {
    static id = 0;

    constructor(path) {
        this.products = []
        this.path = path
    }

    async addProduct({title, description, code, price, stock, category, thumbnail}){
        try {
            const arrayProducts = await this.getProducts();

            if (!title || !description || !code || !price || !stock || !category) {
                console.log("Todos los campos son OBLIGATORIOS");
                return false;
            }

            if (arrayProducts.some(e => e.code === code)) {
                console.log("El codigo debe ser UNICO para cada producto");
                return false;
            }

            const newProduct = {
                title,
                description,
                code,
                price,
                stock,
                category,
                status: true,
                thumbnail: thumbnail || []
            };

            if (arrayProducts.length > 0) {
                ProductManager.id = arrayProducts.reduce((maxId, product) => Math.max(maxId, product.id),0);
            }

            newProduct.id = ++ProductManager.id;

            arrayProducts.push(newProduct);

            await this.saveFile(arrayProducts);

            return true;

        } catch (error) {
            console.log("Error al agregar producto", error);
            throw error;
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const response = await fs.promises.readFile (this.path, "utf-8");
                const arrayResponse = JSON.parse(response);
                return arrayResponse;
            } else {
                return console.log (this.products);
            }
        } catch (error) {
            console.log ("Error al leer el Archivo!");
        }
    }
  
    async getProductById(id) {
        try {
            const objectRequest = await fs.promises.readFile(this.path, "utf-8");
            const objectResponse = JSON.parse(objectRequest);
            const productId = objectResponse.find(e => e.id === id);
            if (productId) {
                return productId;
            } else {
                console.log ("No se posee productos con el ID especificado");
            } 
        } catch (error) {
            console.log("Error al buscar el producto por ID");
        }
    }

    async saveFile (productAdd) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(productAdd, null, 2));
        } catch (error) {
            console.log("Error al guardar/modificar Archivo!");
        }
    }

    async updateProduct (id, objectProduct) {
        try {
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(fileContent);

            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
                    this.products[i] = { ...this.products[i], ...objectProduct };
                }
            }

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));

        } catch (error) {
            console.log ("Error al intentar actualizar Products")
        }
    }

    async deleteProduct (id) {
        try {
            const objectRequest = await fs.promises.readFile(this.path, "utf-8");
            const objectResponse = JSON.parse(objectRequest);
            if (objectResponse.find(e => e.id === id)) {
                this.products = objectResponse.filter(obj => obj.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
            } else {
                console.log("No hay productos con el Id especificado para borrar");
            }
        } catch (error) {
            console.log ("Error al intentar eliminar el producto")
        }
    }

}

//Lo exporto para que pueda ser utilizado en app.js
module.exports = ProductManager;