// Lógica JavaScript para tu aplicación

// Ejemplo: Generar dinámicamente los artículos en la lista
const articulosLista = document.getElementById('articulos-lista');
const carritoLista = document.getElementById('carrito-lista');
const totalCarrito = document.getElementById('total-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
let productsData = [];


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
      console.log(products)
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


// Datos de ejemplo
// const articulos = [
//   { id: 1, titulo: 'Chevrolete Super Sport 1974', imagen: 'imagenes/chevy_ss.png', descripcion: 'Chevrolet Chevy es un automóvil de turismo construido por General Motors de Argentina para la marca Chevrolet, durante las décadas de 1960 y 1970. El coche es un derivado del modelo estadounidense Chevrolet Nova de tercera generación. Su aparición significó la difícil tarea de hacer sombra al Ford Falcon y al IKA Torino, los cuales ya estaban instalados en el mercado y contaban con buena reputación.', precio: 4500 },
//   { id: 2, titulo: 'Chevrolete Malibu Super Sport 1970', imagen: 'imagenes/malibu_ss.png', descripcion: 'El Chevrolet Malibu es el nombre con el que se conoce a una serie de automóviles de turismo, producidos por el fabricante norteamericano General Motors, para la marca Chevrolet. El Malibu comenzó como un nivel de equipamiento del Chevrolet Chevelle, pero se convirtió en su propia línea de modelos en 1978', precio: 3500 },
//   { id: 3, titulo: 'Chevrolete Bel Air 1967', imagen: 'imagenes/bel_air.png', descripcion: 'El Chevrolet Bel Air fue un automóvil producido en serie entre 1953 y 1975 por Chevrolet, una división de la General Motors Corporation. De 1950 a 1952, los automóviles Chevrolet de lujo eran llamados Bel Air, aunque todavía no era el nombre oficial, utilizado recién a partir de 1953.', precio: 5000 }
// ];

// // Generar los elementos de lista
// articulos.forEach((articulo) => {
//   console.log(articulo);
//   const li = document.createElement('li');

//   li.textContent = `${articulo.titulo} - $${articulo.precio}`;
//   li.addEventListener('click', () => mostrarDetalleArticulo(articulo));
//   //articulosLista.appendChild(li);

//   // Botón para agregar al carrito
//   const botonAgregar = document.createElement('button');
//   botonAgregar.textContent = 'Agregar al carrito';
//   botonAgregar.addEventListener('click', () => agregarAlCarrito(articulo));
//   li.appendChild(botonAgregar);

//   articulosLista.appendChild(li);
// });

const detalleArticulo = document.getElementById('articulo-detalle');

// Función para mostrar el detalle de un artículo
function mostrarDetalleArticulo(articulo) {
  detalleArticulo.innerHTML = `
    <h3>${articulo.titulo}</h3>
    <img src=${articulo.imagen} width="10%" height="10%" alt="${articulo.titulo}">
    <p>${articulo.descripcion}</p>
    <!-- Aquí puedes agregar más contenido relacionado con el detalle del artículo -->
  `;
}

let request = window.indexedDB.open('miBaseDeDatos', 1);



// Manejar la lógica para actualizar el total del carrito
function actualizarTotalCarrito(precio) {
  const totalActual = parseFloat(totalCarrito.textContent.slice(7));
  const nuevoTotal = totalActual + precio;
  totalCarrito.textContent = `Total: $${nuevoTotal.toFixed(2)}`;
}

let carritoItems = [];

function agregarAlCarrito(articulo) {
  let autoNombre = articulo.titulo;
  let autoPrecio = articulo.precio;

  let item = {
    nombre: autoNombre,
    precio: autoPrecio
  };

  carritoItems.push(item);
  mostrarCarrito();
}

function vaciarCarrito() {
  carritoItems = [];
  detalleArticulo.innerHTML = '';
  mostrarCarrito();
}

function mostrarCarrito() {
  let carritoItemsElement = document.getElementById('carritoItems');
  carritoItemsElement.innerHTML = '';

  carritoItems.forEach(function (item) {
    let li = document.createElement('li');
    li.textContent = item.nombre + ' - ' + item.precio;
    carritoItemsElement.appendChild(li);
  });
}