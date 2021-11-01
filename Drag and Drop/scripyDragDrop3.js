const pendingTasks = document.getElementById('pending-tasks')
const finishedTasks = document.getElementById('finished-tasks')
const doingTasks = document.getElementById('doing-tasks')
const formulario = document.querySelector('#formu');
const newTarea = document.querySelector('#nuevaTarea'); 


//dataTransfer
//setData: Establece la información que queremos compartir
//getData: Establece la información que queremos obtener

formulario.addEventListener('submit', (e)=> {
  e.preventDefault();
    guardarTareasEnAlmacenamiento();
    actualizarListaDeTareas();
});

 const guardarTareasEnAlmacenamiento = () => {
  const valorTarea = newTarea.value;  

const task = {
  tarea: valorTarea,
  estado: 1
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


function actualizarListaDeTareas() {
    limpiarDiv(pendingTasks);
    limpiarDiv(doingTasks);
    limpiarDiv(finishedTasks);
    t1 = document.createElement("h2");
    t1.setAttribute("class", "title")
    t1.textContent="Tareas por hacer";
    pendingTasks.appendChild(t1);
    t2 = document.createElement("h2");
    t2.setAttribute("class", "title")
    t2.textContent="Tareas en proceso";
    doingTasks.appendChild(t2);
    t3 = document.createElement("h2");
    t3.setAttribute("class", "title")
    t3.textContent="Tareas finalizadas";
    finishedTasks.appendChild(t3);
    const tareas= obtenerTareasDeAlmacenamiento();
    let cont= 0;
    tareas.forEach(tarea => {
  		cont ++
    	const elemento = document.createElement("div");
    	elemento.setAttribute("class", "task")
    	elemento.setAttribute("draggable", "true")
    	elemento.setAttribute("id", "task-"+cont)
    	const textoTarea = document.createTextNode(tarea.tarea);
    	elemento.appendChild(textoTarea)
    	if (tarea.estado===1) {
    		pendingTasks.appendChild(elemento)
    	}
    	else if(tarea.estado===2){
    		doingTasks.appendChild(elemento)
    	}
    	else{
    		finishedTasks.appendChild(elemento)
    	}
  	})
}

function limpiarDiv(listado){
    while (listado.firstChild) {
        listado.removeChild(listado.firstChild);
    }
}




pendingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

pendingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

pendingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

doingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

doingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

doingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

finishedTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

finishedTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

finishedTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

//OBLIGATORIO, SI NO, NO FUNCIONA
finishedTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

finishedTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    const identificador= element.getAttribute("id");
    let numero= identificador.slice(5)
    element.classList.remove('active')
    const padre = element.parentNode.id

   const tareas= obtenerTareasDeAlmacenamiento();
   tareaCambio= tareas[numero-1]; 
	tareaCambio = {
  		tarea: tareaCambio.tarea,
  		estado: 3
	};    

	localStorage.setItem('tarea '+(numero), JSON.stringify(tareaCambio));

    
    switch (padre) {
        case 'pending-tasks':
          console.log('pendingTasks');
          finishedTasks.appendChild(pendingTasks.removeChild(element));
          break;
        case 'doing-tasks':
          console.log('doingTasks');
          finishedTasks.appendChild(doingTasks.removeChild(element));
          break;
      }
    })



doingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

doingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    const identificador= element.getAttribute("id");
    let numero= identificador.slice(5)

    element.classList.remove('active')
        const padre = element.parentNode.id

    const tareas= obtenerTareasDeAlmacenamiento();
    tareaCambio= tareas[numero-1]; 
	tareaCambio = {
  		tarea: tareaCambio.tarea,
  		estado: 2
	};    

	localStorage.setItem('tarea '+(numero), JSON.stringify(tareaCambio));


        switch (padre) {
        case 'pending-tasks':
          console.log('pendingTasks');
 		   doingTasks.appendChild(pendingTasks.removeChild(element))
          break;
        case 'finished-tasks':
          console.log('finishedTasks');
          doingTasks.appendChild(finishedTasks.removeChild(element));
          break;
      }
})


pendingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

pendingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    const identificador= element.getAttribute("id");
    let numero= identificador.slice(5)


    element.classList.remove('active')
        const padre = element.parentNode.id

    const tareas= obtenerTareasDeAlmacenamiento();
    tareaCambio= tareas[numero-1]; 
	tareaCambio = {
  		tarea: tareaCambio.tarea,
  		estado: 1
	};    

	localStorage.setItem('tarea '+(numero), JSON.stringify(tareaCambio));
   
        switch (padre) {
        case 'doing-tasks':
          console.log('doingTasks');
 		   pendingTasks.appendChild(doingTasks.removeChild(element))
          break;
        case 'finished-tasks':
          console.log('finishedTasks');
          pendingTasks.appendChild(finishedTasks.removeChild(element));
          break;
      }
})

actualizarListaDeTareas(); 