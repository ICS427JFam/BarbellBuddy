import React from 'react';
import { Label, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InventoryButtonGroup from './InventoryButtonGroup';

const PlateIndicator = (props) => {
  const { color, weight } = props;
  return (
    <>
      <Menu.Item>
        <div>
          <Label color={color}>{weight}</Label>
          <br/>
          <InventoryButtonGroup/>
        </div>
      </Menu.Item>
    </>
  );
};

PlateIndicator.propTypes = {
  color: PropTypes.string,
  weight: PropTypes.number.isRequired,
};

PlateIndicator.defaultProps = {
  color: undefined,
};

export default PlateIndicator;
