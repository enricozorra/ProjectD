var autocomplete;

function initialize() {
	var mapOptions = {
        zoom: 12,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        disableDoubleClickZoom: true,
        draggable: false,
        scrollwheel: false,
        panControl: false
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    //Geolocation
    
    if(navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(function(position) {
      	var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    		var marker = new google.maps.Marker({
  			 position: pos,
  			 title:"Tu sei qui"
        });
			 marker.setMap(map);
			 map.setCenter(pos);
    	}, function() {
      	handleNoGeolocation(true);
    	});
  	} else {
    	// Browser doesn't support Geolocation
    	handleNoGeolocation(false);
    }

    //Autocomplete

    var input = document.getElementById('pac-input');

    autocomplete = new google.maps.places.Autocomplete(input);
    alert ("ciao");

}

google.maps.event.addDomListener(window, 'load', initialize);