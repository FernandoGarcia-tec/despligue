document.addEventListener("DOMContentLoaded", function() {
    const productEmail = document.getElementById('productEmail').value;
    
    fetch(`/api/negocios`)
        .then(response => response.json())
        .then(data => {
            console.log('API response data:', data); // Log the entire data object
            
            console.log('API response data length:', data.length); // Log the length of the data objects
            const cardNegocios = document.getElementById('cardNegocios');
            const Mensaje = document.getElementById('Mensaje');
            const MensajeLimite = document.getElementById('MensajeLimite');
            if (data.length === 0) {
                console.error('No se encontraron negocios');
                cardNegocios.style.display = 'none'; // Hide the card if there are no businesses
                Mensaje.style.display = 'block'; // Show the message if there are no businesses
                MensajeLimite.style.display = 'none'; // Hide the message if there are no businesses
                return;
            }else{
                Mensaje.style.display = 'none';
                MensajeLimite.style.display = 'none';
            }
            
            const nombre = data[0].nombre;
            const imagenNegocio = data[0].imagen;
            data.forEach((negocio, index) => {
                console.log(`Negocio ${index + 1}:`, negocio);
                console.log('Nombre del negocio:', negocio.id);
                // Create image element for each business
                if (index === 0) {
                    document.getElementById("img2").src = negocio.imagen;
                    console.log('Imagen del negocio fut:', negocio.imagen, index);
                    document.getElementById("negocioId").textContent = negocio.id;
                    document.getElementById("titulo").textContent = negocio.nombre;
                    console.log('Nombre del negocio:', negocio.nombre);
                } else {
                    console.log('Imagen del negocio fat:', negocio.imagen, index);
                    document.getElementById("img3").src = negocio.imagen;
                    document.getElementById("titulo2").textContent = negocio.nombre;
                    console.log('Nombre del negocio 2:', negocio.nombre);

                    
                    
                    
                }
               
            });
            
            const welcomeMessage = document.getElementById("welcome-message");
            const showmen = document.getElementById("showmen");
            const modalAñadir = document.getElementById("openModalBtn");
            if (data.length > 1) {
               cardNegocios.style.display = 'block';
                showmen.style.display = "block";
                modalAñadir.style.display = "none";
                Mensaje.style.display = 'none';
                MensajeLimite.style.display = 'block';
            }
        })
        .catch(error => console.error('Error:', error));
});
