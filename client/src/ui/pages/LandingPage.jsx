import React from 'react';
import NavBar from '../components/Shared/NavBar';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar/>
        meow
      </div>
    );
  }
}

export default LandingPage;
