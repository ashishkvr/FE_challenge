import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './spinner';

const Loader = props => {
  if (!props.show) {
    return null;
  }
  let message = '',
    position = '';
  let wrapper = document.getElementById('global-loader-container');
  if (!wrapper) {
    const div = document.createElement('div');
    div.id = 'global-loader-container';
    document.body.appendChild(div);
    wrapper = div;
  }
  if (props.options && props.options.message) {
    message = props.options.message;
  }
  if (props.options && props.options.position) {
    position = props.options.position;
  }
  const loaderContent = (
    <div className="global-loader-wrapper">
      <div className="loading">
        <Spinner />
      </div>
      {message ? (
        <div className={`loading-message ${position}`}>{message}</div>
      ) : null}
    </div>
  );
  return ReactDOM.createPortal(loaderContent, wrapper);
};

export default Loader;
