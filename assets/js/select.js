$(document).ready(function(){
    $('#btn-continuar').click(function() {
        //Se verifica si la opcion del select esta vacia
        if ($('#selector').val().trim() ==! '') {
            $('.seccion-modal').show();
        } else {
           $('.seccion-modal').hide();
        }
    });
});