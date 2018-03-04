import axios from 'axios'
import convert from 'xml-js'

export function hot_games(cb) {
  const cache = JSON.parse(sessionStorage.getItem('hot_games'))

  if (cache) {
    console.log('cache loaded: hot_games')
    return cb(cache)
  }

  axios.get('https://www.boardgamegeek.com/xmlapi2/hot')
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4})
      const items = data.items.item
      const formatted = items.map(i => ({
        id: i._attributes.id,
        name: i.name._attributes.value,
        thumbnail: i.thumbnail._attributes.value,
        url: `https://www.boardgamegeek.com/boardgame/${i._attributes.id}`
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
  keywords = encodeURI(keywords)
  axios.get(`https://www.boardgamegeek.com/xmlapi2/search?query=${keywords}&type=boardgame`)
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4})
      const items = data.items.item
      const formatted = items.map(i => ({
        id: i._attributes.id,
        name: i.name._attributes.value,
      }))
      return cb(formatted)
    })
    .catch((error) => {
      console.log(error)
    })
}