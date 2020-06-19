import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

const CustomNavbar = ({ onButtonClick }) => {

    const [searchValue, setSearchValue] = useState('');

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Rick And Morty</Navbar.Brand>
      <Form inline>
      <FormControl type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <Button onClick={() => onButtonClick(searchValue)}>Search</Button>
      </Form>
    </Navbar>
  );
}
export default CustomNavbar