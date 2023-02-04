const map = L.map("map", { center: [37, -96], zoom: 4, minZoom: 4, maxZoom: 16 })
map.attributionControl.setPrefix('developed by <a href="https://jostasik.com" target="_blank">Joe Stasik</a>')

const markerIcon = L.icon({ iconUrl: "images/marker.svg", iconSize: [32, 32], iconAnchor: [16, 16] })

const dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/attribution">Carto</a>',
})

const light = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/attribution">Carto</a>',
})

const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

const controlLayers = L.control.layers({ Street: street, Dark: dark, Light: light }).addTo(map)

const url = "https://api.jostasik.com/api/profile?storeId="

const template = `Domino's <b>{{storeId}}</b><br>
                  Franchisee: {{franchisee}}<br>
                  <span style='right'><i>City: {{city}}, {{region}}<br>
                  Phone: {{phone}}<hr>
                  Open: <span style='text-transform:capitalize'><b>{{isOpen}}</b><br>
                  Deliveries: <b>{{deliveryMin}}-{{deliveryMax}}</b> mins<br>
                  Carryouts: <b>{{carryoutMin}}-{{carryoutMax}}</b> mins<br>
                  <sub><i>as of: {{storeAsOfTime}}</i></sub><br>`

L.control.locate({ position: "topleft", locateOptions: { flyTo: true, maxZoom: 12 } }).addTo(map)

$.getJSON("/assets/info.json", function (data) {
  data.forEach(function (row) {
    let marker = L.marker([row.y, row.x], { opacity: 1, icon: markerIcon }).bindPopup("Loading...")
    markers.addLayer(marker)
    marker.on("click", function (e) {
      let popup = e.target.getPopup()
      $.getJSON(url + row.i).done(function (data) {
        let liveDetails = template
          .replace("{{storeId}}", row.i)
          .replace("{{franchisee}}", row.f)
          .replace("{{city}}", data.City)
          .replace("{{region}}", data.Region)
          .replace("{{phone}}", data.Phone)
          .replace("{{isOpen}}", data.IsOpen)
          .replace("{{deliveryMin}}", data.ServiceMethodEstimatedWaitMinutes.Delivery.Min)
          .replace("{{deliveryMax}}", data.ServiceMethodEstimatedWaitMinutes.Delivery.Max)
          .replace("{{carryoutMin}}", data.ServiceMethodEstimatedWaitMinutes.Carryout.Min)
          .replace("{{carryoutMax}}", data.ServiceMethodEstimatedWaitMinutes.Carryout.Max)
          .replace("{{storeAsOfTime}}", data.StoreAsOfTime)

        popup.setContent(liveDetails)
        popup.update()
      })
    })
  })
})

const markers = L.markerClusterGroup({ maxClusterRadius: 100 }).addTo(map)
