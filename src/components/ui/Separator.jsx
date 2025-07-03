import React from 'react';

const Separator = ({ className = '', orientation = 'horizontal', ...props }) => {
  const classes = [
    orientation === 'horizontal' ? 'border-t border-gray-200 w-full' : 'border-l border-gray-200 h-full',
    className
  ].filter(Boolean).join(' ');

  return <div className={classes} {...props} />;
};

export default Separator;