import {ConexionAPI} from "./APIS.js";


const lista= document.querySelector("[data-lista]")

function NuevoCard(titulo,precio,imagen,id){

    const Product= document.createElement("li")
    Product.className="card"
    Product.setAttribute("data-id",id)

    Product.innerHTML=`
    <img class="imag_producto" src="${imagen}" alt="">
                    <label class="">${titulo}</label>
                    <div class="container__descripcion">
                        
                        <label class="precio">$${precio} cop</label>
                        <button class="eliminar"></button>
                    </div>
    `
    return Product;
}

async function Ejecutarcard() {

   try{ const ListaBasedatos = await ConexionAPI.productos();

    ListaBasedatos.forEach( productos=> {
        
   
         lista.appendChild(NuevoCard(productos.titulo,productos.precio,productos.imagen, productos.id));

        });

        agregarEventosEliminar();
   }catch{

    console.log("error de conexion")
   }
    
}

Ejecutarcard();


//AGREGAR PRODUCTO

const formulario= document.querySelector("[data-form]")

async function Agregar(evento){

    evento.preventDefault();
    
    const titulo=document.querySelector("[data-nombre]").value;
    const precio=document.querySelector("[data-precio]").value;
    const imagen=document.querySelector("[data-imagen]").value;
    formulario.reset();

    try{    await ConexionAPI.AgregarProduct(titulo,precio,imagen)
        location.reload();

    }catch{
        alert("carga exitosa")
    }

} 

formulario.addEventListener("submit", evento=> Agregar(evento))


const limpiar= document.querySelector('.button')

limpiar.addEventListener('click', (e)=>{

    e.preventDefault();
    formulario.reset();    

})


// ELIMINAR PRODUCTO

function agregarEventosEliminar() { 
    const botonesEliminar = document.querySelectorAll('.eliminar'); 
    botonesEliminar.forEach(boton => { boton.addEventListener('click', async (e) => { 
       
        const tarjeta = e.target.closest('.card'); 
        const id = tarjeta.getAttribute('data-id'); 

        console.log(id)
        
        try { await ConexionAPI.eliminarProducto(id);
             tarjeta.remove(); 

        } catch (error) { 
            console.error('No se pudo eliminar el producto', error); 
        } 
    }); 
}); 

}
