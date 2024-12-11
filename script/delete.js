// Eliminar negocio
function eliminarNegocio() {
    const negocioId = document.getElementById('negocioId').textContent; // Asegúrate de que exista un elemento con id 'negocioId'
    console.log('Negocio a eliminar:', negocioId);
    // Confirmar la eliminación
    if (confirm('¿Estás seguro de que deseas eliminar este negocio?')) {
        fetch(`/api/delete-negocio/${negocioId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Devuelve el texto de la respuesta
            } else {
                throw new Error(`Error al eliminar negocio: ${response.statusText}`);
                
            }
        })
        .then(message => {
            console.log('Negocio eliminado:', message);
            alert('Negocio eliminado exitosamente.');
            window.location.reload(); // Recarga la página para actualizar la lista
        })
        .catch(error => {
            console.error('Error al eliminar negocio:', error);
            alert('Hubo un error al eliminar el negocio. Por favor, inténtalo de nuevo.');
        });
    }
}
