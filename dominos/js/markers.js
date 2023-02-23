$.get("./../dominos/data/info.csv", function (storeData) {
  var data = Papa.parse(storeData, {header: true, dynamicTyping: true}).data
  for (var i in data) {
    const row = data[i]
    const popupContent = `<div style='text-align:center;font-size:16px'>Domino's <b>${row.StoreID}</b></div>Franchisee: <b>${row.Franchisee}</b>`
    const marker = L.marker([row.Latitude, row.Longitude], {opacity: 1, icon: storeIcon}).bindPopup(popupContent)
    marker.on("click", function (e) {
      var popup = e.target.getPopup()
      $.getJSON(`https://api.jostasik.com/api/profile?storeId=${row.StoreID}`).done(function (api) {
        var liveDetails = `City: ${api.City}, ${api.Region}<br>Phone: ${api.Phone}<hr>
                          Open: <span style='text-transform:capitalize'><b>${api.IsOpen}</b><br>
                          Deliveries: <b>${api.ServiceMethodEstimatedWaitMinutes.Delivery.Min}-${api.ServiceMethodEstimatedWaitMinutes.Delivery.Max}</b> mins<br>
                          Carryouts: <b>${api.ServiceMethodEstimatedWaitMinutes.Carryout.Min}-${api.ServiceMethodEstimatedWaitMinutes.Carryout.Max}</b> mins<br>
                          <sub><i>as of: ${api.StoreAsOfTime}</i></sub>`

        popup.setContent(`${popupContent}<br>${liveDetails}`)
        popup.update()
      })
    })
    storeMarkers.addLayer(marker)
  }
})

$.get("./../dominos/data/scc.csv", function (supplyData) {
  var data = Papa.parse(supplyData, {header: true, dynamicTyping: true}).data
  for (var i in data) {
    const row = data[i]
    var marker = L.marker([row.Latitude, row.Longitude], {opacity: 1, zIndexOffset: -1000, icon: supplyIcon})
      .bindPopup(
        `Supply Chain Center #${row.SupplyID}<hr>
                    ${row.Address}`
      )
      .addTo(map)
  }
})
