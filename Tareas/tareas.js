
const formulario = document.querySelector('.formu');
const div = document.querySelector('.caja')
const tareaPorHacer = document.querySelector('.porhacer');
const listaTareas = document.querySelector('.listado'); 
const borrarBoton= document.querySelector('.boton_borrado');




const guardarTareasEnAlmacenamiento = () => {
  const valorTarea = tareaPorHacer.value;  

const task = {
  tarea: valorTarea,
  terminada: false
};
  localStorage.setItem('tarea '+(localStorage.length+1), JSON.stringify(task));
};


const obtenerTareasDeAlmacenamiento = ()=>{
  let lista= []
  for (let i=1; i<=localStorage.length; i++){
  lista.push(JSON.parse(localStorage.getItem('tarea '+i)))
  }
  return lista;
}


formulario.addEventListener('submit', (e)=> {
  e.preventDefault();
    guardarTareasEnAlmacenamiento();
    actualizarListaDeTareas();
});



function actualizarListaDeTareas() {
  limpiarUl(listaTareas);
  const tareas= obtenerTareasDeAlmacenamiento();
  let cont= 0;
  tareas.forEach(tarea => {
    cont ++
    const elemento = document.createElement("li");
    elemento.setAttribute("class", "element")
    const cajaChequeo = document.createElement("input");
    cajaChequeo.type = "checkbox";
    cajaChequeo.setAttribute("class", "checkbox")
    cajaChequeo.setAttribute("id", "chequeo"+cont)
    const botonBorrado = document.createElement("button");
    botonBorrado.setAttribute("class", "boton_borrado"); 
    botonBorrado.textContent= "X";
    let numActual= cont;
    const textoTarea = document.createElement("span");
    textoTarea.textContent = tarea.tarea;
    if (tarea.terminada) {
      cajaChequeo.checked = true;
    }
    cajaChequeo.addEventListener('change', chequear); 
    botonBorrado.addEventListener('click', function(){
      for (let i=numActual; i<=localStorage.length; i++){
      let siguiente= localStorage.getItem('tarea '+(i+1))
      localStorage.setItem('tarea '+i, siguiente)
      }
      localStorage.removeItem('tarea '+localStorage.length)
      actualizarListaDeTareas();
    })
    elemento.appendChild(cajaChequeo);
    elemento.appendChild(textoTarea);
    elemento.appendChild(botonBorrado)
    listaTareas.appendChild(elemento);
  })
}

function  chequear() { 
  const tareas= obtenerTareasDeAlmacenamiento();
  let cont= 0
  tareas.forEach(tarea => {
  cont ++
  const cajaChequeo = document.querySelector("#chequeo"+cont);
  if (cajaChequeo.checked) {
    tarea.terminada = true;
        localStorage.setItem('tarea '+cont, JSON.stringify(tarea));
  } 
  else {
    tarea.terminada = false;
        localStorage.setItem('tarea '+cont, JSON.stringify(tarea));
  }
})
}



function limpiarUl(listado){
    while (listado.firstChild) {
        listado.removeChild(listado.firstChild);
    }
}




actualizarListaDeTareas();





  

  /* 

   borrarBoton.addEventListener('click', (e)=>  {
      e.preventDefault();
      tareas.splice(1);
      guardarTareasEnAlmacenamiento(tareas);
      actualizarListaDeTareas();
    });
 
    chequeo.addEventListener('change', chequear);
    

    
    
*/
