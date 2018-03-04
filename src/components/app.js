import React, { Component } from 'react'
import { hot_games, search } from '../libs/bgg'

class App extends Component {
  constructor() {
    super()
    this.state = {results: []}
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  loadHotGames() {
    hot_games(items => {
      this.setState(prevState => ({
        results: items
      }))
    })
  }

  componentDidMount() {
    this.loadHotGames()
  }

  onChangeHandler(e) {
    const keywords = e.target.value.trim()
    if (keywords === '') {
      this.loadHotGames()
    } else {
      this.setState({results: []})
      clearTimeout(this.searchDelay)
      this.searchDelay = setTimeout(() => {
        search(keywords, (results) => {
          this.setState({results: results})
        })
      }, 500)
    }
  }

  render() {
    return React.Children.map(this.props.children, child => 
      React.cloneElement(child, {
        results: this.state.results, 
        onChangeHandler: this.onChangeHandler}))
  }
}

export default App