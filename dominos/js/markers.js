$.get("./../dominos/data/info.csv", function (storeData) {
  var data = Papa.parse(storeData, {header: true, dynamicTyping: true}).data
  var markers = []
  for (var i in data) {
    const row = data[i]
    const popupContent = `<div style='text-align:center;font-size:16px'>Domino's <b>${row.ID}</b></div>Franchisee: <b>${row.Franchisee}</b>`
    const marker = L.circleMarker([row.Latitude, row.Longitude], {
      renderer: myRenderer,
      opacity: 1,
      fillOpacity: 1,
      radius: 5,
      weight: 1,
      color: "#000",
      fillColor: getColor(row.Franchisee),
    })
      .addTo(map)
      .bindPopup(popupContent)
    marker.franchisee = row.Franchisee
    markers.push(marker)
    marker.on("click", function (e) {
      for (var j in markers) {
        var m = markers[j]
        if (m.franchisee == e.target.franchisee) {
          m.setRadius(10)
          m.bringToFront()
        } else {
          m.setRadius(5)
          m.bringToBack()
        }
      }
      var popup = e.target.getPopup()
      $.getJSON(`https://api.jostasik.com/api/profile?storeId=${row.ID}`).done(function (api) {
        var liveDetails = `City: ${api.City}, ${api.Region}<br>Phone: ${api.Phone}<hr>Open: <span style='text-transform:capitalize'><b>${api.IsOpen}</b><br>Deliveries: <b>${api.ServiceMethodEstimatedWaitMinutes.Delivery.Min}-${api.ServiceMethodEstimatedWaitMinutes.Delivery.Max}</b> mins<br>Carryouts: <b>${api.ServiceMethodEstimatedWaitMinutes.Carryout.Min}-${api.ServiceMethodEstimatedWaitMinutes.Carryout.Max}</b> mins<br><sub><i>as of: ${api.StoreAsOfTime}</i></sub>`
        popup.setContent(`${popupContent}<br>${liveDetails}`)
        popup.update()
      })
    })
  }
})

$.get("./../dominos/data/scc.csv", function (supplyData) {
  var data = Papa.parse(supplyData, {header: true, dynamicTyping: true}).data
  for (var i in data) {
    const row = data[i]
    var marker = L.marker([row.Latitude, row.Longitude], {opacity: 1, zIndexOffset: -1000, icon: supplyIcon})
      .bindPopup(`Supply Chain Center #${row.SupplyID}<hr>${row.Address}`)
      .addTo(map)
  }
})

function getColor(franchisee) {
  var hash = 0
  for (var i = 0; i < franchisee.length; i++) {
    hash = franchisee.charCodeAt(i) + ((hash << 5) - hash)
  }
  var color = "#"
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    color += value.toString(16).padStart(2, "0")
  }
  return color
}
