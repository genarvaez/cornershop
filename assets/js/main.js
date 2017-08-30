/*************************INICIO***************************/
 // Carousel
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  	autoplay()   
	function autoplay() {
	    $('.carousel').carousel('next');
	    setTimeout(autoplay, 4500);
	}  
$(".button-collapse").sideNav();



/*************************Geocode******************/
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: -33.4488897, lng: -70.6692655},
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('btn-continuar').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
       
    
    });
    var i;
    $('#btn-continuar').click(validarSelect);




function validarSelect(){

        //Se verifica si la opcion del select esta vacia
        if ($('#selector').val().trim() ==! '') {
            $('.seccion-modal').show();
            i = null;
        } 
        else if($('#selector').val() == 33) {
           $('.seccion-modal').hide();
           i = 0
        }
        else if($('#selector').val() == 24) {
           
           i = 1
        }
        else{
        	$('.seccion-modal').hide();
        }
        console.log($('#selector').val() + "hola")
        return i
    }



function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
           resultsMap.setCenter(results[0].geometry.location);

            var iconAddres = [{
            	url: "../../dist/img/marker_address.png",
           	    scaledSize: new google.maps.Size(50, 50), // scaled size
           	    origin: new google.maps.Point(0,0), // origin
           	    anchor: new google.maps.Point(0, 0) // anchor
            },{
            	url: "../../dist/img/market.png",
           	    scaledSize: new google.maps.Size(30, 30), // scaled size
           	    origin: new google.maps.Point(0,0), // origin
           	    anchor: new google.maps.Point(0, 0) // anchor
            }]

            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              animation: google.maps.Animation.DROP,
              icon: iconAddres[0],
            });
            var lat = results[0].geometry.location.lng();
            var lon = results[0].geometry.location.lat();

            $.ajax({
            	url: 'http://cornershopapp.com/api/v1/stores?lat='+lon+'&lng='+lat+'',
            	type: 'GET',
            	dataType: 'json',
            })
            .done(function(res) {
            	console.log("success");
            	console.log(res);
            	res.forEach(function(e){
            	var markerIcon = new google.maps.Marker({
            	    position: new google.maps.LatLng(e.closest_branch.lat, e.closest_branch.lng),
            	    map: resultsMap,
            	    animation: google.maps.Animation.DROP,
            	   	icon: iconAddres[1],
            	});
            	           	
            	var imagen = document.createElement("img");

            	imagen.setAttribute("src", e.img_url);
            	imagen.setAttribute("class", "responsive-img style-stores")
            	
            	document.getElementById("tienda").append(imagen)
            	google.maps.event.addListener(markerIcon, 'mouseover', function(){
            		var miElemento = data[0].filter(function(element){
            			if(element.id == e.id){
            				return element
            			}
            		});


            		var infowindow = new google.maps.InfoWindow({
            		    content: '<div id="infoWindow" class="center"><img src='+miElemento[0].img_url+' class="responsive-img"></div'+ '<br>' +'<p class= "center">'+miElemento[0].closest_branch.next_available_delivery + '</p>'

            		});
            		infowindow.open(resultsMap,markerIcon)
            	
            	google.maps.event.addListener(markerIcon, 'mouseout', function(){
            		infowindow.close();
            	})
            		
       
            	})
            	google.maps.event.addListener(markerIcon, 'click', function() {
                	map.panTo(markerIcon.getPosition()); //centra en el map   
            	});

        	})
            })
            .fail(function() {
            	console.log("error");
            })
            .always(function() {
            	console.log("complete");
            });
        
	        console.log(lat, lon);
	    } 
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
        });
    }
}


