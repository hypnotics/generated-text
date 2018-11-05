function Encounter (terrain, player) {
  this.description = generateE(terrain, player)
}

function generateE (terrain, player) {
  let randEncounter = Math.floor(Math.random() * 3)
  switch (terrain) {
    case 'OCEAN':
      if (randEncounter === 0) {
        return 'You meet a old man on a raft. '
      }
      if (randEncounter === 1) {
        return 'You encounter a ghost ship. The ghost captain screams. '
      }
      if (randEncounter === 2) {
        return 'You meet a flock of talking dolphins. '
      }
      break
    case 'BEACH':
      if (randEncounter === 0) {
        return 'There is a mad dog running around on the beach. '
      }
      if (randEncounter === 1) {
        return 'You see a sad philosopher. '
      }
      if (randEncounter === 2) {
        return 'There is a goblin. He smiles with yellow teeth. '
      }
      break
    case 'SCORCHED':
      return 'There is a laughing goblin. '
      break
    case 'BARE':
      return 'There is a laughing goblin. '
      break
    case 'TUNDRA':
      return 'There is a laughing goblin. '
      break
    case 'SNOW':
      return 'There is a laughing goblin. '
      break
    case 'TEMPERATE_DESERT':
      return 'There is a laughing goblin. '
      break
    case 'SHRUBLAND':
      return 'There is a laughing goblin. '
      break
    case 'TAIGA':
      return 'There is a laughing goblin. '
      break
    case 'GRASSLAND':
      if (randEncounter === 0) {
        return 'There is a wild boar approching. '
      }
      if (randEncounter === 1) {
        return 'There is a lonely woolf. He looks at you with hungry eyes. '
      }
      if (randEncounter === 2) {
        return 'You find an interesting looking scarecrow. '
      }
      break
    case 'TEMPERATE_DECIDUOUS_FOREST':
      if (randEncounter === 0) {
        return 'There is a grumpy looking troll approaching you.'
      }
      if (randEncounter === 1) {
        return 'You meet a goblin called ' + player.name.split('').reverse().join('') + '. '
      }
      if (randEncounter === 2) {
        return 'You meet a friendly wood elf. '
      }
      break
    case 'TEMPERATE_RAIN_FOREST':
      return 'You meet a goblin.'
      break
    case 'SUBTROPICAL_DESERT':
      return 'You meet a goblin. '
      break
    case 'TROPICAL_SEASONAL_FOREST':
      return 'You meet a goblin. '
      break
    case 'TROPICAL_RAIN_FOREST':
      return 'You meet a goblin. '
      break
  }
}

