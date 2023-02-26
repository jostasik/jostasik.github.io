var map = L.map("map", {
  center: [39.9, -75.5],
  zoom: 6,
  minZoom: 4,
  maxZoom: 12,
  preferCanvas: true,
  worldCopyJump: true,
})

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy;<a href="https://www.openstreetmap.com/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attributions">Carto</a>',
}).addTo(map)

var myRenderer = L.canvas({
  padding: 1,
  tolerance: 5,
  interactive: true,
})

//L.control.locate({position: "topleft", locateOptions: {flyTo: true, maxZoom: 12}}).addTo(map)

map.attributionControl.setPrefix('Developed by <a href="https://jostasik.com" target="_blank">Joe Stasik</a>')
