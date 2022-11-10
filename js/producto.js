
const contenedorCarrito = document.getElementById("contenedor-carrito")

const precioTotal = document.getElementById ("precio-total")

let carrito = [];

document.addEventListener ('DOMContentLoaded',  ()=> {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito()
    }
})

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice,1)
    actualizarCarrito();
    Toastify({
        text: "Eliminado del carrito",
        className: "info",
        style: {
          background: "#CFCFCF",
          color: "#FF4B4B",
        }
      }).showToast();
}

const actualizarCarrito = ()=> {
    contenedorCarrito.innerHTML = ``
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ("producto-carrito")
        div.innerHTML= 
        `<img class = "carrito-img"src = ${prod.img}></img>
        <p>${prod.nombre}</p>
        <p>$${prod.precio}</p>  
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button class="btn-modal" onclick = "eliminarDelCarrito(${prod.id})">X<i class="fa-solid fa-trash-xmark icon-carrito"></i></button>

        `
        
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        
    })
    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.precio * prod.cantidad, 0 )
}
// ====================botones modal================================

const btnComprar = document.getElementById("btn-comprar");
btnComprar.addEventListener("click",()=>{
    Swal.fire({
        title: '',
        text: 'Su compra fue realizada con exito',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor:'#006C67',
        background: 'rgb(170, 170, 170)'
    })
})

const btnVaciar = document.getElementById("btn-vaciar");
btnVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    carrito = []
    contenedorCarrito.innerHTML = ``;
    actualizarCarrito()

    Toastify({
        text: "Carrito vaciado",
        className: "info",
        style: {
          background: "#CFCFCF",
          color: "#FF4B4B",
        }
      }).showToast();
}

// =====================carrito========================

let catalogo = document.getElementById("catalogo")
fetch('productos.json')
    .then((response) => response.json())
    .then ((listaProductos) => {
        listaProductos.forEach((producto)=>{
            let card = document.createElement ("div");
    card.className = "card-producto";
    card.innerHTML = `<img src="${producto.img}"></img>
    <p class="titulo-card">${producto.nombre}</p>
    <ul class="lista-servicios">
        <li class="item-lista-internet">${producto.liCaracteristicas[0]}</li>
        <li class="item-lista-internet">${producto.liCaracteristicas[1]}</li>
    </ul> 
    <p><b>$${producto.precio}</b></p> 
    <button id="agregar ${producto.id}"class="btn-agregar btn btn-success">Agregar al carrito</button> `;
    
    catalogo.appendChild(card);
    const boton = document.getElementById(`agregar ${producto.id}`);
    boton.addEventListener("click",()=>{
        agregarAlCarrito(producto.id);
        Toastify({
            text: "Agregado al carrito",
            className: "info",
            duration: 2000,
            style: {
              background: "#CFCFCF",
              color: "#006C67",
            }
          }).showToast();        
        })
})
    
 // ===============AGREGAR AL CARRITO==========================

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId);
    if(existe){
        const prod = carrito.map(prod => {
            if(prod.id === prodId){
                prod.cantidad++
                prod.precio*prod,cantidad
            }
        })
    }
    else{
    const item = listaProductos.find((prod) => prod.id === prodId);
    carrito.push(item );
    
   
    };
    actualizarCarrito();
}
})