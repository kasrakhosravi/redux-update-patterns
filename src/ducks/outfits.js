/**
 * General Dependencies
 */
import { flow } from 'lodash';
import { createSelector } from 'reselect';

/**
 * Services
 */
import * as api from '../services/api';

/**
 * Feature Name
 */
export const NAME = `@outfitdata`;
export const POPULATE_OUTFITS_PENDING = `${NAME}/POPULATE_OUTFITS_PENDING`;
export const POPULATE_OUTFITS_SUCCESS = `${NAME}/POPULATE_OUTFITS_SUCCESS`;
export const POPULATE_OUTFITS_ERROR = `${NAME}/POPULATE_OUTFITS_ERROR`;

export const SET_FILTER = `${NAME}/SET_FILTER`;
export const REMOVE_FILTER = `${NAME}/REMOVE_FILTER`;
export const CLEAR_ALL_FILTERS = `${NAME}/CLEAR_ALL_FILTERS`;

export const TOGGLE_NEAR_LOCATION = `${NAME}/TOGGLE_NEAR_LOCATION`;
export const TOGGLE_ACCOMMODATION = `${NAME}/TOGGLE_ACCOMMODATION`;
export const TOGGLE_CEREMONY = `${NAME}/TOGGLE_CEREMONY`;
export const TOGGLE_CATERING = `${NAME}/TOGGLE_CATERING`;

/**
 * Initial state
 */
const initialState = {
  isInitiallyLoaded: false,
  outfits: [],
  filters: {
    brand: [],
    colour: [],
  },
  error: null,
};


/**
 * Selectors
 */
export const getState = (state) => state[NAME];
export const getOutfits = flow(getState, (state) => state.outfits);
export const getOutfitById = (id) => flow(getOutfits, (outfits) => outfits.find((outfit) => id === outfit.id));
export const getError = flow(getState, (state) => state.error);
export const getInitialLoadStatus = flow(getState, (state) => state.isInitiallyLoaded);
export const getNearLocationEnabled = flow(getState, (state) => state.nearLocation);
export const getFilters = flow(getState, (state) => state.filters);

/**
 * Selector for getting filtered outfits
 * based on the filters in state
 *
 * TODO: Move the filter state to route query
 */
export const getFilteredOutfits = createSelector(
  getFilters,
  getOutfits,
  (filters, outfits) => {
    /**
     * Return filtered outfits list
     */
    return outfits
      .filter(({ brand }) => {
        /**
         * Get the trimmed list of brand
         */
        const brandList = brand.split(',')
        .map((item) => item.toLowerCase().trim());

        /**
         * Check if the outfits brand include some of the filters
         */
        return filters.brand.length ? (
          filters.brand
          .some((item) => brandList.includes(item))
        ) : (
          true
        );
      })
      .filter(({ colour }) => {
        /**
         * Get the trimmed list of brand
         */
        const colourList = colour.split(',')
        .map((item) => item.toLowerCase().trim());

        /**
         * Check if the outfits colour include some of the filters
         */
        return filters.colour.length ? (
          filters.colour
          .some((item) => colourList.includes(item))
        ) : (
          true
        );
      })
  } 
);

/**
 * Selector for getting filter options
 * (reduce all the options down to a unique list)
 */
export const getFilterOptions = flow(getOutfits, (outfits) => {
  return {
    brand: outfits
      .map(({ brand }) => brand.split(','))
      .reduce((combinedTypes, currentTypes) => combinedTypes.concat(currentTypes), [])
      .map((brand) => brand.toLowerCase().trim())
      .filter(x => x)
      .reduce((options, brand) => !options.includes(brand) ? options.concat(brand) : options, [])
      .slice()
      .sort(),
    colour: outfits
      .map(({ colour }) => colour.split(','))
      .reduce((combinedSettings, currentSettings) => combinedSettings.concat(currentSettings), [])
      .map((colour) => colour.toLowerCase().trim())
      .filter(x => x)
      .reduce((options, colour) => !options.includes(colour) ? options.concat(colour) : options, [])
      .slice()
      .sort(),
  }
});

/**
 * Action creators
 */
function populateOutfitsPending() {
  return {
    type: POPULATE_OUTFITS_PENDING,
  }
}

function populateOutfitsSuccess({ outfits }) {
  return {
    type: POPULATE_OUTFITS_SUCCESS,
    outfits,
  }
}

function populateOutfitsError({ error }) {
  return {
    type: POPULATE_OUTFITS_ERROR,
    error
  }
}

/**
 * Thunk (action creator)
 */
export function populateOutfits() {
  return (dispatch) => {
    dispatch(populateOutfitsPending());

    return api.getOutfits()
    .then((outfits) => dispatch(populateOutfitsSuccess({ outfits })))
    .catch((error) => dispatch(populateOutfitsError({ error: error.message })));
  }
}

/**
 * Thunk (action creator)
 *
 * TODO: Move filter state to route query params
 */
export function setFilter({ field, value }) {
  return {
    type: SET_FILTER,
    field,
    value,
  };
}


export function removeFilter({ field, index }) {
    return {
      type: REMOVE_FILTER,
      field,
      index,
    };
}

// export function toggleNearLocation() {
//     return {
//     type: TOGGLE_NEAR_LOCATION
//     };
// }

export function clearAllFilters() {
  return {
    type: CLEAR_ALL_FILTERS
  };
}

/**
 * Root Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case POPULATE_OUTFITS_PENDING:
    return {
      ...state,
      isInitiallyLoaded: false,
    };

    case POPULATE_OUTFITS_SUCCESS:
    return {
      ...state,
      isInitiallyLoaded: true,
      outfits: action.outfits,
    };

    case POPULATE_OUTFITS_ERROR:
    return {
      ...state,
      error: action.error,
    };

    // case TOGGLE_NEAR_LOCATION:
    // return {
    //   ...state,
    //   nearLocation: !state.nearLocation,
    // };

    case SET_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.field]: []
        .concat(action.value)
        .map((item) => (item || {}))
        .filter(x => x)
      },
    };

    case REMOVE_FILTER:
    return {
      ...state,
      filters: {
      ...state.filters,
          [action.field]: [...state.filters[action.field]]
          .filter((x, index) => index !== action.index)
      },
    };

    case CLEAR_ALL_FILTERS:
      return {
        ...state,
        nearLocation: false,
        filters: {
          brand: [],
          colour: [],
        }
      };

    default:
    return state;
  }
}
