import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerWrapper = ({
  className = '',
  animation = 'border',
  role = 'status',
  variant = 'dark',
  size = '',
  inline = false,
  ...rest
}) => (
  <div className={`${inline ? 'd-inline-block' : 'text-center mt-3'}`}>
    <Spinner
      className={className}
      animation={animation}
      role={role}
      variant={variant}
      size={size}
      {...rest}
    />
  </div>
);

export default SpinnerWrapper;
