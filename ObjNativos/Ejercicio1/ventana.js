const b1 = document.querySelector("#boton1");
b1.addEventListener('click', mover)
const b2 = document.querySelector("#boton2");
b2.addEventListener('click', moverA)
const b3 = document.querySelector("#boton3");
b3.addEventListener('click', auRe)
const b4 = document.querySelector("#boton4");
b4.addEventListener('click', redim)


function mover(){
    let x = document.querySelector("#h1").value
    let y= document.querySelector("#v1").value
    window.moveBy(x,y)
}

function moverA(){
    let x = document.querySelector("#h2").value
    let y= document.querySelector("#v2").value
    window.moveTo(x,y)
}

function auRe(){
    let x = document.querySelector("#a1").value
    let y= document.querySelector("#an1").value
    window.resizeBy(x,y)
}

function redim(){
    let x = document.querySelector("#a2").value
    let y= document.querySelector("#an2").value
    window.resizeTo(x,y)
}