import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function SearchBox() {
  const [keyword, setKeyword] = useState('');

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex" inline>
      <Form.Control
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button variant="outline-success" className="mt-0">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
