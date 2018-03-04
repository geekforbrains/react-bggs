import React from 'react'

const ResultItem = ({game}) =>
    <li key={game.id}>
        {game.name}<br />
        <a href={game.url} target="_blank" rel="noopener noreferrer">
            <img src={game.thumbnail} alt={game.name} />
        </a>
    </li>

export default ({results}) =>
    <ul>
        {results.length > 0 
            ? results.map(i => <ResultItem key={i.id} game={i} />)
            : <em>Waiting for results...</em>
        }
    </ul>