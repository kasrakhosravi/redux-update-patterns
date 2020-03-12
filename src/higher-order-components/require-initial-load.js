/**
 * Dependencies
 */
import React from 'react';

/**
 * Wrapper
 */
import InitialLoadWrapper from './InitialLoadWrapper';

/**
 * Higher order component that wraps
 * the child component in order to
 * check if the initialization of the app
 * has been perfomed, and in case it hasn't
 * - kick off the initial data loading
 * before rendering the child component
 *
 * (Shows a loading screen while loading)
 */
export default function (Component) {
  return (props) => {
    return (
      <InitialLoadWrapper>
        <Component {...props} />
      </InitialLoadWrapper>
    );
  };
}
