import React from 'react';
import PropTypes from 'prop-types';

const Barbell = (props) => {
  const { leftSide, rightSide } = props;
  return (
    <div className="bar">
      <div className="side left-side">
        {leftSide}
      </div>
      <div className="side right-side">
        {rightSide}
      </div>
    </div>
  );
};

Barbell.propTypes = {
  leftSide: PropTypes.node.isRequired,
  rightSide: PropTypes.node.isRequired,
};

export default Barbell;
