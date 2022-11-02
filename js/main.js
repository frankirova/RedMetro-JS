// ==============Obj abonos=================
const listaAbonos = [
    {
        id : 1,
        nombre : "6MB",
        precio : 2990,
        liCaracteristicas : ["Cargo de instalación $9500","No requiere servicios adicionales","Consultar disponibilidad en la zona"]
    },
    {
        id : 2,
        nombre : "10MB",
        precio : 3940,
        liCaracteristicas : ["Cargo de instalación $9500","No requiere servicios adicionales","Consultar disponibilidad en la zona"]
    },
    {
        id : 3,
        nombre : "15MB",
        precio : 4190,
        liCaracteristicas : ["Cargo de instalación $9500","No requiere servicios adicionales","Consultar disponibilidad en la zona"]
    }
]


// =============Arrays y variables=================


let listaNombresAbonos = [];
for (const abono of listaAbonos){
    listaNombresAbonos.push(abono.nombre)
} 

let listaPreciosAbonos = [];

for (const abono of listaAbonos){
    listaPreciosAbonos.push(abono.precio)
} 
let listaNombresClientes = []
let abonoElegido=[] ;
let precioInstalacion = 9500;

// ================Elegir abono==================

const formulario =document.getElementById("formulario") ;
const serviciosResidenciales = document.getElementById("servicios-residenciales");
const reset = document.getElementById("btn-reset");

for(const abono of listaAbonos){
    let card = document.createElement ("div");
    card.className = "card-servicio";
    card.innerHTML = `<p class="titulo-card">${abono.nombre}</p>
    <ul class="lista-servicios">
        <li class="item-lista-internet">${abono.liCaracteristicas[0]}</li>
        <li class="item-lista-internet">${abono.liCaracteristicas[1]}</li>
        <li class="item-lista-internet">${abono.liCaracteristicas[2]}</li>
    </ul> 
    <p><b>$${abono.precio}</b></p>
    <button =onclick id="${abono.id}" class="btn btn-success">Elegir abono</button>`;
    serviciosResidenciales.append (card)
    const boton = document.getElementById(`${abono.id}`);
    boton.addEventListener("click",()=>{
        elegirAbono(abono.id);
        mostrarFormulario ();
        
        
    })

} ;
// ===============================================================

let elegirAbono = (abonoId) => {
const item = listaAbonos.find((abono) => abono.id === abonoId);
    abonoElegido.push(item);
};

// =============formulario=====================

function storageForm(){
    document.addEventListener ('DOMContentLoaded',  ()=> {

        if(localStorage.getItem('cliente')){
            cliente = JSON.parse(localStorage.getItem('cliente'));
            abonoElegido = JSON.parse(localStorage.getItem('abonoElegido'))
        }
    })
    localStorage.setItem('cliente', JSON.stringify(cliente))
    localStorage.setItem('abonoElegido', JSON.stringify(abonoElegido))
    mostrarMensajeBienvenida()
};
function mostrarMensajeBienvenida (){
    for (const abonoe of abonoElegido){
        let nombreAbonoe = abonoe.nombre
        let precioAbonoe = abonoe.precio
    
    
    serviciosResidenciales.innerHTML =  `
    <div>
    <p><b>Bienvenido ${cliente[0]} a Red Metropolitana</b></p> 
    <p>Abono elegido: <b>${nombreAbonoe}</b></p>
    <p>total : $${precioAbonoe + precioInstalacion}</p>
    </div>
    `
    }
}

function mostrarFormulario (){
    serviciosResidenciales.innerHTML = 
    `<div class="container">
        <div class="row">
            <div class="col-md-12 formu">
                <div class="well well-sm">
                    <form class="form-horizontal" method="get">
                        <fieldset>
                            <legend class="text-center header">Ingrese los siguientes datos para confirmar la instalacion:</legend>

                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i
                                        class="fa fa-user bigicon"></i></span>
                                <div class="col-md-8">
                                    <input id="fname" name="name" type="text" placeholder="Nombre"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i
                                        class="fa fa-user bigicon"></i></span>
                                <div class="col-md-8">
                                    <input id="lname" name="name" type="text" placeholder="Apellido"
                                        class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i
                                        class="fa fa-user bigicon"></i></span>
                                <div class="col-md-8">
                                    <input id="dni" name="phone" type="text" placeholder="DNI"
                                        class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                            <span class="col-md-1 col-md-offset-2 text-center"><i
                                    class="fa fa-pencil-square-o bigicon"></i></span>
                            <div class="col-md-8">
                                <input id="direccion" name="phone" type="text" placeholder="Direccion"
                                    class="form-control">
                            </div>
                        </div>

                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i
                                        class="fa fa-envelope-o bigicon"></i></span>
                                <div class="col-md-8">
                                    <input id="email" name="email" type="text" placeholder="Email "
                                        class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i
                                        class="fa fa-phone-square bigicon"></i></span>
                                <div class="col-md-8">
                                    <input id="phone" name="phone" type="text" placeholder="Telefono"
                                        class="form-control">
                                </div>
                            </div>
                           
                
                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i
                                        class="fa fa-pencil-square-o bigicon"></i></span>
                                <div class="col-md-8">
                                    <textarea class="form-control" id="message" name="message"
                                        placeholder="Referencias del domicilio."
                                        rows="7"></textarea>
                                </div>
                            </div>

                        

                            <div class="form-group">
                                <div class="col-md-12 text-center contenedor-btn">
                                    <button type="submit" id= "btn-enviar" class="btn btn-primary btn-lg">Enviar</button>
                                    <button type="reset" id= "btn-reset" class="btn btn-primary btn-lg">Reset</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>`
    capturar();
    const enviar = document.getElementById("btn-enviar");
    enviar.addEventListener("click",storageForm);
    
};

function capturar(){    
    const nombre =document.getElementById("fname") 
    const apellido =document.getElementById("lname") 
    const dni =document.getElementById("dni")
    const direccion =document.getElementById("direccion") 
    const eMail =document.getElementById("email")
    const telefono =document.getElementById("phone")
    const ref =document.getElementById("message")

    nombre.addEventListener('change',() => cliente.push(nombre.value))
    apellido.addEventListener('change',() => cliente.push(apellido.value))
    dni.addEventListener('change',() => cliente.push(dni.value))
    direccion.addEventListener('change',() => cliente.push(direccion.value))
    eMail.addEventListener('change',() => cliente.push(eMail.value))
    telefono.addEventListener('change',() => cliente.push(telefono.value))
    ref.addEventListener('change',() => cliente.push(ref.value))

    
};

let cliente = [ ];
console.log(cliente)
