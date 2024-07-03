const BASEURL = 'https://matygonza.pythonanywhere.com';

//const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showProductos(){
    let productos =  await fetchData(BASEURL+'/api/productos', 'GET');
    const tableProductos = document.querySelector('#list-table-productos');
    tableProductos.innerHTML='';
    productos.forEach((producto, index) => {
      let tr = `<tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.tipo}</td>
                    <td>${producto.precio}</td>
                    <td>
                        <img src="${producto.imagen}" width="30%">
                    </td>
                    <td>
                        <button class="btn-cac" onclick='updateProducto(${producto.id})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteProducto(${producto.id})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableProductos.insertAdjacentHTML("beforeend",tr);
    });
  }

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveProducto(){
    const id = document.querySelector('#id').value;
    const nombre = document.querySelector('#nombre').value;
    const tipo = document.querySelector('#tipo').value;
    const precio = document.querySelector('#precio').value;
    const imagen = document.querySelector('#imagen').value;
    //VALIDACION DE FORMULARIO
    if (!nombre || !tipo || !precio || !imagen) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos de la película
    const productoData = {
        nombre: nombre,
        tipo: tipo,
        precio: precio,
        imagen: imagen,
    };
  let result = null;
  // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
  if(id!==""){
    result = await fetchData(`${BASEURL}/api/productos/${id}`, 'PUT', productoData);
  }else{
    // Si no hay idMovie, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/productos/`, 'POST', productoData);
  }
  
  const formProducto = document.querySelector('#form-producto');
  formProducto.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showProductos();
}
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteProducto(id){
    Swal.fire({
        nombre: "Esta seguro de eliminar la producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'DELETE');
          showProductos();
          Swal.fire(response.message, "", "success");
        }
    });
    
}






/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
*/
async function updateProducto(id){
    //Buscamos en el servidor la pelicula de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'GET');
    const _id= document.querySelector('#id');
    const nombre = document.querySelector('#nombre');
    const tipo = document.querySelector('#tipo');
    const precio = document.querySelector('#precio');
    const imagen = document.querySelector('#imagen');
    
    _id.value = response.id;
    nombre.value = response.nombre;
    tipo.value = response.tipo;
    precio.value = response.precio;
    imagen.value = response.imagen;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveProducto = document.querySelector('#btn-save-producto');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveProducto.addEventListener('click',saveProducto);
    showProductos();
});
  