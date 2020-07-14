import React, { useState, useEffect } from 'react';
import './App.css'
import Episodes from './components/Episodes/Episodes'
import CustomNavbar from './components/Navbar/Navbar'
import Pagination from './components/Pagination/Pagination'
function App() {

  const [postsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [userSearchValue, setUserSearchValue] = useState('');

  const [url, setUrl] = useState(``);
  const [urlQuery, setUrlQuery] = useState(``)

  useEffect(() => {
    setUrl(`https://rickandmortyapi.com/api/episode?page=${currentPage}`)
  }, [currentPage]);

  useEffect(() => {
    setUrlQuery(`https://rickandmortyapi.com/api/episode?name=${userSearchValue}`)
  }, [userSearchValue])

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleButtonClick = (searchValue) => {
      setUserSearchValue(searchValue);
  }

  return (
    <div>
      <CustomNavbar
      onButtonClick={handleButtonClick}
      />
      <Episodes
      urlQuery={urlQuery}
      url={url}
      />
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={36}
        paginate={paginate}
      />
    </div>
    </div>
  );
}

export default App;
