import React from 'react';

const Stack = ({ children, className }) => {
  return (
    <div className={`stack ${className}`}>{React.Children.map(children, (child) => React.cloneElement(child))}</div>
  );
};

export default Stack;
