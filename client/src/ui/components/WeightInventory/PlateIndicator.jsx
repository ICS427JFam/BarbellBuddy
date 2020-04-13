import React from 'react';
import { Button, Grid, Label, Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InventoryButtonGroup from './InventoryButtonGroup';

const PlateIndicator = (props) => {
  const { color, weight } = props;
  return (
    <>
      <Grid>
        <Grid.Row><Label color={color}>{weight}</Label></Grid.Row>
        <Grid.Row><InventoryButtonGroup/></Grid.Row>
      </Grid>
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
