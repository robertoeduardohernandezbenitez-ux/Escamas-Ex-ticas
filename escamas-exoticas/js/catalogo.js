document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('catalogo-container');
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    let animales = [];

    // Cargar el JSON
    fetch('data/animales.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar catálogo');
            return response.json();
        })
        .then(data => {
            animales = data;
            mostrarAnimales(animales);
        })
        .catch(error => {
            container.innerHTML = `<p class="error">⚠️ No se pudo cargar el catálogo. Intenta más tarde.</p>`;
            console.error(error);
        });

    // Función para mostrar animales (con filtro opcional)
    function mostrarAnimales(lista) {
        if (!lista.length) {
            container.innerHTML = '<p>No hay animales en esta categoría.</p>';
            return;
        }

        let html = '';
        lista.forEach(animal => {
            // Construir mensaje de WhatsApp con el texto personalizado del JSON
            const mensajeWhatsApp = encodeURIComponent(animal.contactoWhatsApp);
            const numeroTelefono = '521234567890'; // <-- CAMBIA ESTE NÚMERO AL REAL DE TU AMIGO (código país + número, sin '+' ni espacios)
            const whatsappLink = `https://wa.me/${numeroTelefono}?text=${mensajeWhatsApp}`;

            html += `
                <div class="tarjeta-animal" data-categoria="${animal.categoria}">
                    <div class="tarjeta-imagen">
                        <img src="${animal.foto}" alt="${animal.nombre}" loading="lazy">
                    </div>
                    <div class="tarjeta-contenido">
                        <h3>${animal.nombre}</h3>
                        <p class="especie"><i class="fas fa-paw"></i> ${animal.especie}</p>
                        <div class="detalle">
                            <i class="fas fa-leaf"></i> <strong>Cuidados:</strong> ${animal.cuidados}
                        </div>
                        <div class="detalle">
                            <i class="fas fa-globe-americas"></i> <strong>Hábitat:</strong> ${animal.habitat}
                        </div>
                        <div class="detalle">
                            <i class="fas fa-apple-alt"></i> <strong>Alimentación:</strong> ${animal.alimentacion}
                        </div>
                        <a href="${whatsappLink}" class="btn-contactar" target="_blank">
                            <i class="fab fa-whatsapp"></i> Preguntar por este animal
                        </a>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    // Lógica de filtros
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar clase active en botones
            filtroBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filtro = btn.getAttribute('data-filtro');
            if (filtro === 'todos') {
                mostrarAnimales(animales);
            } else {
                const filtrados = animales.filter(a => a.categoria === filtro);
                mostrarAnimales(filtrados);
            }
        });
    });
});