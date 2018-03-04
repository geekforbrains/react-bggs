import axios from 'axios'
import convert from 'xml-js'

function getGameUrl(id) {
  return `https://www.boardgamegeek.com/boardgame/${id}`
}

export function hot_games(cb) {
  const cache = JSON.parse(sessionStorage.getItem('hot_games'))

  if (cache) {
    console.log('cache loaded: hot_games')
    return cb(cache)
  }

  axios.get('https://www.boardgamegeek.com/xmlapi2/hot?type=boardgame')
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4})
      const items = data.items.item.slice(0, 10)
      const formatted = items.map(i => ({
        id: i._attributes.id,
        name: i.name._attributes.value,
        thumbnail: i.thumbnail._attributes.value,
        url: getGameUrl(i._attributes.id)
      }))
      sessionStorage.setItem('hot_games', JSON.stringify(formatted))
      console.log('cache store: hot_games')
      return cb(formatted)
    })
    .catch((error) => {
      console.log(error)
    })
}

export function search(keywords, cb) {
  console.log('searching:', keywords)
  keywords = encodeURI(keywords)
  axios.get(`https://www.boardgamegeek.com/xmlapi2/search?query=${keywords}&type=boardgame`)
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4})
      const results = data.items.item
      const items = results.constructor === Array ? results : [results]
      const formatted = items.slice(0, 10).map(i => ({
        id: i._attributes.id,
        name: i.name._attributes.value,
      }))
      return cb(formatted)
    })
    .catch((error) => {
      console.log(error)
    })
}

export function get_game(id, cb) {
  const cache = localStorage.getItem(id)

  if (cache) {
    console.log('cache loaded: game', id)
    return cb(JSON.parse(cache))
  }

  axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`)
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4})
      const item = data.items.item
      const formatted = {
        desc: item.description._text.split(' ').splice(0, 20).join(' ')+'...',
        thumbnail: item.thumbnail._text,
        url: getGameUrl(item._attributes.id)
      }
      localStorage.setItem(id, JSON.stringify(formatted))
      console.log('cache store: game', id)
      return cb(formatted)
    })
    .catch((error) => {
      console.log(error)
    })
}