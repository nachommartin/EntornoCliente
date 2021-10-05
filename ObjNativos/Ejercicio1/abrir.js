const b = document.querySelector("#boton");
b.addEventListener('click', abrir)

function abrir(){
    window.open("ventana.html", "", "width=400,height=200")
}