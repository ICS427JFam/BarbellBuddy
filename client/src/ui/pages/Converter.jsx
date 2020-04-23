import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Form, Container, Header, Button,
} from 'semantic-ui-react';


class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lbs: '',
      kgs: '',
    };
  }

  handlePounds = e => {
    const lbs = e.target.value;

    this.setState({
      lbs,
      kgs: Number(lbs * 0.45359237).toFixed(2),
    });

    if (lbs === '') {
      this.setState({lbs: 0});
    }
  };

  handleKilos = e => {
    const kgs = e.target.value;

    this.setState({
      kgs,
      lbs: Number(kgs / 0.45359237).toFixed(2),
    });

    if (kgs === '') {
      this.setState(this.state);
    }
  };

  handleReset = () => {
    this.setState({lbs: '', kgs: ''});
  };

  render() {
    return (
      <Container style={{
        padding: '1em', paddingBottom: '32px', maxWidth: '100px', margin: '2em auto',
      }}
      >
        <Header as="h2">Weight Converter</Header>
        <Form width="200">
          <Form.Field>
            <label htmlFor="Pounds">Pound (lb)</label>
            <input
              id="lbInput"
              placeholder="Enter pounds"
              value={this.state.lbs}
              onChange={this.handlePounds}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="Kilograms">Kilogram (kg)</label>
            <input
              id="kgInput"
              placeholder="Enter kilograms"
              value={this.state.kgs}
              onChange={this.handleKilos}
            />
          </Form.Field>
          <Button onClick={this.handleReset}>Clear</Button>
        </Form>
      </Container>
    );
  }
}

export default Converter;
