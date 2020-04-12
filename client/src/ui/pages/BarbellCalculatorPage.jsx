import React from 'react';
import { Container, Form, Header } from 'semantic-ui-react';
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
import Pound45Plate from '../components/BarbellCalculator/PoundWeights/Pound45Plate';
import Pound35Plate from '../components/BarbellCalculator/PoundWeights/Pound35Plate';
import Pound25Plate from '../components/BarbellCalculator/PoundWeights/Pound25Plate';
import Pound10Plate from '../components/BarbellCalculator/PoundWeights/Pound10Plate';
import Pound5Change from '../components/BarbellCalculator/PoundWeights/Pound5Change';
import Pound25Change from '../components/BarbellCalculator/PoundWeights/Pound25Change';
import Footer from '../components/Shared/Footer';

class BarbellCalculatorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightInput: '',
      outputWeightsArr: [],
      outputMultipliersArr: [],
      // remainderAmount: 0, TODO: (Low Priority) Show remainder amount
    };
    // TODO: (High priority) These constants should be fetched from API
    this.unit = 'pounds'; // kilograms or pounds (with the s)
    this.barType = 'men'; // men or women
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
      };
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { weightInput } = this.state;
    const { barWeight } = this;
    const weightAvailable = this.calculateWeightAvailable();
    if (weightInput > weightAvailable) {
      Swal.fire({
        title: 'Weight Input Exceeded Amount Available',
        icon: 'error',
        html: `<p>Your weight input has exceeded the amount of weight available in your inventory!</p>
               <p>Total Weight Available (${this.unit}): ${weightAvailable} </p>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      return;
    }
    if (weightInput <= barWeight) {
      Swal.fire({
        title: 'Invalid Weight Input',
        icon: 'error',
        html: `<p>Your weight input must be greater than the weight of the bar.
               <p>Bar Weight (${this.unit}): ${barWeight} </p>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      return;
    }
    this.calculateWeights(parseInt(weightInput, 10));
  };

  calculateWeightAvailable = () => {
    const { plateInventory } = this;
    const weights = Object.keys(plateInventory);
    const multipliers = Object.values(plateInventory);
    let result = 0;
    for (let i = 0; i < weights.length; i++) {
      result += weights[i] * multipliers[i];
    }
    result += this.barWeight;
    return result;
  };

  calculateWeights = (weightInput) => {
    const {
      barWeight, plates, plateInventory, unit,
    } = this;
    const actualWeight = weightInput - barWeight;
    let remain = actualWeight / 2;
    const retWeightArr = [];
    const retMultiplierArr = [];
    let remainder = 0;
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
      remainder = remain * 2;
      retWeightArr.push(plate);
      retMultiplierArr.push(num);
    });
    if (remainder > 0) {
      Swal.fire({
        title: 'Weight Input Exceeded Amount Available',
        icon: 'info',
        html: `Due to insufficient weight inventory, your weight input has been rounded down to ${weightInput - remainder} ${unit}`,
        timerProgressBar: true,
        timer: 5000,
      });
    }
    this.setState({ outputWeightsArr: retWeightArr, outputMultipliersArr: retMultiplierArr });
  };

  renderKilogramPlates = () => {
    const { outputWeightsArr, outputMultipliersArr } = this.state;
    const ret = [];
    for (let i = 0; i < outputWeightsArr.length; i++) {
      if (i === 0) { // 25 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram25Plate key={`kilogram-${i}-${j}`}/>);
        }
      }
      if (i === 1) { // 20 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram20Plate key={`kilogram-${i}-${j}`}/>);
        }
      }
      if (i === 2) { // 15 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram15Plate key={`kilogram-${i}-${j}`}/>);
        }
      }
      if (i === 3) { // 10 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram10Plate key={`kilogram-${i}-${j}`}/>);
        }
      }
      if (i === 4) { // 5 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram5Plate key={`kilogram-${i}-${j}`}/>);
        }
      }
      if (i === 5) { // 2.5 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram25Change key={`kilogram-${i}-${j}`}/>);
        }
      }
      if (i === 6) { // 2.0 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram20Change key={`kilogram-${i}-${j}`}/>);
        }
      }
      if (i === 7) { // 1.5 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram15Change key={`kilogram-${i}-${j}`}/>);
        }
      }
      if (i === 8) { // 1.0 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram10Change key={`kilogram-${i}-${j}`}/>);
        }
      }
      if (i === 9) { // 0.5 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Kilogram05Change key={`kilogram-${i}-${j}`}/>);
        }
      }
    }
    return ret;
  };

  renderPoundPlates = () => {
    const { outputWeightsArr, outputMultipliersArr } = this.state;
    const ret = [];
    for (let i = 0; i < outputWeightsArr.length; i++) {
      if (i === 0) { // 45 lbs
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Pound45Plate key={`pound-${i}-${j}`}/>);
        }
      }
      if (i === 1) { // 35 lbs
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Pound35Plate key={`pound-${i}-${j}`}/>);
        }
      }
      if (i === 2) { // 25 lbs
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Pound25Plate key={`pound-${i}-${j}`}/>);
        }
      }
      if (i === 3) { // 10 kg
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Pound10Plate key={`pound-${i}-${j}`}/>);
        }
      }
      if (i === 4) { // 5 lbs
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Pound5Change key={`pound-${i}-${j}`}/>);
        }
      }
      if (i === 5) { // 2.5 lbs
        for (let j = 0; j < outputMultipliersArr[i]; j++) {
          ret.push(<Pound25Change key={`pound-${i}-${j}`}/>);
        }
      }
    }
    return ret;
  };

  render() {
    const { weightInput, outputWeightsArr, outputMultipliersArr } = this.state;
    const { unit } = this;
    return (
      <>
        <Container textAlign="center" style={{ marginTop: 100 }}>
          <Header>Input Weight ({unit})</Header>
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: 300, margin: 'auto' }}>
            <Form.Input
              name="weightInput"
              value={weightInput}
              required
              onChange={this.handleChange}
            />
            <Form.Button content="Calculate"/>
          </Form>
        </Container>

        <Barbell
          leftSide={(
            <>
              {unit === 'kilograms'
                ? this.renderKilogramPlates()
                : this.renderPoundPlates()}
            </>
          )}
          rightSide={(
            <>
              {unit === 'kilograms'
                ? this.renderKilogramPlates()
                : this.renderPoundPlates()}
            </>
          )}
        />

        <Container textAlign="center" style={{ marginTop: 50 }}>
          <Header as="h1">Plates PER SIDE</Header>
          {outputWeightsArr.map((weight, index) => (outputMultipliersArr[index] !== 0
            ? <Header as="h3">{weight} {unit} x{outputMultipliersArr[index]}</Header>
            : ''))}
        </Container>

        <Footer/>
      </>
    );
  }
}

export default BarbellCalculatorPage;
