function redirectToProducts(tituloId) {
    
    const negocioNombre = document.getElementById(tituloId).textContent;// Obtener el nombre del negocio seleccionado por el usuario para redirigir a la página de ventas
    
    console.log(negocioNombre);
    window.location.href = `/salesV?nombreNegocio=${encodeURIComponent(negocioNombre, productCategory)}`;// Redirigir a la página de ventas con el nombre del negocio seleccionado
}
