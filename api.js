const getProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const products = data.map(product => {
            return {
                id: product.id,
                titulo: product.title,
                descripcion: product.description,
                imagen: product.image,
                precio: product.price
            }
        });
        return products;
    } catch (error) {
        console.log(error);
    }
}

function mostrarProductos() {
    getProducts().then(products => {
        products.forEach(articulo => {
            const li = document.createElement('li');

            li.textContent = `${articulo.titulo} - $${articulo.precio}`;
            li.addEventListener('click', () => mostrarDetalleArticulo(articulo));

            const botonAgregar = document.createElement('button');
            botonAgregar.textContent = 'Agregar al carrito';
            botonAgregar.addEventListener('click', () => agregarAlCarrito(articulo));
            li.appendChild(botonAgregar);

            articulosLista.appendChild(li);
        });
    });
}

mostrarProductos();
