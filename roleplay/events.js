function Event (terrain, player) {
  this.description = generate(terrain, player)
}

function generate (terrain, player) {
  let rnd = Math.floor(Math.random() * 3)
  switch (terrain) {
    case 'OCEAN':
      if (rnd === 0) {
        return 'You drown and die. '
      }
      if (rnd === 1) {
        return 'You get bitten by a shark. '
      }
      if (rnd === 2) {
        return 'You find a big pearl. '
      }
      break
    case 'BEACH':
      if (rnd === 0) {
        return 'You find a sword in the sand. '
      }
      if (rnd === 1) {
        return '.'
      }
      if (rnd === 2) {
        return 'You get bitten by a crab. '
      }
      break
    case 'SCORCHED':
      return 'You catch fire. '
      break
    case 'BARE':
      return 'You die. '
      break
    case 'TUNDRA':
      return 'You die. '
      break
    case 'SNOW':
      return 'You die. '
      break
    case 'TEMPERATE_DESERT':
      return 'You die. '
      break
    case 'SHRUBLAND':
      return 'You die. '
      break
    case 'TAIGA':
      return 'You die. '
      break
    case 'GRASSLAND':
      if (rnd === 0) {
        if (!player.helmet) {
          return 'You remember that you dropped your helmet somewhere in the forest. '
        } else {
          let cut = Math.floor(Math.random() * 4) + 2
          let spell = player.name.substring(0, cut) + ' bomba ' + player.name.substring(cut, player.name.length)
          player.healingSpell = 'bomba'
          return 'You remember a healing spell. It is ' + spell + '. '
        }
      }
      if (rnd === 1) {
        return 'A wind blows in from the east. '
      }
      if (rnd === 2) {
        return 'You get bitten by a goat. '
      }
      break
    case 'TEMPERATE_DECIDUOUS_FOREST':
      if (rnd === 0) {
        return 'You find a dropped helmet. '
      }
      if (rnd === 1) {
        return 'You remember that your fathers name is ' + player.name.split('').reverse().join('') + '. '
      }
      if (rnd === 2) {
        return 'You get bitten by a snake. '
      }
      break
    case 'TEMPERATE_RAIN_FOREST':
      return 'You die. '
      break
    case 'SUBTROPICAL_DESERT':
      return 'You catch fire. '
      break
    case 'TROPICAL_SEASONAL_FOREST':
      return 'You die. '
      break
    case 'TROPICAL_RAIN_FOREST':
      return 'You die. '
      break
  }
}
