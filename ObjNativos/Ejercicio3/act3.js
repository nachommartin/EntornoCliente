const boton = document.querySelector("#boton")
boton.addEventListener('click', assign)
const b2 = document.querySelector("#boton2")
b2.addEventListener('click', replace)
const b3 = document.querySelector("#boton3")
b3.addEventListener('click', reload)


function assign(){
 location.assign("https://www.laparadinha.com")
}

function replace(){
 location.replace("https://www.laparadinha.com")
}

/*La única diferencia es que con el assign sigue un camino pudiendo ir hacia atrás y el replace lo reemplaza
como si la web original no la hubieramos visitado */
 
function reload(){
 location.reload(true)
}