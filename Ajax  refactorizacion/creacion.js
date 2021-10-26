const formu = document.querySelector("#formu");
const boton = document.querySelector("#boton")
const nombre = document.querySelector("#name");
const tfno = document.querySelector("#tfn");
const dni = document.querySelector("#dni")
const date= document.querySelector("#fecha")
const terms = document.querySelector("#acepta");


const formIsVal ={
    nombre: false,
    tfno: false,
    dni: false,
    date: false,
    terms: false
}

formu.addEventListener('submit', (e)=> {
    e.preventDefault();
    validar();
    const nuevoUsuario={
    name: nombre.value,
    tfn: tfno.value,
    dni: dni.value,
    edad: calcularEdad(date.value)
    }

    fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
    })
    .then(response=> {
        if (response.ok){
            return response.json()
        }
        return Promise.reject(response) 
          
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
      })
})



nombre.addEventListener('change', (e) =>{
    if (e.target.value.trim().length>0){
        formIsVal.nombre= true;
    }
})

tfno.addEventListener('change', (e) =>{
    let correcto = /^[0-9]+$/;
    if (e.target.value.trim().length>0 && tfno.value.match(correcto)){
        formIsVal.tfno= true;
    }
})

dni.addEventListener('change', (e)=> {
    let dnival= /(^([0-9]{8}[A-Z])|^)$/  
    if (dni.value.match(dnival)){
        formIsVal.dni=true
    }
})

date.addEventListener('change', (e) => {
    let fnac = date.value;
    let edad = calcularEdad(fnac);

if(edad > 15){
    formIsVal.date=true
}
else{
    alert("El usuario es menor de 15 años")
}
})

terms.addEventListener('change', (e) =>{
    formIsVal.terms= e.target.checked;
    (e.target.checked) ? boton.removeAttribute('disabled') : boton.setAttribute('disabled', true)
})

function validar(){
const valores = Object.values(formIsVal)
const validado = valores.findIndex(value => value==false)
if (validado==-1){
    formu.submit
}
else{
    alert('Formulario no rellenado correctamente')
}
}

function calcularEdad(fnac) {
    let hoy = new Date();
    let cumpleanos = new Date(fnac);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var mes = hoy.getMonth() - cumpleanos.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
    }

