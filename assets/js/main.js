/*************************INICIO***************************/
 // Carousel
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  	autoplay()   
	function autoplay() {
	    $('.carousel').carousel('next');
	    setTimeout(autoplay, 4500);
	}  
$(".button-collapse").sideNav();
$("#tienda").hide();

function storeMarkerIcon(color) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 3,
        scale: 10,
   };
}



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

    document.getElementById('address').addEventListener('keydown', function(event){
    	if(event.which == 13 || event.keyCode == 13){
    		geocodeAddress(geocoder, map);
    	}
    });




var infowindow;


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
              //icon: iconAddres[0],
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
            	$("#tienda").show();
            	
            
            	res.forEach(function(e){
            	var markerIcon = new google.maps.Marker({
            	    position: new google.maps.LatLng(e.closest_branch.lat, e.closest_branch.lng),
            	    map: resultsMap,
            	    animation: google.maps.Animation.DROP,
            	   	icon: storeMarkerIcon(e.closest_branch.store_brand_color),
            	});
            
            	var imagen = document.createElement("img");
            	var divider = document.createElement("div");
            	var parrafo = document.createElement("h6");
            	var text = document.createTextNode(e.closest_branch.next_available_delivery)
            	parrafo.appendChild(text);
            	divider.setAttribute("class", "divider");


            	imagen.setAttribute("src", e.img_url);
            	imagen.setAttribute("class", "responsive-img style-stores");
            	imagen.setAttribute("id", "img_tienda");
            	
            	document.getElementById("tienda").append(imagen);
            	document.getElementById("tienda").append(parrafo);
            	document.getElementById("tienda").append(divider)

            	google.maps.event.addListener(markerIcon, 'click', function(){
                    console.log(infowindow);
                    if(infowindow !== undefined){
                        infowindow.close(resultsMap,markerIcon)
                    }

            		var miElemento = data[0].filter(function(element){
            			if(element.id == e.id){
            				return element
            			}
            		});

            		infowindow = new google.maps.InfoWindow({
            		    content: '<div id="infoWindow" class="center"><img src='+miElemento[0].img_url+' class="responsive-img" width="100"></div'+ '<br>'+ '<div class="producto">' + '</div>' +'<p class= "center">'+miElemento[0].closest_branch.next_available_delivery + '</p>'

            		});

            		infowindow.open(resultsMap,markerIcon)

            	
            	google.maps.event.addListener(resultsMap, 'click', function(){
                    infowindow.close(resultsMap,markerIcon)
            		
            	})
            		
       
            	})

                
                })

            	google.maps.event.addListener(markerIcon, 'click', function() {
                	map.panTo(markerIcon.getPosition()); //centra en el map   
            	});

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


