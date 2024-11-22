 const url= "https://github.com/DeiviV7/Ventas-"
 
 async function productos(){

   try{ const productos= await fetch(url)
    const datos= await productos.json();
    
      console.log(datos)
    return datos;

   }catch{
        console.log("Tenemos un erro, espera un rato")
   }
 } 
 
 




async function AgregarProduct(titulo,precio,imagen) {

  try{  const envios= await fetch(url, {

    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      titulo:titulo,
      precio:precio,
      imagen:imagen
    })
    

  })
    
  const Datos= await envios.json();
  

  return Datos;

  }catch{
    console.log("datos no enviados correctamente");

  }
  
}

// delete

export async function eliminarProducto(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('response:', response)

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
    } catch (error) {
        console.error('Error al conectar con la API', error);
        throw error;
    }
}



export const ConexionAPI={
  productos,AgregarProduct,eliminarProducto 
};
