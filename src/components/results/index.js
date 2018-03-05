import React, { Component } from 'react'
import { ResultItem, Message } from './view'

class Results extends Component {
  render() {
    const res = this.props.results
    if (res == null) return <Message text='No results :(' />
    if (res.length === 0) return <Message text='Consulting the Geek...' />
    if (res.length > 0) return <div>{res.map(i => <ResultItem key={i.id} game={i} />)}</div>
  }
}

export default Results