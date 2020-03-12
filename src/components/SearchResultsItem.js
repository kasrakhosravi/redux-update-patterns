import React, { Component } from 'react';
import capitalize from 'capitalize';
import styled from 'styled-components';

const OuterContainer = styled.div`
  width: 33.33%;
  padding: 10px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  height: 400px;
  background: url("${props => props.image}");
  background-size: cover;
  position: relative;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0.5rem;
`;

class SearchResultsRow extends Component {
  render() {
    const {
      id,
      image_link,
      brand,
      colour
    } = this.props;

    /**
     * Convert comma separated image list
     * into an actual array of image urls
     */
    const images = image_link.split(',')
    .map((link) => link.trim());

    /**
     * Return description of UI
     */
    return (
      <OuterContainer style={{width: '32%', padding: '11px'}}>
          <ImageContainer image={images[0]} />
          <InfoContainer>
            <div>
              {capitalize.words(brand)}
            </div>
            <div>
              {capitalize(colour)}
            </div>
          </InfoContainer>
      </OuterContainer>
    );
  }
}

export default SearchResultsRow;
