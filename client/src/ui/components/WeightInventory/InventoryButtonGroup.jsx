import React from 'react';
import { Button } from 'semantic-ui-react';

class InventoryButtonGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const buttonGroupStyle = {
      paddingTop: 5,
    };
    return (
      <>
        <Button.Group style={buttonGroupStyle}>
          <Button>-</Button>
          <Button>X</Button>
          <Button>+</Button>
        </Button.Group>
      </>
    );
  }
}

export default InventoryButtonGroup;
