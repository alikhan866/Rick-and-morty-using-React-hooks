import React from 'react'
import './Episode.css'
const Episode = (props) => {
    return (
        <div className = "Episode">
            <div><strong>Episode Name :  </strong>{props.episodeName}</div>
            <div><strong>Episode id :  </strong>{props.id}</div>
            <div><strong>Episode url : </strong> <a href = {props.url}>{props.url}</a></div>
            <div><strong>Episode date :  </strong>{props.episodeDate}</div>
        </div>
    )
}

export default Episode