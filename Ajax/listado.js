let contador =0; 
let peticion = new XMLHttpRequest();
peticion.open('GET', 'http://localhost:3000/posts/'); 
peticion.send();
peticion.addEventListener('load', ()=>{
    let posts = JSON.parse(peticion.responseText);
    posts.forEach(post => {
    contador++
    let tabla = document.querySelector('#cuerpoTabla');
    let fila = document.createElement('tr');
    let columna= document.createElement('td');
    let autor = document.createTextNode(post.autor);
    let c2= document.createElement('td');
    let id = document.createTextNode(post.titulo);
    let c3=document.createElement('td');
    let c4=document.createElement('td');
    columna.appendChild(autor);
    c2.appendChild(id);
    let e1=document.createElement('a');
    e1.innerHTML="<a href='posts.html?id="+contador+"'>Ver</a>";
    c3.appendChild(e1);
    let e2=document.createElement('a');
    e2.innerHTML="<a href=''>Borrar</a>";
    c4.appendChild(e2);
    e2.addEventListener('click', (e)=>{
        e.preventDefault()
        borrar();
        setTimeout( () => {
            location.reload()
        },50);
    })
    function borrar(){
        borrado = new XMLHttpRequest();
        borrado.open('DELETE', 'http://localhost:3000/posts/'+contador);
        borrado.send(); 
    }
    fila.appendChild(columna);
    fila.appendChild(c2);
    fila.appendChild(c3);
    fila.appendChild(c4);
    tabla.appendChild(fila);
    }



    )
})