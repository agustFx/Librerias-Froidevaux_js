class Actividad{
  constructor(nombre, dia, horario, direccion){
      this.nombre = nombre;
      this.dia = dia;
      this.horario = horario;
      this.direccion = direccion;
  }
}

let actividades = JSON.parse(localStorage.getItem("actividades")) ?? [];
document.getElementById("formulario-actividad").addEventListener("submit", agregarActividad);

function agregarActividad(e) {
  e.preventDefault();
  const formulario = new FormData(e.target);
  const nombre = formulario.get("nombre");
  const dia = formulario.get("dia");
  const horario = formulario.get("horario");
  const direccion = formulario.get("direccion");

  const actividad = new Actividad(nombre, dia, horario, direccion);
  
  if(camposCorrectos(actividad)) {
    actividades.push(actividad)
    localStorage.setItem("actividades", JSON.stringify(actividades));
    mostrarActividades();
    e.target.reset();
  }
}

function mostrarActividades() {
  let listaActividades = document.getElementById("lista-actividades");
  listaActividades.innerHTML = "";

  actividades.forEach(({nombre, dia, horario, direccion}) => {
    let li = document.createElement("li");
    li.classList.add("li-item")
    li.innerHTML = `
    <hr> 
    ${nombre} el 
    ${dia && dia + " a las"}
    ${horario && horario + "hs en "}
    ${direccion}`;

    const botonBorrar = document.createElement("button");
    botonBorrar.classList.add("button");
    botonBorrar.innerText = "Borrar";

    botonBorrar.addEventListener("click", () => {
      eliminarActividad(nombre);
    })
    li.appendChild(botonBorrar);
    
    listaActividades.appendChild(li);
  });
}

function eliminarActividad(nombre) {
  Swal.fire({
    title: '¿Estás seguro de borrar esta actividad?',
    text: "Después no vas a poder recuperarla",
    icon: 'question',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'},
    showCancelButton: true,
    confirmButtonColor: '#8a577c',
    cancelButtonColor: '#575b8a',
    confirmButtonText: 'Borrar de todas formas'
  }).then((result) => {
    if (result.isConfirmed) {
      actividades = actividades.filter(item => item.nombre != nombre);
      localStorage.setItem("actividades", JSON.stringify(actividades));
      mostrarActividades();
      Swal.fire(
        'Listo!',
        'Tu actividad se borró definitivamente',
        'success'
      )
    } 
  });
}

mostrarActividades();