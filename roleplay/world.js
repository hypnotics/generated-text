function World (width, height) {
  let elevation = generateMap(width, height, false)
  let moisture = generateMap(width, height, true)
  this.elevation = elevation
  this.moisture = moisture
  this.locations = populate(width, height, elevation, moisture)
}

function generateMap (width, height, next) {
  let value = []
  for (let y = 0; y < height; y++) {
    value[y] = []
    for (let x = 0; x < width; x++) {
      let nx = x / width - 0.5, ny = y / height - 0.5
      if (next) {
        value[y][x] = noise2(nx, ny)
      } else {
        value[y][x] = noise1(nx, ny)
      }
    }
  }
  return value
}

function populate (w, h, elevation, moisture) {
  let list = []
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let e = elevation[x][y]
      let m = moisture[x][y]
      list.push(new Location(x, y, e, m))
    }
  }
  return list
}

function Location (x, y, e, m) {
  this.x = x
  this.y = y
  this.terrain = biome(e, m)
  this.description = describe(this.terrain)
  this.items = ['dust']
  // let terrain = ['Mountains', 'Water', 'Plains', 'Forest', 'Swamp']
  // this.terrain = terrain[Math.floor(Math.random() * terrain.length)]
}

function describe (terrain) {
  let description = ''
  if (terrain === 'TEMPERATE_DECIDUOUS_FOREST') {
    let trees = ''
    let rnd = Math.floor(Math.random() * 3)
    switch (rnd) {
      case 0: trees = 'oaks'; break
      case 1: trees = 'maples'; break
      case 2: trees = 'beeches'; break
    }
    description = 'You are in a forest of ' + trees + ', shrubs, perennial herbs, and mosses. '
  }

  if (terrain === 'OCEAN') {
    description = 'Splash! You are swimming in the ocean. '
  }
  if (terrain === 'BEACH') {
    description = 'You are standing on a beach with fine white sand. '
  }
  if (terrain === 'SCORCHED') { description = 'Hot cracked earth. ' }
  if (terrain === 'BARE') { description = 'The land is completely bare. ' }
  if (terrain === 'TUNDRA') { description = 'Yeah tundra. ' }
  if (terrain === 'SNOW') { description = 'Yeah snow snow snow. ' }
  if (terrain === 'TEMPERATE_DESERT') { description = 'Yeah temperate desert. ' }
  if (terrain === 'SHRUBLAND') { description = 'Yeah shrubby shrubland. ' }
  if (terrain === 'TAIGA') { description = 'Yeah taiga. ' }
  if (terrain === 'GRASSLAND') { description = 'Yeah grassland. ' }
  if (terrain === 'TEMPERATE_RAIN_FOREST') { description = 'It is very misty and green with ferns everywhere. ' }
  if (terrain === 'SUBTROPICAL_DESERT') { description = 'Yeah desert. ' }
  if (terrain === 'TROPICAL_SEASONAL_FOREST') { description = 'Yeah seasonal forest. ' }
  if (terrain === 'TROPICAL_RAIN_FOREST') { description = 'Yeah tropical rain forest baby.' }

  return description
}

function biome (e, m) {
  if (e < 0.1) return 'OCEAN'
  if (e < 0.12) return 'BEACH'

  if (e > 0.8) {
    if (m < 0.1) return 'SCORCHED'
    if (m < 0.2) return 'BARE'
    if (m < 0.5) return 'TUNDRA'
    return 'SNOW'
  }

  if (e > 0.6) {
    if (m < 0.33) return 'TEMPERATE_DESERT'
    if (m < 0.66) return 'SHRUBLAND'
    return 'TAIGA'
  }

  if (e > 0.3) {
    if (m < 0.16) return 'TEMPERATE_DESERT'
    if (m < 0.50) return 'GRASSLAND'
    if (m < 0.83) return 'TEMPERATE_DECIDUOUS_FOREST'
    return 'TEMPERATE_RAIN_FOREST'
  }

  if (m < 0.16) return 'SUBTROPICAL_DESERT'
  if (m < 0.33) return 'GRASSLAND'
  if (m < 0.66) return 'TROPICAL_SEASONAL_FOREST'
  return 'TROPICAL_RAIN_FOREST'
}
