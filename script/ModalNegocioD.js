// Captura el parámetro de la URL
const urlParams = new URLSearchParams(window.location.search);
const nombreNegocio = urlParams.get('nombreNegocio');
const productCategory = urlParams.get('productCategory');
console.log(productCategory);
// Completar el campo de negocio en el modal
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nombrenegocio").value = nombreNegocio || 'Nombre no especificado';
    cargarProductos();  // Llama a la función para cargar productos al iniciar
});

// Función para cargar los productos del negocio específico
async function cargarProductos() {
    try {
        const response = await fetch(`/api/productosN?nombreNegocio=${encodeURIComponent(nombreNegocio)}`);
        const productos = await response.json();

        const catalogo = document.getElementById('product-catalog');
        catalogo.innerHTML = '';
        console.log(nombreNegocio);
        productos.forEach(producto => {
           
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" >
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Descripción: ${producto.descripcion}</p>
                <p>Ubicacion: ${producto.ubicacion}</p>
                <span id="productoId">${producto.id}</span>
                <button class="delete-button" onclick="eliminarProducto()">Eliminar</button>
                    
            `;
            catalogo.appendChild(productCard);
            
            // Apply CSS to format the product cards in a 3-column layout
            catalogo.style.display = 'grid';
            catalogo.style.gridTemplateColumns = 'repeat(4, 1fr)';
            catalogo.style.gap = '40px';
            catalogo.style.margin = '20px';
            productCard.style.width = '250px';
            // Apply CSS to style the product cards


            
            


        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}
