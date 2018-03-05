import React from 'react'

const ResultItem = ({game}) =>
  <div className='media mb-3 pb-3 border-bottom'>
    <a href={game.url} target='_blank'>
      <img className='mr-3 rounded' src={game.thumbnail} width='100' alt={game.name} />
    </a>
    <div className='media-body'>
      <h5 className='mt-0'>{game.name}</h5>
      <p>{game.desc}</p>
    </div>
  </div>

const Message = ({text}) =>
  <p className='text-center text-muted'><em>{text}</em></p>

export {ResultItem, Message}
