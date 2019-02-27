mapboxgl.accessToken = 'pk.eyJ1IjoiM2RuYSIsImEiOiJjanM2aGNsN2MwbzRxNDRudWd1Zjd2ZXMzIn0.al2Bu8NqRbOczP_xxqJZCg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [32.57505249978601, 0.3206802144422909],
    zoom: 9
});
var marker = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([0, 0])
    .addTo(map);


var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

map.addControl(geocoder);
map.addControl(new mapboxgl.NavigationControl());
geocoder.on('result', function (ev) {
            var r = ev.result.place_name;
            document.getElementById('location').value = (r);
        });



