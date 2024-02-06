const socket = io();

socket.on("products", (data) => {
    renderProducts(data);
})

const renderProducts = (productos) => {
    const contenedorProducts = document.getElementById("contenedorProducts");
    contenedorProducts.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
                        <p> ${item.id} </p>
                        <p> ${item.title} </p>
                        <p> ${item.price} </p>
                        <button> Eliminar </button>
        `;
        contenedorProducts.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id);
        })
    })

    const eliminarProducto = (id) => {
        socket.emit("eliminarProducto", id);
    }

    document.getElementById("btnSend").addEventListener("click", () => {
        agregarProducto();
    })

    const agregarProducto = () => {
        const product = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            img: document.getElementById("img").value,
            code: document.getElementById("code").value,
            stock: document.getElementById("stock").value,
            category: document.getElementById("category").value,
            status: document.getElementById("status").value
        }

        socket.emit("agregarProducto", product);
    };

    
}
