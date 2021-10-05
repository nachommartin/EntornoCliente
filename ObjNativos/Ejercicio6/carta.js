const b1 = document.querySelector("#atras");
const b2 = document.querySelector("#delante");
b1.addEventListener('click', atras)
b2.addEventListener('click', delante)

function atras(){
    history.back();
}

function delante(){
    history.forward();
}