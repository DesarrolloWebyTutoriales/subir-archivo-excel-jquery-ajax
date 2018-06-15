$(document).ready(function(){

	$('.enviar_archivo').on( "click", function(evt) {

		evt.preventDefault();
		cargarArchivoCSV();

	});

});

function cargarArchivoCSV()
{

	var archivo 		  = $('input[name=archivo_csv]').val();
	var extension		  = $('#archivo_csv').val().split(".").pop().toLowerCase();
	var Formulario		  = document.getElementById('frmSubirCSV');
	var dataForm		  = new FormData(Formulario);

	var retornarError     = false;

	if(archivo=="")
	{
		$('#archivo_csv').addClass('error');
		retornarError = true;
		$('#archivo_csv').focus();
	} 
	else if($.inArray(extension, ['csv']) == -1)
	{
		alert("¡El archivo que esta tratando de subir es invalido!");
		retornarError = true;
		$('#archivo_csv').val("");
	}
	else
	{
		$('#archivo_csv').removeClass('error');
	}

    // A continuacion se resalta todos los campos que contengan errores.
    if(retornarError == true)
    {
        return false;
    }

    $.ajax({

		url: 'procesar.php',
		type: 'POST',
		data: dataForm,
		cache: false,
		contentType: false,
		processData: false,
        beforeSend: function(){
            $('#estado').prepend('<p><img src="images/facebook.gif" /></p>');
        },
        success: function(data){
            $('#estado').fadeOut("fast",function()
            {
                $('#estado').html(data);
            });
            
            $('#estado').fadeIn("slow");
            $("#frmSubirCSV").find('input[type=file]').val("");

        },
		error: function (jqXHR, textStatus, errorThrown) {
		    $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
		}

    });


}