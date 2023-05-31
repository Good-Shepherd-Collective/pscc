document.addEventListener('DOMContentLoaded', function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ29vZC1zaGVwaGVyZC1jb2xsZWN0aXZlIiwiYSI6ImNsaDUwdXY0ZDIzNnUzZG9nZ3BhYXhuaTQifQ.FX0JA3BbKdy5-IJ5gkDpKw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [35.217018, 31.771959],
    zoom: 7,
  });

  function convertToGeoJSON(data) {
    const features = data.map(item => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)],
        },
        properties: {
          event_date: item.event_date,
          location: item.location,
          source: item.source,
          notes: item.notes,
        },
      };
    });

    return {
      type: 'FeatureCollection',
      features: features,
    };
  }

  map.on('load', () => {
    console.log('map loaded');
  
    fetch('https://api.acleddata.com/acled/read/?key=NKGMxfd9aYKKxOBAX4qa&email=cody@goodshepherdcollective.org&iso=275')
      .then(response => response.json())
      .then(responseData => {
        const data = convertToGeoJSON(responseData.data);
  
        map.addSource('your-data-source', {
          type: 'geojson',
          data: data,
        });
  
        map.addLayer({
          id: 'your-data-layer',
          type: 'circle',
          source: 'your-data-source',
          paint: {
            'circle-radius': 5,
            'circle-color': 'black',
            'circle-opacity': 0.4,
            'circle-blur': 0.5,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#7f0d15'
          },
        });
  
        // Change the cursor to a pointer when the mouse is over a marker
        map.on('mouseenter', 'your-data-layer', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
  
        // Change the cursor back to the default grab cursor when the mouse leaves a marker
        map.on('mouseleave', 'your-data-layer', () => {
          map.getCanvas().style.cursor = '';
        });
  
        map.on('click', 'your-data-layer', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const properties = e.features[0].properties;
  
          document.querySelector('#text h1').textContent = properties.location;
          document.querySelector('.event__data').innerHTML = `
            <div class="event__date"><p><strong>Event Date:</strong> ${properties.event_date}</p></div>
            <p><strong>Notes:</strong> ${properties.notes}</p>
            <p><strong>Source:</strong> ${properties.source}</p>
          `;
  
          map.flyTo({
            center: coordinates,
            zoom: 14,
            essential: true,
          });
        });
      })
      .catch(error => console.error(error));
  });
  

  map.on('error', (error) => {
    console.error('Error loading map:', error);
  });
});
