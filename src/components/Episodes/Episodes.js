import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Episode from './Episode/Episode'
const Episodes = (props) => {

    const [listOfEpisodes, setListOfEpisodes] = useState([])

    useEffect(() => {
        if (props.url) {
            console.log(props.url)
            axios.get(props.url)
                .then((response) => {
                    console.log(response)
                    const transformedResponse = response.data.results
                    setListOfEpisodes(transformedResponse)
                })
        }
    },[props.url])


    useEffect(()=>{
        if (props.urlQuery !== null) {
            // console.log(props.urlQuery)
            if (props.urlQuery)
                axios.get(props.urlQuery)
                    .then((response) => {
                        console.log(response)
                        const transformedResponse = response.data.results
                        setListOfEpisodes(transformedResponse)
                    })
        }
    },[props.urlQuery])


    const episodes = (
        <div>
            {listOfEpisodes.map((resp) => {
                return (
                    <Episode
                        episodeName={resp.name}
                        id={resp.id}
                        url={resp.url}
                        episodeDate={resp.air_date}
                        key={resp.id}
                    />
                )
            })}
        </div>
    )
    return (
        <div>
            {episodes}
        </div>
    )
}
export default Episodes