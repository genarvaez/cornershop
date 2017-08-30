$(document).ready(function(){

    $(".registro").on("click", function(e){

        var email = $("#email").val();
        var nombre = $("#nombre").val();
        var apellido = $("#apellido").val();
        var pass = $("#password").val();

        var regexEmail = new RegExp("^[a-z0-9@.]+$");
        var regexNombre = new RegExp("^[a-z]");
        var regexApellido = new RegExp("^[a-z]");
        var regexPass = new RegExp("^([0-9]{1,8})$");

        if(!regexEmail.test(email) || email.indexOf('@') == -1 || email == ""){
           $("#malo1").show();
        }else{
            $("#malo1").hide();
        }
        if(!regexNombre.test(nombre) || nombre == ""){
            $("#malo2").show();
        }else{
            $("#malo2").hide();
        }
        if(!regexApellido.test(apellido) || apellido == ""){
            $("#malo3").show();
        }else{
            $("#malo3").hide();
        }
        if(!regexPass.test(pass) || pass == ""){
            $("#malo4").show();
        }else{
            $("#malo4").hide();
        }
    
        e.preventDefault();
    });
 
});