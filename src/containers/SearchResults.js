/**
 * Global dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

/**
 * Local dependencies
 */
import SearchResultsItem from '../components/SearchResultsItem';

/**
 * Import Selectors
 */
import {
  getFilteredOutfits,
  getFilters,
  getError
} from '../ducks/outfits';

/**
 * Primitive
 */
const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;


class SearchResultsContainer extends Component {

  render() {

    const {
      outfits,
      error,
    } = this.props;


    if (error) {
      return (
        <div>Something bad happened: {error.message}</div>
      );
    }

    if (!outfits.length) {
      return (
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '30px', fontWeight: 'bold' }}>
          <p>No Outfits matching the search criteria..</p>
        </div>
      )
    }

    return (
      <FlexContainer>
        {outfits.map( (outfit) =>
          <SearchResultsItem
            key={'outfit-' + outfit.id}
            {...outfit}
          />
        )}
      </FlexContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    outfits: getFilteredOutfits(state),
    filters: getFilters(state),
    error: getError(state),
  };
};

export default connect(
  mapStateToProps
)(SearchResultsContainer);
