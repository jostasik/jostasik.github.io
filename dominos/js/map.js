var map = L.map("map", {center: [39.9, -78.5], zoom: 6, minZoom: 4, maxZoom: 16, preferCanvas: true, worldCopyJump: true})

var baseMaps = {
  Light: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: "&copy; OpenStreetMap"}).addTo(map),
  Dark: L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {attribution: "&copy; Carto Maptiles"}),
  Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"),
}

var storeIcon = L.icon({iconUrl: "./../dominos/images/marker.svg", iconSize: [34, 34], iconAnchor: [16, 16]})

var supplyIcon = L.icon({iconUrl: "./../dominos/images/supplyChainCenter.svg", iconSize: [34, 34], iconAnchor: [16, 16]})

L.control.layers(baseMaps).addTo(map)

var storeMarkers = L.markerClusterGroup({
  maxClusterRadius: 60,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
}).addTo(map)

L.control.locate({position: "topleft", locateOptions: {flyTo: true, maxZoom: 12}}).addTo(map)

map.attributionControl.setPrefix('developed by <a href="https://jostasik.com" target="_blank">Joe Stasik</a>')
