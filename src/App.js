import React, { useState, useEffect } from 'react';
import './App.css'
import Episodes from './components/Episodes/Episodes'
import CustomNavbar from './components/Navbar/Navbar'
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

function App() {

  const [postsPerPage] = useState(20);
  const [userSearchValue, setUserSearchValue] = useState('');
  const [totalPosts, setTotalPosts] = useState()
  const [url, setUrl] = useState(``);
  const [urlQuery, setUrlQuery] = useState(``)
  const [error, setError] = useState(null)
  const [lastPost, setLastPost] = useState(postsPerPage - 1)
  const [firstPost, setFirstPost] = useState(lastPost - postsPerPage)
  const [serverCall, setServerCall] = useState(false)

  const [pageAtServerCall, setPageAtServerCall] = useState([])

  useEffect(() => {
    setUrl(`https://rickandmortyapi.com/api/episode/`)
  }, []);

  useEffect(() => {
    setUrlQuery(`https://rickandmortyapi.com/api/episode?name=${userSearchValue}`)
  }, [userSearchValue])


  useEffect(() => {
    const serverCallPage = []

    serverCallPage.push((20 / postsPerPage) + 1)
    for (var i = 0; i < (totalPosts / postsPerPage) - 1; i++) {
      if (serverCallPage.indexOf(serverCallPage[0] + i * (20 / postsPerPage)) === -1) {
        serverCallPage.push(serverCallPage[0] + i * (20 / postsPerPage))
      }
    }

    setPageAtServerCall(serverCallPage)

  }, [totalPosts, postsPerPage])

  const handleButtonClick = (searchValue) => {
    setUserSearchValue(searchValue);
  }

  const pageChangeHandler = (pageNumber) => {
    const indexOfLastPost = (pageNumber * postsPerPage) - 1
    const indexOfFirstPost = indexOfLastPost - postsPerPage + 1
    const index = pageAtServerCall.indexOf(pageNumber)

    pageAtServerCall.map((pageAtServerCall) => {
      if (pageNumber === pageAtServerCall) {
        setServerCall(true)
      }
    })
    console.log("PAGE NUMBER", pageNumber)
    if (index !== -1) {
      pageAtServerCall.splice(index, 1)
    }
    console.log(pageAtServerCall)
    setFirstPost(indexOfFirstPost)
    setLastPost(indexOfLastPost)
  }

  return (
    <div>
      <CustomNavbar
        onButtonClick={handleButtonClick}
      />

      <Episodes
        urlQuery={urlQuery}
        url={url}
        setTotalPosts={setTotalPosts}
        firstPost={firstPost}
        lastPost={lastPost}
        setUrl={setUrl}
        serverCall={serverCall}
        setServerCall={setServerCall}
        userSearchValue={userSearchValue}
        setUrlQuery={setUrlQuery}
        error={error}
        setError={setError}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {error ? null : <Pagination
          defaultCurrent={1}
          total={totalPosts}
          pageSize={postsPerPage}
          onChange={pageChangeHandler}
        />}
      </div>
    </div>
  );
}

export default App;
