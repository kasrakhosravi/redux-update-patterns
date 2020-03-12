/**
 * Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Sub-components
 */
import Loading from '../components/Loading';

/**
 * Initial load features
 */
import {
  getInitialLoadStatus,
  populateOutfits,
} from '../ducks/outfits';

/**
 * Wrapper component that wraps
 * the child component in order to
 * check if the initialization of the app
 * has been perfomed, and in case it hasn't
 * - kick off the initial data loading
 * before rendering the child component
 *
 * (Shows a loading screen while loading)
 */
class InitialLoadWrapper extends Component {
  componentWillMount() {
    const {
      populateOutfits,
      isInitiallyLoaded,
    } = this.props;

    if (!isInitiallyLoaded) {
      populateOutfits();
    }
  }

  render() {
    const {
      children,
      isInitiallyLoaded,
    } = this.props;

    const loadingMessage = (
      <Loading>
        Loading...
      </Loading>
    );

    return isInitiallyLoaded ? children : loadingMessage;
  }
}

InitialLoadWrapper.propTypes = {
  isInitiallyLoaded: PropTypes.bool,
  populateOutfits: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isInitiallyLoaded: getInitialLoadStatus(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    populateOutfits,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialLoadWrapper);
