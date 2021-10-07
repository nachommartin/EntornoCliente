const b1= document.querySelector("#bot1");
b1.addEventListener('click', decirFecha)
const b2= document.querySelector("#bot2");
b2.addEventListener('click', calendar)
const b3= document.querySelector("#bot3");
b3.addEventListener('click', demora)
const b4= document.querySelector("#bot4");
b4.addEventListener('click', ticTac)
const b5= document.querySelector("#bot5");
b5.addEventListener('click', fijarAlarma)

function decirFecha(){
    let meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    let diasSemana = ["domingo","lunes", "martes","miércoles","jueves","viernes","sábado"];
    let fecha=new Date();
    let cadena= document.querySelector("#fecha").value;
    let array= cadena.split(",");
    fecha.setDate(array[2]);
    fecha.setMonth(array[1]-1);
    fecha.setFullYear(array[0]);
    let hora= document.querySelector("#hour").value;
    let horaCom= hora.split(":")
    fecha.setHours(horaCom[0]);
    fecha.setMinutes(horaCom[1]);
    let par= document.querySelector("#parraf1")
    par.innerHTML="La fecha es "+diasSemana[fecha.getDay()] + " " + fecha.getDate() + " de " + meses[fecha.getMonth()] + " y son las " + fecha.getHours() +":"+fecha.getMinutes();
}

function calendar(){
    let fc=new Date();
    let mes= document.querySelector("#mes").value;
    let year= document.querySelector("#anyo").value;
    let diasSeman = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];
    let mesecillos = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    fc.setMonth(mes);
    fc.setFullYear(year);
    fc.setDate(0);
    let dias= fc.getDate()
    let list= document.createElement("ul");
    let testo= document.createElement("h3");
    let cabe= document.createTextNode(mesecillos[mes-1] + " del " +year);
    testo.appendChild(cabe);
    for (let i = 1; i <= dias; i++) {
        let resul = new Date(year, mes, i).getDay();
        let lil = document.createElement("li");
        let elem = document.createTextNode("El día " + i + " es " +diasSeman[resul]);
        lil.appendChild(elem);
        list.appendChild(lil);
        }
    let dv= document.querySelector("#parte2")
    dv.appendChild(testo);
    dv.appendChild(list);
}

function demora(){
let arrayMes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
let feit= document.querySelector("#data").value
let tarde= document.querySelector("#deis").value
let fechi= new Date(feit)
console.log(fechi)
fechi.setDate(fechi.getDate() + parseInt(tarde));
let paf= document.querySelector("#parraf3")
paf.innerHTML="La nueva fecha de pago es "+ fechi.getDate() + " de " + arrayMes[fechi.getMonth()] + " del "+ fechi.getFullYear()
}

function crono(){
    let prf= document.querySelector("#parraf4")
    let hoy = new Date();
    let dayo= hoy.getDate();
    let messi= hoy.getMonth();
    let anio= hoy.getFullYear();
    let hr = hoy.getHours();
    let min = hoy.getMinutes();
    let sec = hoy.getSeconds();

    prf.innerHTML="Hola hoy es "+dayo+"-"+(messi+1)+"-"+anio+ " y son las " +hr+":"+min+":"+sec
}

function ticTac(){
 setInterval(()=>{crono()},1000);
}


function crono2(){
    let pr5= document.querySelector("#parraf5")
    let today = new Date();
    let hr = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    pr5.innerHTML="Son las " +hr+":"+min+":"+sec
}

function reloj(){
 setInterval(()=>{crono2()},1000);
}

function fijarAlarma(){
    let hoje = new Date();
    let input = document.querySelector("#alarm").value
    let future= new Date(input)
    let segundos= (future.getTime() - hoje.getTime()) / 1000;
    let temporizador = setTimeout(sonarAlarma, (segundos*1000));
    let mensaje = setTimeout(lanzarMensaje, (segundos*1000)+500);


}

function sonarAlarma(){
    sonido.loop = true;
    sonido.play();
}

function lanzarMensaje(){
    aux= prompt ("Quiere detener la alarma (S/N)");
    if (aux=='S'){
        pararAlarma();
    }
    else if (aux=='N'){
        sonarOtraVez();
    }
    else{
        alert("Opcion equivocada")
        lanzarMensaje()
    }
}

function pararAlarma(){
    sonido.pause();
}

function sonarOtraVez(){
    pararAlarma();
    alert("Sonará en dos minutos")
    let temporizador = setTimeout(sonarAlarma, (1000*120));
    let mensaje = setTimeout(lanzarMensaje, (1000*120)+500);
}

let sonido = new Audio("https://raw.githubusercontent.com/Xiija/TestFiles/master/Yuki%20%26%20Tako%2001.mp3");