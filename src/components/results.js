import React, { Component } from 'react'
import { get_game } from '../libs/bgg'

class ResultItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
          desc: props.game.desc,
          thumbnail: props.game.thumbnail || 'http://via.placeholder.com/100?text=loading..',
          url: props.game.url
        }
    }

    componentDidMount() {
      const game = this.props.game
      get_game(game.id, (result) => {
          this.setState(() => ({
            desc: result.desc,
            thumbnail: result.thumbnail,
            url: result.url
          }))
      })
    }

    render() {
      const game = this.props.game
      const desc = this.state.desc
      const thumbnail = this.state.thumbnail
      const url = this.state.url
      return (
        <div className="media mb-3 pb-3 border-bottom">
          <a href={url} target="_blank">
            <img className="mr-3 rounded" src={thumbnail} width="100" alt={game.name} />
          </a>
          <div className="media-body">
            <h5 className="mt-0">{game.name}</h5>
            <p>{desc}</p>
          </div>
        </div>
      )
    }
}

export default ({results}) =>
  <div>
  {results.length > 0 
      ? results.map(i => <ResultItem key={i.id} game={i} />)
      : <p className="text-center text-muted"><em>Waiting for results...</em></p>
  }
  </div>
