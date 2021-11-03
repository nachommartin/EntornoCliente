
const enlace = document.querySelector("#comprobar")
const div = document.querySelector("#disponibilidad")


enlace.addEventListener('click', (e)=> {
    e.preventDefault();
    fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio3/servidor/compruebaDisponibilidadJSON.php', {
        method: 'GET',
    })
    .then(response=> {
        if (response.ok){
            return response.json()
        }
        return Promise.reject(response) 
          
    })

    .then(data => {
        
        let contenido= data.disponible
        div.innerHTML=contenido

        if(contenido==="si"){
            div.innerHTML="Está disponible"; 
            }
        
        else{
            div.innerHTML="No está disponible. Mira nuestras alternativas:";
            let salto = document.createElement("br")
            div.appendChild(salto)
            let lista = document.createElement("ul")
            let alternativas= data.alternativas
            console.log(alternativas)

            for (let i in alternativas) {
                let alt = alternativas[i];
                let altList = document.createElement("li");
                let linki = document.createElement("a")
                const valor = document.querySelector("#login").value
                linki.textContent = valor+alt;
                linki.href="#"
                linki.addEventListener('click', (e)=>{
                    e.preventDefault();
                    fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio3/servidor/compruebaDisponibilidadJSON.php', {
                     method: 'POST',
                     headers: {
                        "Content-Type":  "application/json",
                    },
                    body:  JSON.stringify(linki.textContent),
                    })      
                    .then(response=> {
                        if (response.ok){
                        return response.text()
                    }
                    return Promise.reject(response) 
          
                    })
                    .catch(err => {
                        console.log('Error en la petición HTTP: '+err.message);
                    })
                })
                altList.appendChild(linki)
                lista.appendChild(altList);
                }
             div.appendChild(lista)
            }
  })



   
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
      })
})


