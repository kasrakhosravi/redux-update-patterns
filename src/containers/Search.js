import React, { Component } from 'react';

import SearchResults from './SearchResults';
import Filters from '../components/Filters';

class SearchApp extends Component {
  render() {
    return (
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Filters />
        <SearchResults />
      </div>
    );
  }
}

export default SearchApp;
