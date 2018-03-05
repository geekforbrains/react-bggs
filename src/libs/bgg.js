import axios from 'axios'
import convert from 'xml-js'

function getGameUrl(id) {
  return `https://www.boardgamegeek.com/boardgame/${id}`
}

function getGameName(game) {
  const name = game.name.constructor === Array ? game.name[0] : game.name
  return name._attributes.value
}

function setGameDefaults(game) {
  game.thumbnail = game.thumbnail || 'http://placehold.it/100x75'
  game.desc = game.desc || 'Loading description...'
  game.url = getGameUrl(game.id)
  return game
}

export function getHotGames(cb) {
  const cacheKey = 'hotGames'
  const cache = JSON.parse(sessionStorage.getItem(cacheKey))

  if (cache) {
    console.log('cache loaded:', cacheKey)
    return cb(cache)
  }

  axios.get('https://www.boardgamegeek.com/xmlapi2/hot?type=boardgame')
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4})
      const items = data.items.item.slice(0, 10)
      const results = items.map(i => (setGameDefaults({
        id: i._attributes.id,
        name: getGameName(i),
        thumbnail: i.thumbnail._attributes.value,
      })))
      sessionStorage.setItem(cacheKey, JSON.stringify(results))
      console.log('cache store:', cacheKey)
      return cb(results)
    })
    .catch((error) => {
      console.log(error)
      return cb(null)
    })
}

export function getGame(id, cb) {
  const cache = localStorage.getItem(id)

  if (cache) {
    console.log('cache loaded: game', id)
    return cb(JSON.parse(cache))
  }

  axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`)
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4})
      const item = data.items.item
      const game = setGameDefaults({
        id: id,
        name: getGameName(item),
        desc: item.description._text.split(' ').splice(0, 20).join(' ')+'...',
        thumbnail: item.thumbnail._text
      })
      localStorage.setItem(id, JSON.stringify(game))
      console.log('cache store: game', id)
      return cb(game)
    })
    .catch((error) => {
      console.log(error)
      return cb(null)
    })
}

export function search(keywords, cb) {
  keywords = encodeURI(keywords)
  axios.get(`https://www.boardgamegeek.com/xmlapi2/search?query=${keywords}&type=boardgame&nosubtypes=boardgameexpansion`)
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4}).items.item
      const items = data.constructor === Array ? data : [data]
      const results = items.slice(0, 10).map(i => (setGameDefaults({
        id: i._attributes.id,
        name: getGameName(i)
      })))
      return cb(results)
    })
    .catch((error) => {
      console.log(error)
      return cb(null)
    })
}