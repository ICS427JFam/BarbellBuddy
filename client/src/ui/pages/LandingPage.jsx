import React from 'react';
import NavBar from '../components/Shared/NavBar';
import {Image, Segment} from "semantic-ui-react";

const divStyle = {
  padding: '0',
  margin: '0',
  border: '0',
  borderRadius: '0',
};

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Segment style={divStyle}>
          <Image fluid src="https://raw.githubusercontent.com/ICS427JFam/BarbellBuddy/NavBar/client/public/bbLogo.png" />
        </Segment>

        <Segment style={divStyle}>
          <Image fluid src="https://raw.githubusercontent.com/ICS427JFam/BarbellBuddy/NavBar/client/public/landingCalc.png" />
        </Segment>
      </div>
    );
  }
}

export default LandingPage;
