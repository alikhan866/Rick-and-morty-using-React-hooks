import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Episode from './Episode/Episode'
const Episodes = (props) => {

    const [listOfEpisodes, setListOfEpisodes] = useState([])
    const [nextResponse, setNextResponse] = useState()
    const [filteredListOfEpisodes, setFilteredListOfEpisodes] = useState([])
    const { setTotalPosts } = props
    const { url } = props
    const { urlQuery } = props
    const { firstPost } = props
    const { lastPost } = props
    const { setUrl } = props
    const { serverCall } = props
    const { setServerCall } = props
    const { userSearchValue } = props
    const { setUrlQuery } = props
    const { error } = props
    const { setError } = props

    useEffect(() => {
        if (serverCall) {
            setUrl(nextResponse)
            setServerCall(false)
        }
        if (url && userSearchValue === '') {
            
            console.log(url)
            axios.get(url)
                .then((response) => {
                    setError(false)
                    setNextResponse(response.data.info.next)
                    setTotalPosts(response.data.info.count)
                    const transformedResponse = response.data.results
                    setListOfEpisodes([...listOfEpisodes, ...transformedResponse])
                })
        }
    }, [url, setTotalPosts, serverCall, userSearchValue])


    useEffect(() => {
        if (serverCall) {
            setUrlQuery(nextResponse)
            setServerCall(false)
        }
        if (userSearchValue !== '') {
            if (urlQuery) {
                axios.get(urlQuery)
                    .then((response) => {
                        setError(false)
                        setNextResponse(response.data.info.next)
                        setTotalPosts(response.data.info.count)
                        const transformedResponse = response.data.results
                        setFilteredListOfEpisodes([...filteredListOfEpisodes, ...transformedResponse])
                    })
                    .catch((err) => {
                        setError(true)
                    })
            }
        }

    }, [urlQuery, setTotalPosts, serverCall])

    let episodes

    if (userSearchValue === '') {
        episodes = (
            <div>
                {listOfEpisodes ? listOfEpisodes.map((resp, index) => {
                    while (index >= firstPost && index <= lastPost) {
                        return (
                            <Episode
                                episodeName={resp.name}
                                id={resp.id}
                                url={resp.url}
                                episodeDate={resp.air_date}
                                key={resp.id}
                            />
                        )
                    }
                }) : null}
            </div>
        )
    } else {
        episodes = (
            <div>
                {filteredListOfEpisodes ? filteredListOfEpisodes.map((resp, index) => {
                    while (index >= firstPost && index <= lastPost) {
                        return (
                            <Episode
                                episodeName={resp.name}
                                id={resp.id}
                                url={resp.url}
                                episodeDate={resp.air_date}
                                key={resp.id}
                            />
                        )
                    }
                }) : null}
            </div>
        )
    }


    return (
        <div>
            {error
                ? <h2>
                    No such episode found please enter a valid episode name
            </h2>
                : episodes}
        </div>
    )
}
export default Episodes