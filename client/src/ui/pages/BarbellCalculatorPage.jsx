import React from 'react';
import { Container, Form, Header, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import * as jwt from 'jsonwebtoken';
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
import NavBar from '../components/Shared/NavBar';

class BarbellCalculatorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightInput: '',
      outputWeightsArr: [],
      outputMultipliersArr: [],
      weightInventory: [],
      unit: 'kilograms',
    };
  }

  componentDidMount() {
    const comp = this;
    const userToken = window.localStorage.getItem('user-token');
    jwt.verify(userToken, 'secret', (err, data) => {
      if (err) {
        console.log(err);
      }
      axios
        .get(`http://localhost:3001/api/weightInventory/${data.username}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(function (response) {
          comp.setState({ weightInventory: response.data.weightInventory });
        })
        .catch(function (err2) {
          console.log(err2);
        });
    });
  }

  getBarWeight = (barType, unit) => {
    if (unit === 'kilograms') {
      if (barType === 'men') {
        return 20;
      }
      return 15;
    }
    if (unit === 'pounds') {
      if (barType === 'men') {
        return 45;
      }
    }
    return 35;
  };

  getPlateInventory = (weightInventory, unit) => {
    if (unit === 'kilograms') {
      return weightInventory.kgInventory;
    }
    return weightInventory.lbInventory;
  };

  getPlates = (unit) => {
    if (unit === 'kilograms') {
      return [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5];
    }
    return [45, 35, 25, 10, 5, 2.5];
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleDropdownChange = (e, { value }) => {
    this.setState(
      {
        unit: value,
        outputWeightsArr: [],
        outputMultipliersArr: [],
        weightInput: '',
      },
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { weightInput, weightInventory, unit } = this.state;
    const barWeight = this.getBarWeight(weightInventory.barType, unit);
    const weightAvailable = this.calculateWeightAvailable();
    const parsedWeightInput = parseInt(weightInput, 10);
    if (parsedWeightInput > weightAvailable) {
      Swal.fire({
        title: 'Weight Input Exceeded Amount Available',
        icon: 'error',
        html: `<p>Your weight input has exceeded the amount of weight available in your inventory!</p>
               <p>Total Weight Available (${unit}): ${weightAvailable} </p>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      return;
    }
    if (parsedWeightInput <= barWeight) {
      Swal.fire({
        title: 'Invalid Weight Input',
        icon: 'error',
        html: `<p>Your weight input must be greater than the weight of the bar.
               <p>Bar Weight (${unit}): ${barWeight} </p>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      return;
    }
    this.calculateWeights(parsedWeightInput);
  };

  sortKeys = (obj) => {
    const key = Object.keys(obj)
      .sort(function order(key1, key2) {
        if (key1 < key2) return -1;
        if (key1 > key2) return +1;
        return 0;
      });

    // Taking the object in 'temp' object
    // and deleting the original object.
    const temp = {};

    for (let i = 0; i < key.length; i++) {
      temp[key[i]] = obj[key[i]];
      delete obj[key[i]];
    }

    // Copying the object from 'temp' to
    // 'original object'.
    for (let i = 0; i < key.length; i++) {
      obj[key[i]] = temp[key[i]];
    }
    return obj;
  };

  calculateWeightAvailable = () => {
    const { weightInventory, unit } = this.state;
    const barWeight = this.getBarWeight(weightInventory.barType, unit);
    const plateInventory = this.getPlateInventory(weightInventory, unit);
    // Fix the keys of change plates in plate inventory (i.e., '2_5' to '2.5')
    Object.entries(plateInventory).forEach(([key]) => {
      if (key.includes('_')) {
        const newKey = key.split('_').join('.');
        delete Object.assign(plateInventory, { [newKey]: plateInventory[key] })[key];
      }
    });
    const newPlateInventory = this.sortKeys(plateInventory);
    let result = 0;
    Object
      .entries(newPlateInventory)
      .sort((a, b) => a[0] - b[0])
      .forEach(([key, value]) => {
        result += parseFloat(key) * value;
      });
    result += barWeight;
    return result;
  };

  calculateWeights = (weightInput) => {
    const { weightInventory, unit } = this.state;
    const barWeight = this.getBarWeight(weightInventory.barType, unit);
    const plates = this.getPlates(unit);
    const plateInventory = this.getPlateInventory(weightInventory, unit);
    const actualWeight = weightInput - barWeight;
    let remain = actualWeight / 2;
    const retWeightArr = [];
    const retMultiplierArr = [];
    let remainder = 0;
    plates.forEach((plate) => {
      let num;
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
    const { weightInput, outputWeightsArr, outputMultipliersArr, unit } = this.state;
    const dropdownOptions = [
      {
        key: 'kilograms',
        text: 'Kilograms (kgs)',
        value: 'kilograms',
      },
      {
        key: 'pounds',
        text: 'Pounds (lbs)',
        value: 'pounds',
      },
    ];
    const dropShadowStyle = {
      filter: 'drop-shadow(0 0 0.75rem black)',
    };
    const weightsInputFormStyle = {
      marginTop: 50,
      marginBottom: 50,
    };
    const weightsTextOutputStyle = {
      marginTop: 50,
      marginBottom: 50,
    };
    return (
      <>
        <NavBar/>
        <Container textAlign="center" style={weightsInputFormStyle}>
          <Header as="h1" style={dropShadowStyle}>Barbell Calculator</Header>
          <Dropdown
            defaultValue={unit}
            onChange={this.handleDropdownChange}
            options={dropdownOptions}
          />
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
        {outputWeightsArr.length !== 0
          ? (
            <>
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

              <Container textAlign="center" style={weightsTextOutputStyle}>
                <Header as="h1">Plates PER SIDE</Header>
                {outputWeightsArr.map((weight, index) => (outputMultipliersArr[index] !== 0
                  ? <Header key={`${unit}-${weight}`} as="h3">{weight} {unit} x{outputMultipliersArr[index]}</Header>
                  : ''))}
              </Container>
            </>
          )
          : ''}

        <Footer/>
      </>
    );
  }
}

export default BarbellCalculatorPage;
