
// let precioTotal = 0;
function Producto (id,nombre,stock,precio,img,liCaracteristicas,cantidad){
    this.id = id
    this.nombre = nombre;
    this.stock = stock || 0;
    this.precio = precio;
    this.img = img;
    this.liCaracteristicas = liCaracteristicas;
    this.cantidad = cantidad
}
let producto1 = new Producto (1,"TL-WR820N",10, 3550,"../img/820n2-300x300.jpg",["Velocidad de transmisión Inalámbrica de 300Mbps.","IPTV es compatible con los nuevos protocolos para optimizar la transmisión"],1);
let producto2 = new Producto (2,"ARCHER C20",10, 6999,"../img/archerc202-300x300.jpg",["Soporta el estándar 802.11ac.","Conexiones simultáneas de 2.4GHz y 5GHz"],1);
let producto3 = new Producto (3,"ARCHER C60",5, 17600,"../img/archerc602-300x300.jpg", ["Consigue un Wi-Fi más rápido","El avanzado Wi-Fi AC desbloquea el rendimiento de tus dispositivos inalámbricos"],1);

let listaProductos = [producto1, producto2, producto3 ];
let listaProductosCStock = listaProductos.filter((producto) => producto.stock > 0) ;

// ========================================================================================


const contenedorCarrito = document.getElementById("contenedor-carrito")

const precioTotal = document.getElementById ("precio-total")

let carrito = [];

document.addEventListener ('DOMContentLoaded',  ()=> {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito()
    }

})

// =====================carrito========================

let catalogo = document.getElementById("catalogo")

for(const producto of listaProductosCStock){
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
        agregarAlCarrito(producto.id)
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
}; 

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
    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.precio, 0 )
}

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
