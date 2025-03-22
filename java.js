const productos = [
    { id: 1, nombre: "Nike Air Max", marca: "Nike", talla: "42", precio: 120, imagen: "airmax.jpg" },
    { id: 2, nombre: "Adidas UltraBoost", marca: "Adidas", talla: "40", precio: 150, imagen: "adidasu.webp" },
    { id: 3, nombre: "Puma RS-X", marca: "Puma", talla: "41", precio: 110, imagen: "pumax.jpeg" },
    { id: 4, nombre: "Reebok Classic", marca: "Reebok", talla: "39", precio: 90, imagen: "reebok.jpeg" },
    { id: 5, nombre: "New Balance 574", marca: "New Balance", talla: "43", precio: 100, imagen: "newb.jpeg" }
];

const carrito = [];
const productosContainer = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");

function mostrarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Marca: ${producto.marca}</p>
            <p>Talla: ${producto.talla}</p>
            <p>Precio: $${producto.precio}</p>
            <input type="number" min="1" value="1" id="cantidad-${producto.id}">
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
        `;
        productosContainer.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);

    const itemCarrito = carrito.find(p => p.id === id);
    if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }

    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        const li = document.createElement("li");
        li.innerHTML = `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad} 
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>`;
        listaCarrito.appendChild(li);
    });

    totalCarrito.textContent = total.toFixed(2);
}

mostrarProductos();