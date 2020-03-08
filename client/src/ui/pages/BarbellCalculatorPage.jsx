import React from 'react';
import { Container, Form } from 'semantic-ui-react';
import Barbell from '../components/BarbellCalculator/Barbell';
import Kilogram25Plate from '../components/BarbellCalculator/Kilogram25Plate';
import Kilogram25Change from '../components/BarbellCalculator/Kilogram25Change';
import Kilogram5Plate from '../components/BarbellCalculator/Kilogram5Plate';
import Kilogram20Plate from '../components/BarbellCalculator/Kilogram20Plate';
import Kilogram15Plate from '../components/BarbellCalculator/Kilogram15Plate';
import Kilogram10Plate from '../components/BarbellCalculator/Kilogram10Plate';
import Kilogram20Change from '../components/BarbellCalculator/Kilogram20Change';
import Kilogram15Change from '../components/BarbellCalculator/Kilogram15Change';
import Kilogram10Change from '../components/BarbellCalculator/Kilogram10Change';
import Kilogram05Change from '../components/BarbellCalculator/Kilogram05Change';

class BarbellCalculatorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightInput: 0,
      submittedWeightInput: 0,
    };
    // TODO: These constants should be fetched from API
    this.unit = 'kilogram';
    this.barType = 'men';
    if (this.unit === 'kilogram') {
      if (this.barType === 'men') {
        this.barWeight = 20;
      } else {
        this.barWeight = 15;
      }
      this.plates = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5];
      this.plateInventory = {
        25: 4,
        20: 2,
        15: 2,
        10: 2,
        5: 2,
        2.5: 2,
        2: 2,
        1.5: 2,
        1: 2,
        0.5: 2,
      };
    } else {
      if (this.barType === 'men') {
        this.barWeight = 45;
      } else {
        this.barWeight = 35;
      }
      this.plates = [45, 35, 25, 10, 5, 2.5, 1.25];
      this.plateInventory = {
        45: 4,
        35: 2,
        25: 2,
        10: 2,
        5: 2,
        2.5: 2,
        1.25: 2,
      };
    }
  }

  handleChange(e, { name, value }) {
    e.preventDefault();
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { weightInput } = this.state;
    this.setState({ submittedWeightInput: weightInput });
  }

  render() {
    const { weightInput } = this.state;
    return (
      <>
        <div>Barbell Calculator Page</div>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="Weight"
              name="weightInput"
              value={weightInput}
              onChange={this.handleChange}
            />
            <Form.Button content="Calculate"/>
          </Form>
        </Container>

        <Barbell
          leftSide={(
            <>
              <Kilogram25Plate/>
              <Kilogram20Plate/>
              <Kilogram15Plate/>
              <Kilogram10Plate/>
              <Kilogram5Plate/>
              <Kilogram25Change/>
              <Kilogram20Change/>
              <Kilogram15Change/>
              <Kilogram10Change/>
              <Kilogram05Change/>
            </>
          )}
          rightSide={(
            <>
              <Kilogram25Plate/>
              <Kilogram20Plate/>
              <Kilogram15Plate/>
              <Kilogram10Plate/>
              <Kilogram5Plate/>
              <Kilogram25Change/>
              <Kilogram20Change/>
              <Kilogram15Change/>
              <Kilogram10Change/>
              <Kilogram05Change/>
            </>
          )}
        />
      </>
    );
  }
}

export default BarbellCalculatorPage;
