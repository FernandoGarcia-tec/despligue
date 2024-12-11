document.addEventListener("DOMContentLoaded", function () {
    // Llamar a la API para obtener productos
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            return response.json();
        })
        .then(data => {
            // Filtrar solo los productos de la categoría 'Comida'
            const productosComida = data.filter(product => product.categoria === 'Comida');

            
            // Añadir negocios de comida a la lista del directorio
            const listaNegocios = document.getElementById('listaNegocios');

            productosComida.forEach((product, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = product.nombre;
                listItem.onclick = () => mostrarDetalleNegocio(product); // Pasar producto seleccionado
                listaNegocios.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al cargar productos:', error));
});

// Función para mostrar detalles del negocio seleccionado
function mostrarDetalleNegocio(product) {
    document.getElementById('negocioImagen').src = product.imagen;
    document.getElementById('negocioNombre').textContent = product.nombre;
    document.getElementById('negocioCategoria').textContent = product.categoria;
    document.getElementById('negocioDescripcion').textContent = product.descripcion;
    document.getElementById('negocioUbicacion').textContent = product.ubicacion;
    document.getElementById('negocioStock').textContent = product.stock;
}
