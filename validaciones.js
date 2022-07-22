function camposCorrectos({ nombre, dia }){
  if (nombre == "" || nombre.trim() == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No ingresaste un nombre para tu actividad!',
    });
    return false;
  }
  if (dia == "" || dia.trim() == ""){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No ingresaste un día para tu actividad!',
    });
    return false;
  }
  return true;
}