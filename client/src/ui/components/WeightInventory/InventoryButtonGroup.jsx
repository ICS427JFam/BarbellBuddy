import React from 'react';
import { Button, Statistic } from 'semantic-ui-react';

class InventoryButtonGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Button>-</Button>
        <Statistic>X</Statistic>
        <Button>+</Button>
      </>
    );
  }
}

export default InventoryButtonGroup;
