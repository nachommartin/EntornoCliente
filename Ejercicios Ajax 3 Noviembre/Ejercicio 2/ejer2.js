
const enlace = document.querySelector("#comprobar")
const div = document.querySelector("#disponibilidad")


enlace.addEventListener('click', (e)=> {
    e.preventDefault();
    let datos
    fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio2/servidor/compruebaDisponibilidadXML.php', {
        method: 'GET',
    })
    .then(response=> {
        if (response.ok){
            return response.text()
        }
        return Promise.reject(response) 
          
    })

    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        let contenido= xml.getElementsByTagName("disponible")[0].textContent
        div.innerHTML=contenido
        console.log(contenido)

        if(contenido==="si"){
            div.innerHTML="Está disponible"; 
            }
        
        else{
            div.innerHTML="No está disponible. Mira nuestras alternativas:";
            let salto = document.createElement("br")
            div.appendChild(salto)
            let lista = document.createElement("ul")
            let alternativas= xml.getElementsByTagName("login")

            for (let i = 0; i < alternativas.length; i++) {
                let alt = alternativas[i];
                let altList = document.createElement("li");
                let linki = document.createElement("a")
                const valor = document.querySelector("#login").value
                linki.textContent = valor+alt.textContent;
                linki.href="#"
                linki.addEventListener('click', (e)=>{
                    e.preventDefault();
                    fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio2/servidor/compruebaDisponibilidadXML.php', {
                     method: 'POST',
                     headers: {
                        "Content-Type":  "text/xml; charset=utf-8",
                        "Accept": "application/xml"
                    },
                    body:  '?xml version="1.0" encoding="utf-8"?><respuesta><disponible>no</disponible><alternativas><login>'+linki.textContent+'</login></alternativas></respuesta>'
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


