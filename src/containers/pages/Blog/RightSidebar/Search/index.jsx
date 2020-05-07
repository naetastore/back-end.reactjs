import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

function Search() {
    return (
        <FormGroup controlId="keyword">
            <FormControl
                type="text"
                placeholder="Search posts"
            />
        </FormGroup>
    );
}

export default Search;