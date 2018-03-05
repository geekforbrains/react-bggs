import React, { Component } from 'react'
import { getHotGames, getGame, search } from '../libs/bgg'

class App extends Component {
  constructor () {
    super()
    this.state = {results: []}
    this.searchHandler = this.searchHandler.bind(this)
  }

  updateGame (index, gameId) {
    getGame(gameId, (game) => {
      if (!game) return
      this.setState((prevState) => {
        const results = prevState.results
        results[index] = game
        return {results: results}
      })
    })
  }

  renderResults (results) {
    if (!results || results.length === 0) {
      this.setState({results: null})
    } else {
      this.setState(() => ({results: results}))
      results.map((v, k) => this.updateGame(k, v.id))
    }
  }

  componentDidMount () {
    getHotGames((results) => this.renderResults(results))
  }

  searchHandler (e) {
    const keywords = e.target.value.trim()
    clearTimeout(this.searchDelay)

    if (keywords === '') {
      getHotGames((results) => this.renderResults(results))
    } else if (keywords.length >= 2) {
      this.setState(() => ({results: []}))
      this.searchDelay = setTimeout(() => {
        search(keywords, (results) => this.renderResults(results))
      }, 500)
    }
  }

  render () {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        results: this.state.results,
        onChangeHandler: this.searchHandler}))
  }
}

export default App
