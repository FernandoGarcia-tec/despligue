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
            // Organizar los productos por categoría
            const productsByCategory = {
                'Comida': [],
                'Turismo': [],
                'Entretenimiento': [],
                'Hoteles': [],
                'Transporte': [],
                'Otros': []
            };

            data.forEach(product => {
                if (productsByCategory[product.categoria]) {
                    productsByCategory[product.categoria].push(product);
                }
            });

            // Cargar productos en sus respectivos carruseles
            loadProductsInCarousel('productCarousel', productsByCategory['Comida']);
            loadProductsInCarousel('turismoCarousel', productsByCategory['Turismo']);
            loadProductsInCarousel('diversionCarousel', productsByCategory['Entretenimiento']);
            loadProductsInCarousel('hotelesCarousel', productsByCategory['Hoteles']);
            loadProductsInCarousel('transporteCarousel', productsByCategory['Transporte']);
            loadProductsInCarousel('Carousel', productsByCategory['Otros']);
        })
        .catch(error => console.error('Error al cargar productos:', error));
});

// Función para cargar productos en un carrusel específico
function loadProductsInCarousel(carouselId, products) {
    const productCarousel = document.getElementById(carouselId);
    productCarousel.innerHTML = ''; // Limpiar contenido previo

    products.forEach((product, index) => {
        const activeClass = index === 0 ? 'active' : ''; // Hacer el primer elemento activo
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(product.ubicacion)}`;

        const carouselItem = `
            <div class="carousel-item ${activeClass}">
                <img src="${product.imagen}" class="d-block product-carousel-image" alt="${product.nombre}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${product.nombre}</h5>
                    <p>Descripción: ${product.descripcion}</p>
                    <p>Negocio: ${product.nombrenegocio}</p>
                    <p>
                        <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">
                            Ver ubicación en Google Maps
                        </a>
                    </p>
                </div>
            </div>
            
        `;
        productCarousel.innerHTML += carouselItem; // Añadir el nuevo elemento
    });
}
