var map = L.map("map", {
  center: [39.9, -75.5],
  zoom: 6,
  minZoom: 4,
  maxZoom: 12,
  preferCanvas: true,
  worldCopyJump: true,
})

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.com/copyright">OpenStreetMap</a>',
}).addTo(map)

var myRenderer = L.canvas({
  padding: 1,
  tolerance: 10,
  interactive: true,
})

var supplyIcon = L.icon({
  iconUrl: "./../dominos/images/supplyChainCenter.svg",
  iconSize: [34, 34],
  iconAnchor: [16, 16],
})

//L.control.locate({position: "topleft", locateOptions: {flyTo: true, maxZoom: 12}}).addTo(map)

map.attributionControl.setPrefix('developed by <a href="https://jostasik.com" target="_blank">Joe Stasik</a>')
