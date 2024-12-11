document.addEventListener("DOMContentLoaded", function () {
    // Tab switching functionality
    document.getElementById('tabProductos').addEventListener('click', function () {
        toggleSection('productos');
    });
    document.getElementById('tabNegocios').addEventListener('click', function () {
        toggleSection('negocios');
    });
    

    // Fetch and display products
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const listaProductos = document.getElementById('listaProductos');
            data.forEach((product) => {
                const listItem = document.createElement('li');
                listItem.textContent = product.nombre;
                listItem.onclick = () => mostrarDetalleProducto(product);
                listaProductos.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al cargar productos:', error));

    // Fetch and display businesses (negocios)
    fetch('/api/negocios')
        .then(response => response.json())
        .then(data => {
            const listaNegocios = document.getElementById('listaNegocios');
            data.forEach((negocio) => {
                const listItem = document.createElement('li');
                listItem.textContent = negocio.nombre;
                listItem.onclick = () => mostrarDetalleNegocio(negocio);
                listaNegocios.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al cargar negocios:', error));
});

// Toggle between Productos and Negocios sections
function toggleSection(section) {
    const productosSection = document.getElementById('productosSection');
    const detalleProducto = document.getElementById('detalleProducto');
    const negociosSection = document.getElementById('negociosSection');
    const detalleNegocio = document.getElementById('detalleNegocio');

    if (section === 'productos') {
        productosSection.style.display = 'block';
        detalleProducto.style.display = 'block';
        negociosSection.style.display = 'none';
        detalleNegocio.style.display = 'none';
        document.getElementById('tabProductos').classList.add('active');
        document.getElementById('tabNegocios').classList.remove('active');
    } else {
        productosSection.style.display = 'none';
        detalleProducto.style.display = 'none';
        negociosSection.style.display = 'block';
        detalleNegocio.style.display = 'block';
        document.getElementById('tabNegocios').classList.add('active');
        document.getElementById('tabProductos').classList.remove('active');
    }
}

// Display product details
function mostrarDetalleProducto(product) {
    document.getElementById('productoImagen').src = product.imagen;
    document.getElementById('productoNombre').textContent = product.nombre;
    document.getElementById('productoCategoria').textContent = product.categoria;
    document.getElementById('productoDescripcion').textContent = product.descripcion;
    document.getElementById('productoStock').textContent = product.stock;

    // Generate Google Maps iframe
    const mapsIframe = `<iframe 
        width="100%" 
        height="200" 
        frameborder="0" 
        style="border:0; margin-top: 10px;" 
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCDBBWwWfZSxUWUVasaKXWh9s5G8F3kZnA&q=${encodeURIComponent(product.ubicacion)}" 
        allowfullscreen>
    </iframe>`;
    document.getElementById('productoUbicacion').innerHTML = mapsIframe;
}

// Display business (negocio) details
function mostrarDetalleNegocio(negocio) {
    document.getElementById('negocioImagen').src = negocio.imagen;
    document.getElementById('negocioNombre').textContent = negocio.nombre;
    document.getElementById('negocioCategoria').textContent = negocio.categoria;
    document.getElementById('negocioDescripcion').textContent = negocio.descripcion;


    // Generate Google Maps iframe
    const mapsIframe = `<iframe 
        width="100%" 
        height="200" 
        frameborder="0" 
        style="border:0; margin-top: 10px;" 
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCDBBWwWfZSxUWUVasaKXWh9s5G8F3kZnA&q=${encodeURIComponent(negocio.ubicacion)}" 
        allowfullscreen>
    </iframe>`;
    document.getElementById('negocioUbicacion').innerHTML = mapsIframe;
}
