function colorcode (type) {
  let color
  switch (type) {
    case 'OCEAN': color = '#051aff'; break
    case 'BEACH': color = '#f7e704'; break
    case 'SCORCHED': color = '#fff41a'; break
    case 'BARE': color = '#d9c77d'; break
    case 'TUNDRA': color = '#a8db72'; break
    case 'SNOW': color = '#ffffff'; break
    case 'TEMPERATE_DESERT': color = '#f2df13'; break
    case 'SHRUBLAND': color = '#b6f517'; break
    case 'TAIGA': color = '#bbc476'; break
    case 'GRASSLAND': color = '#57c701'; break
    case 'TEMPERATE_DECIDUOUS_FOREST': color = '#3d8701'; break
    case 'TEMPERATE_RAIN_FOREST': color = '#326e00'; break
    case 'SUBTROPICAL_DESERT': color = '#ffbc02'; break
    case 'TROPICAL_SEASONAL_FOREST': color = '#21540d'; break
    case 'TROPICAL_RAIN_FOREST': color = '#07664a'; break
  }
  return color
}

function draw (world) {
  let height = 22
  let width = 22

  let map = document.getElementById('map')
  let terrains = []
  for (let i = 0; i < (width * height); i++) {
    if (i % width == 0) {
      map.innerHTML += '<br>'
    }
    let t = world.locations[i].terrain
        // map.innerHTML += ' ' + world.locations[i].terrain.substr(0,1)
    map.innerHTML += '<span style="color: ' + colorcode(t) + ';">▇</span>'
    terrains.push(t)
  }
  let terrainTypes = new Set(terrains)
  var counts = {}
  for (var i = 0; i < terrains.length; i++) {
    var num = terrains[i]
    counts[num] = counts[num] ? counts[num] + 1 : 1
  }
    // let info = document.getElementById('info')
    // terrainTypes.forEach(function(value) {
    //     info.innerHTML += value + ': ' + counts[value]+ '<br>'
    // });
}
