import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Form, Container, Header,
} from 'semantic-ui-react';
import NavBar from '../components/Shared/NavBar';
import Footer from '../components/Shared/Footer';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lbs: '',
      kgs: '',
    };
    this.handlePounds = this.handlePounds.bind(this);
    this.handleKilos = this.handleKilos.bind(this);
  }

  handlePounds(e) {
    e.preventDefault();
    const lbs = e.target.value;
    this.setState({
      lbs,
      kgs: Number(lbs * 0.45359237).toFixed(2),
    });

    if (lbs === '') {
      this.setState({ kgs: '' });
    }
  }

  handleKilos(e) {
    e.preventDefault();
    const kgs = e.target.value;
    this.setState({
      kgs,
      lbs: Number(kgs / 0.45359237).toFixed(2),
    });

    if (kgs === '') {
      this.setState({ lbs: '' });
    }
  }

  render() {
    const { lbs, kgs } = this.state;
    const containerStyle = {
      padding: '1em',
      paddingBottom: '32px',
      maxWidth: '100px',
      margin: '2em auto',
    };
    return (
      <>
        <NavBar/>
        <Container style={containerStyle}>
          <Header as="h1" textAlign="center">Weight Converter</Header>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  name="lbInput"
                  label="Pounds (lb)"
                  placeholder="Enter pounds"
                  value={lbs}
                  onChange={this.handlePounds}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  name="kgInput"
                  label="Kilograms (kg)"
                  placeholder="Enter kilograms"
                  value={kgs}
                  onChange={this.handleKilos}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Container>
        <Footer/>
      </>
    );
  }
}

export default Converter;
