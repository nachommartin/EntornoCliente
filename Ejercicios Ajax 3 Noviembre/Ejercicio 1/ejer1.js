
const enlace = document.querySelector("#comprobar")
const div = document.querySelector("#disponibilidad")


enlace.addEventListener('click', (e)=> {
    e.preventDefault();
    let datos
    fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio1/servidor/compruebaDisponibilidad.php', {
        method: 'GET',
    })
    .then(response=> {
        if (response.ok){
            return response.text()
        }
        return Promise.reject(response) 
          
    })

    .then(data => datos = data)

    .then(() => 
        {if(datos==="si"){
        div.innerHTML="Está disponible"; 
        }
        else{
        div.innerHTML="No está disponible";
        }
        })

    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
      })


})


