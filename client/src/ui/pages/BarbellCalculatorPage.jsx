import React from 'react';
import { Container, Form } from 'semantic-ui-react';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import Barbell from '../components/BarbellCalculator/Barbell';
import Kilogram25Plate from '../components/BarbellCalculator/KilogramWeights/Kilogram25Plate';
import Kilogram25Change from '../components/BarbellCalculator/KilogramWeights/Kilogram25Change';
import Kilogram5Plate from '../components/BarbellCalculator/KilogramWeights/Kilogram5Plate';
import Kilogram20Plate from '../components/BarbellCalculator/KilogramWeights/Kilogram20Plate';
import Kilogram15Plate from '../components/BarbellCalculator/KilogramWeights/Kilogram15Plate';
import Kilogram10Plate from '../components/BarbellCalculator/KilogramWeights/Kilogram10Plate';
import Kilogram20Change from '../components/BarbellCalculator/KilogramWeights/Kilogram20Change';
import Kilogram15Change from '../components/BarbellCalculator/KilogramWeights/Kilogram15Change';
import Kilogram10Change from '../components/BarbellCalculator/KilogramWeights/Kilogram10Change';
import Kilogram05Change from '../components/BarbellCalculator/KilogramWeights/Kilogram05Change';

class BarbellCalculatorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightInput: '',
      sidePlates: {},
    };
    // TODO: These constants should be fetched from API
    this.unit = 'pounds';
    this.barType = 'men';
    if (this.unit === 'kilograms') {
      if (this.barType === 'men') {
        this.barWeight = 20;
      } else {
        this.barWeight = 15;
      }
      this.plates = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5];
      this.plateInventory = {
        '25': 4,
        '20': 2,
        '15': 2,
        '10': 2,
        '5': 2,
        '2.5': 2,
        '2': 2,
        '1.5': 2,
        '1': 2,
        '0.5': 2,
      };
    } else {
      if (this.barType === 'men') {
        this.barWeight = 45;
      } else {
        this.barWeight = 35;
      }
      this.plates = [45, 35, 25, 10, 5, 2.5, 1.25];
      this.plateInventory = {
        '45': 4,
        '35': 4,
        '25': 4,
        '10': 4,
        '5': 2,
        '2.5': 2,
        '1.25': 0,
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateWeightAvailable = this.calculateWeightAvailable.bind(this);
    this.calculateWeights = this.calculateWeights.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { weightInput } = this.state;
    const weightAvailable = this.calculateWeightAvailable();
    if (weightInput > weightAvailable) {
      Swal.fire({
        title: 'Weight Input Exceeded Amount Available',
        icon: 'error',
        type: 'error',
        html: `<p>Your weight input has exceeded the amount of weight available in your inventory!</p>
               <p>Total Weight Available (${this.unit}): ${weightAvailable} </p>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      return;
    }
    this.calculateWeights(parseInt(weightInput, 10));
  }

  calculateWeightAvailable() {
    const { plateInventory } = this;
    const weights = Object.keys(plateInventory);
    const multipliers = Object.values(plateInventory);
    let result = 0;
    for (let i = 0; i < weights.length; i++) {
      result += weights[i] * multipliers[i];
    }
    result += this.barWeight;
    return result;
  }

  calculateWeights(weightInput) {
    const { barWeight, plates, plateInventory } = this;
    const actualWeight = weightInput - barWeight;
    let remain = actualWeight / 2;
    const retArr = [];
    plates.forEach((plate) => {
      let num = 0;
      const weightAvailable = plateInventory[plate];
      if (plate <= remain && weightAvailable > 0) {
        num = remain / plate;
        if (num > (weightAvailable / 2)) {
          num = (weightAvailable / 2);
        }
        num = Math.floor(num);
        remain -= (num * plate);
      } else {
        num = 0;
      }
      const remainder = remain * 2;
      const retObject = {
        [plate.toString()]: num,
      };
      retArr.push(retObject);
    });
    this.setState({ sidePlates: retArr });
  }

  render() {
    const { weightInput, sidePlates } = this.state;
    const { unit } = this;
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
