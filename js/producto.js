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
let producto1 = new Producto (1,"TL-WR820N",10, 3550,"../img/820n2-300x300.jpg",["Velocidad de transmisión Inalámbrica de 300Mbps.","IPTV es compatible con los nuevos protocolos para optimizar la transmisión","Los protocolos de seguridad protegen su red doméstica con firewalls y encriptación inalámbrica."],1);
let producto2 = new Producto (2,"ARCHER C20",10, 6999,"../img/archerc202-300x300.jpg",["Soporta el estándar 802.11ac.","Conexiones simultáneas de 2.4GHz y 5GHz","Señal omnidireccional estable."],1);
let producto3 = new Producto (3,"ARCHER C60",5, 17600,"../img/archerc602-300x300.jpg", ["Consigue un Wi-Fi más rápido","El avanzado Wi-Fi AC desbloquea el rendimiento de tus dispositivos inalámbricos","Funcionalidades avanzadas de software como Control Parental y Red de Invitados"],1);

let listaProductos = [producto1, producto2, producto3 ];
let listaProductosCStock = listaProductos.filter((producto) => producto.stock > 0) ;
console.log (listaProductos)
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
    card.className = "card-servicio";
    card.innerHTML = `<img src="${producto.img}"></img>
    <p class="titulo-card">${producto.nombre}</p>
    <ul class="lista-servicios">
        <li class="item-lista-internet">${producto.liCaracteristicas[0]}</li>
        <li class="item-lista-internet">${producto.liCaracteristicas[1]}</li>
        <li class="item-lista-internet">${producto.liCaracteristicas[2]}</li>
    </ul> 
    <p><b>$${producto.precio}</b></p> 
    <button id="agregar ${producto.id}"class="boton-contacto">Agregar al carrito</button> `;
    
    catalogo.appendChild(card);
    const boton = document.getElementById(`agregar ${producto.id}`);
    boton.addEventListener("click",()=>{
        agregarAlCarrito(producto.id)

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
    
    console.log(carrito);
};
actualizarCarrito();
}
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice,1)
    actualizarCarrito();
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
        <button class="eliminar boton-contacto" onclick = "eliminarDelCarrito(${prod.id})">Eliminar<i class="fa-solid fa-trash-xmark icon-carrito"></i></button>
        `
        
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        
    })
    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.precio, 0 )
}
