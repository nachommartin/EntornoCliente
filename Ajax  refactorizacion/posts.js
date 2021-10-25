const url = window.location.search;
const urlparametros = new URLSearchParams(url);
const id = urlparametros.get('id');
let peticion = new XMLHttpRequest();
peticion.open('GET', 'http://localhost:3000/posts/'+id); 
peticion.send();
peticion.addEventListener('load', ()=>{
    let post = JSON.parse(peticion.responseText);
    let titulo= document.querySelector("#titulo");
    let cuerpo= document.querySelector("#cuerpo");
    let autor= document.querySelector("#autor");
    let title = document.createTextNode(post.titulo);
    titulo.appendChild(title);
    let content = document.createTextNode(post.contenido);
    cuerpo.appendChild(content);
    let author = document.createTextNode(post.autor);
    autor.appendChild(author);

})

let accesoComentario= new XMLHttpRequest();
accesoComentario.open('GET', 'http://localhost:3000/comments?postId='+id); 
accesoComentario.send();
accesoComentario.addEventListener('load', ()=>{
    let comentarios = JSON.parse(accesoComentario.responseText);
    comentarios.forEach(comentario => {
        let commie= document.querySelector("#comentario");
        let espacio= document.createElement("br")
        commie.appendChild(espacio);
        let cont = document.createTextNode(comentario.contenido);
        let comentarista = document.createTextNode(comentario.autor);
        let fecha = comentario.fecha;
        console.log(fecha)
        let data = conversorFecha(fecha);
        let hoy= new Date();  
        let dias= calcularDias(hoy,data)
        commie.appendChild(cont);
        espacio= document.createElement("br")
        commie.appendChild(espacio);
        commie.appendChild(comentarista);
        espacio= document.createElement("br")
        commie.appendChild(espacio);
        let hapasado= document.createTextNode("Hace "+dias+" dias");
        commie.appendChild(hapasado);
        espacio= document.createElement("br")
        commie.appendChild(espacio);


        function conversorFecha(cadena) {
            let fecha = cadena.split("/");
            return new Date(fecha[2], fecha[1] - 1, fecha[0]);
        }
        
            
        function calcularDias(f1,f2){
         let dif = f1 - f2;
         let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
         return dias;
        }



    }
    )

})

let accesoUsers= new XMLHttpRequest();
accesoUsers.open('GET', 'http://localhost:3000/users'); 
accesoUsers.send();
accesoUsers.addEventListener('load', ()=>{
    let usuarios = JSON.parse(accesoUsers.responseText);
    usuarios.forEach(usuario => {
        let seleccion = document.querySelector("#who");
        let elemento= document.createElement("option");
        elemento.setAttribute("value", usuario.name);
        let txt= document.createTextNode(usuario.name);
        elemento.appendChild(txt); 
        seleccion.appendChild(elemento);
    }
    )
}
)

const select = document.querySelector("#who");
const boton = document.querySelector("#boton")
const tocho = document.querySelector("#tocho");
const today = new Date();

const validador ={
    contenido: false,
}

boton.addEventListener('click', (e)=> {
    e.preventDefault();
    validacion();
    const constructorComentario={
    autor: select.value,
    postId: id,
    contenido: tocho.value,
    fecha: today.toLocaleDateString()
    }
    const enviarComentario=new XMLHttpRequest();
    enviarComentario.open('POST', 'http://localhost:3000/comments/');
    enviarComentario.setRequestHeader('Content-type', 'application/json');
    enviarComentario.send(JSON.stringify(constructorComentario));   

    setTimeout( () => {
        location.reload()
    },50);

})


tocho.addEventListener('change', (e) =>{
    if (e.target.value.trim().length>0){
        validador.contenido= true;
    }
})

function validacion(){
    const valores = Object.values(validador)
    const validado = valores.findIndex(value => value==false)
    if (validado==-1){
        boton.click
    }
    else{
        alert('Un comentario no puede quedar vacío')
    }
    }


