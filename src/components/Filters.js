/**
 * General dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * General utility dependencies
 */
import capitalize from 'capitalize';
import styled from 'styled-components';

/**
 * Material and Semantic UI dependencies
 */
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Button, Icon } from 'semantic-ui-react';

/**
 * Local dependencies
 */
import autoBind from '../utils/auto-bind';

/**
 * Import and inject styles
 */
import 'react-select/dist/react-select.css';
import 'semantic-ui-css/semantic.min.css';
import '../styles/Root.css';

/**
 * Import Selectors
 */
import {
  getFilters,
  getFilterOptions,
  setFilter,
  removeFilter,
  clearAllFilters,
} from '../ducks/outfits';

/**
 * Custom styling for the selected menu items
 */
const styles = {
  selected: {
    color: '#DEA5A4'
  }
};

/**
 * Primitive
 */
const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0 10px 10px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

/**
 * Primitive
 */
 const FilterValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 30px 10px;
 `;


class Filters extends Component {

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  /**
   * Callback function for setting filters
   */
  handleSetFilter(field, event, index, value) {
    const { setFilter } = this.props;
    setFilter({field, value});
  }

  /**
  * Callback function for removing certain filters
  */
  handleRemoveFilter(field, index) {
    const { removeFilter } = this.props;
    removeFilter({field, index});
  }

  /**
   * Callback function for clearing all filters
   */
  handleClearAllFilters() {
    const { clearAllFilters } = this.props;
    clearAllFilters();
  }

  /**
   * Utility function to handle showing menu items for the drop down (multiple values)
   */
  multipleMenuItems(obj, values) {
    return obj.map( (elm) => (
      <MenuItem
        key = {elm.value}
        insetChildren = {true}
        checked = {values && values.indexOf(elm) > -1}
        value = {elm.value}
        primaryText = {elm.label} />
    ))
  }

  /**
   * Utility function to handle showing menu items for the drop down (single values)
   */
  singleMenuItems(obj) {
    return obj.map( (elm) => (
      <MenuItem
        key = {elm.value}
        value = {elm.value}
        primaryText = {elm.label} />
    ))
  }

  render() {

    /**
     * De-structure props and states
     */
    const {
      filterOptions,
      filters,
    } = this.props;

    /**
     * Create brand options
     */
    const brandOptions = filterOptions.brand
    .map((option) => ({
      value: option.toLowerCase(),
      label: capitalize.words(option),
    }));

    /**
     * Create brand filter values
     */
    const brandFilterValues = filters.brand
    .map((brand) => {
      return (
        brand
      )
    });

    /**
     * Create brand filter value display dock
     */
    const brandFilterValueDock = brandFilterValues
    .map( (brand, index) => {
      return (
        <Button className='filter-value' onClick={this.handleRemoveFilter.bind(null, 'brand', index)}
                basic color='grey' content='Olive' icon labelPosition='left'>
            <Icon name='remove' />
            { capitalize.words(brand) }
        </Button>
      )
    });

        /**
     * Create colour options
     */
    const colourOptions = filterOptions.colour
    .map((option) => ({
      value: option.toLowerCase(),
      label: capitalize.words(option),
    }));

    /**
     * Create colour filter values
     */
    const colourFilterValues = filters.colour
    .map((colour) => {
      return (
        colour
      )
    });

    /**
     * Create colour filter value display dock
     */
    const colourFilterValueDock = colourFilterValues
    .map( (colour, index) => {
      return (
        <Button className='filter-value' onClick={this.handleRemoveFilter.bind(null, 'colour', index)}
                basic color='grey' content='Olive' icon labelPosition='left'>
            <Icon name='remove' />
            { capitalize.words(colour) }
        </Button>
      )
    });

    return (
      /**
       * Put in react-select boxes here
       *
       * The options should be a selector that reduces
       * all available options down to a list to select from
       */
       <div>
        <FlexContainer>
            <SelectField
              className="select-field"
              selectedMenuItemStyle={styles.selected}
              multiple={true}
              hintText="Outfit Brand"
              value={brandFilterValues}
              onChange={this.handleSetFilter.bind(null, 'brand')}>
                {this.multipleMenuItems(brandOptions, brandFilterValues)}
            </SelectField>
            <SelectField
              className="select-field"
              selectedMenuItemStyle={styles.selected}
              multiple={true}
              hintText="Outfit Colour"
              value={colourFilterValues}
              onChange={this.handleSetFilter.bind(null, 'colour')}>
               {this.multipleMenuItems(colourOptions, colourFilterValues)}
            </SelectField>
        </FlexContainer>
         {/** Filter Values Dock **/}
        <FilterValues>
          {brandFilterValueDock}
          {colourFilterValueDock}
        </FilterValues>
      </div>
    );
  }
}

/**
 * Get params here (search and filtering)
 */
const mapStateToProps = (state) => {
  return {
    filters: getFilters(state),
    filterOptions: getFilterOptions(state),
  };
};


/**
 * Map action creators / dispatch to props
 */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setFilter,
    removeFilter,
    clearAllFilters,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
