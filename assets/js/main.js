/*************************INICIO***************************/
 // Carousel
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  	autoplay()   
	function autoplay() {
	    $('.carousel').carousel('next');
	    setTimeout(autoplay, 4500);
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

    document.getElementById('buscar').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    
    });


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
            
            
            var i = 0;
            data[i].forEach(function(e){
            	var markerIcon = new google.maps.Marker({
            	    position: new google.maps.LatLng(e.closest_branch.lat, e.closest_branch.lng),
            	    map: resultsMap,
            	    animation: google.maps.Animation.DROP,
            	   	icon: iconAddres[1],
            	});
            	console.log(e)
            	var imagen = document.createElement("img");
            	imagen.setAttribute("src", e.img_url);
            	imagen.setAttribute("class", "responsive-img")
            	var form = document.getElementById("tienda-box").append(imagen)
            	google.maps.event.addListener(markerIcon, 'mouseover', function(){
            		var miElemento = data[i].filter(function(element){
            			if(element.id == e.id){
            				return element
            			}
            		});
            		console.log(miElemento)
            		var infowindow = new google.maps.InfoWindow({
            		    content: '<div id="infoWindow" class="center"><img src='+miElemento[0].img_url+' class="responsive-img"><h4>'+miElemento[0].closest_branch.name+'</h4></div'
            		});
            		infowindow.open(resultsMap,markerIcon)
            	
            	google.maps.event.addListener(markerIcon, 'mouseout', function(){
            		infowindow.close();
            	})
            		
       
            	})
            	google.maps.event.addListener(markerIcon, 'click', function() {
                	map.panTo(markerIcon.getPosition()); //centra en el map   
            	});

        	});
            console.log(lat, lon);
	    } 
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
        });

    }
}


var plus = document.getElementById("plus");
plus.addEventListener("click", function(){
	document.getElementById("tienda-box").style.width = "25%";
	this.style.left = "203px"
})