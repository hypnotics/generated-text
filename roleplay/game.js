
const seed1 = Math.floor(Math.random() * (10 ** 12))
const seed2 = Math.floor(Math.random() * (10 ** 12))

let rng1 = new PRNG(seed1)
let rng2 = new PRNG(seed2)
let gen1 = new SimplexNoise(rng1.nextFloat.bind(rng1))
let gen2 = new SimplexNoise(rng2.nextFloat.bind(rng2))
function noise1 (nx, ny) { return gen1.noise2D(nx, ny) / 2 + 0.5 }
function noise2 (nx, ny) { return gen2.noise2D(nx, ny) / 2 + 0.5 }

// GAME VARIABLES
let height = 22
let width = 22
let world = new World(width, height)
let player = {
  health: 100,
  onFire: false,
  sword: false,
  helmet: false,
  dead: false,
  healingSpell: 'silver',
  name: ''
}
let iteration = 0
let coordinates = [11, 11]
let currentLocation = getCurrentLocation(coordinates)
let currentTerrain = currentLocation.terrain

// VISUALIZE THE WORLD using visual.js
draw(world)

function getCurrentLocation (coords) {
  console.log('x: ' + coords[0] + ' y: ' + coords[1])
  for (let i = 0; i < world.locations.length; i++) {
    if (world.locations[i].x === coords[0] && world.locations[i].y === coords[1]) {
      return world.locations[i]
    }
  }
  return world.locations[5]
}

function describeLocation () {
  return currentLocation.description
}

function notify () {
  let text = ''
  currentLocation = getCurrentLocation(coordinates)
  text += 'You are in ' + currentLocation.terrain + '. '
  if (currentTerrain !== currentLocation.terrain) {
    text += describeLocation()
    currentTerrain = currentLocation.terrain
  }
  return text
}

function reply (phrase) {
  phrase = phrase.toLowerCase()

  let answer = 'OK. '
  let responses = []

  iteration++
  console.log(iteration)

  if (iteration === 1) {
    if (phrase.includes('name')) {
      let sentence = phrase.split(' ')
      player.name = sentence[sentence.length - 1]
    } else {
      player.name = phrase
    }
    // answer = 'You are in a burning forest'
    answer = 'Welcome ' + player.name + '. You find yourself in ' + currentLocation.terrain + '. '
    answer += describeLocation()
    // return answer
  }

  if (phrase.includes('north')) {
    coordinates[1]++
    answer += notify()
  }
  if (phrase.includes('south')) {
    coordinates[1]--
    answer += notify()
  }
  if (phrase.includes('east')) {
    coordinates[0]++
    answer += notify()
  }
  if (phrase.includes('west')) {
    coordinates[0]--
    answer += notify()
  }

  if (phrase.includes('sword') || phrase.includes('helmet')) {
    if (currentLocation.items.includes('helmet')) {
      player.helmet = true
      answer += 'You pick up the helmet and put it on your head. You look cool. '
    }
    if (currentLocation.items.includes('sword')) {
      player.sword = true
      answer += 'You pick up the sword. It shines with a magical glow. '
    }
  }

  if (phrase.includes('leave') || phrase.includes('leaving')) {
    answer += 'You quickly leave the burning forest.' +
    'You are on a shore. In front of you is the ocean. To the west you can see a small village.'
  }

  if (phrase.includes(player.healingSpell)) {
    player.health += 20
    answer += 'You feel stronger. '
  }

  if (iteration !== 1) {
    let chanceOfEvent = Math.floor(Math.random() * 10)
    console.log('event: ' + chanceOfEvent)
    if (chanceOfEvent > 5) {
      let action = new Event(currentLocation.terrain, player, iteration)

      if (action.description.includes('fire')) {
        player.onFire = true
      }
      if (action.description.includes('die')) {
        console.log(action)
        player.dead = true
      }
      if (action.description.includes('bitten')) {
        player.health -= 50
      }
      if (action.description.includes('sword')) {
        currentLocation.items.push('sword')
      }
      if (action.description.includes('helmet')) {
        currentLocation.items.push('helmet')
      }
      answer += action.description
    }
  }

  if (iteration !== 1) {
    let chanceOfEncounter = Math.floor(Math.random() * 10)
    console.log('encounter: ' + chanceOfEncounter)
    if (chanceOfEncounter > 5) {
      let entity = new Encounter(currentLocation.terrain, player, iteration)

      if (entity.description.includes('goblin')) {
        let goblin = {
          answer: 'Hello, beautiful creature!',
          voice: 'Albert'
        }
        console.log(goblin)
        responses.push(goblin)
      }
      if (entity.description.includes('die')) {
        console.log(action)
        player.dead = true
      }
      if (entity.description.includes('bitten')) {
        player.health -= 50
      }
      if (entity.description.includes('sword')) {
        currentLocation.items.push('sword')
      }
      if (entity.description.includes('helmet')) {
        currentLocation.items.push('helmet')
      }
      answer += entity.description
    }
  }

  if (player.onFire) {
    player.health -= 10
    answer += 'You are on fire. '
  }
  if (player.health < 60 && player.health > 30) {
    answer += 'You feel week. '
  }
  if (player.health <= 30 && player.health > 0) {
    answer += 'The pain is blinding your eyes. Your head is spinning. '
  }
  if (player.health <= 0) {
    player.dead = true
  }

  if (player.dead) {
    answer += 'You are dead. You survived ' + iteration + ' iterations.'
  }

  let response = {
    answer: answer,
    voice: 'Veena'
  }
  console.log(response)

  responses.unshift(response)

  return responses
}
