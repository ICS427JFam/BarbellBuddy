import React from 'react';
import {
  Button,
  Container, Grid, Header, Label, Menu,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import PropTypes from 'prop-types';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import Footer from '../components/Shared/Footer';
import PlateIndicator from '../components/WeightInventory/PlateIndicator';
import NavBar from '../components/Shared/NavBar';

const mapStateToProps = (state) => ({
  kilograms25Plate: state.weightInventory.kilograms['25'],
  kilograms20Plate: state.weightInventory.kilograms['20'],
  kilograms15Plate: state.weightInventory.kilograms['15'],
  kilograms10Plate: state.weightInventory.kilograms['10'],
  kilograms5Change: state.weightInventory.kilograms['5'],
  kilograms25Change: state.weightInventory.kilograms['2_5'],
  kilograms2Change: state.weightInventory.kilograms['2'],
  kilograms15Change: state.weightInventory.kilograms['1_5'],
  kilograms1Change: state.weightInventory.kilograms['1'],
  kilograms05Change: state.weightInventory.kilograms['0_5'],
  pounds45Plate: state.weightInventory.pounds['45'],
  pounds35Plate: state.weightInventory.pounds['35'],
  pounds25Plate: state.weightInventory.pounds['25'],
  pounds10Plate: state.weightInventory.pounds['10'],
  pounds5Change: state.weightInventory.pounds['5'],
  pounds25Change: state.weightInventory.pounds['2_5'],
});

class WeightInventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightInventory: {},
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

  // TODO selector for barType
  handleSubmit = (e) => {
    e.preventDefault();
    const { weightInventory } = this.state;
    const {
      kilograms25Plate,
      kilograms20Plate,
      kilograms15Plate,
      kilograms10Plate,
      kilograms5Change,
      kilograms25Change,
      kilograms2Change,
      kilograms15Change,
      kilograms1Change,
      kilograms05Change,
      pounds45Plate,
      pounds35Plate,
      pounds25Plate,
      pounds10Plate,
      pounds5Change,
      pounds25Change,
    } = this.props;
    const userToken = window.localStorage.getItem('user-token');
    jwt.verify(userToken, 'secret', (err, data) => {
      if (err) {
        console.log(err);
      }
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const reqData = {
        weightInventory: {
          kgInventory: { ...weightInventory.kgInventory },
          lbInventory: { ...weightInventory.lbInventory },
        },
      };
      if (kilograms25Plate !== 0) {
        reqData.weightInventory.kgInventory['25'] = weightInventory.kgInventory['25'] + kilograms25Plate;
      }
      if (kilograms20Plate !== 0) {
        reqData.weightInventory.kgInventory['20'] = weightInventory.kgInventory['20'] + kilograms20Plate;
      }
      if (kilograms15Plate !== 0) {
        reqData.weightInventory.kgInventory['15'] = weightInventory.kgInventory['15'] + kilograms15Plate;
      }
      if (kilograms10Plate !== 0) {
        reqData.weightInventory.kgInventory['10'] = weightInventory.kgInventory['10'] + kilograms10Plate;
      }
      if (kilograms5Change !== 0) {
        reqData.weightInventory.kgInventory['5'] = weightInventory.kgInventory['5'] + kilograms5Change;
      }
      if (kilograms25Change !== 0) {
        reqData.weightInventory.kgInventory['2_5'] = weightInventory.kgInventory['2_5'] + kilograms25Change;
      }
      if (kilograms2Change !== 0) {
        reqData.weightInventory.kgInventory['2'] = weightInventory.kgInventory['2'] + kilograms2Change;
      }
      if (kilograms15Change !== 0) {
        reqData.weightInventory.kgInventory['1_5'] = weightInventory.kgInventory['1_5'] + kilograms15Change;
      }
      if (kilograms1Change !== 0) {
        reqData.weightInventory.kgInventory['1'] = weightInventory.kgInventory['1'] + kilograms1Change;
      }
      if (kilograms05Change !== 0) {
        reqData.weightInventory.kgInventory['0_5'] = weightInventory.kgInventory['0_5'] + kilograms05Change;
      }
      if (pounds45Plate !== 0) {
        reqData.weightInventory.lbInventory['45'] = weightInventory.lbInventory['45'] + pounds45Plate;
      }
      if (pounds35Plate !== 0) {
        reqData.weightInventory.lbInventory['35'] = weightInventory.lbInventory['35'] + pounds35Plate;
      }
      if (pounds25Plate !== 0) {
        reqData.weightInventory.lbInventory['25'] = weightInventory.lbInventory['25'] + pounds25Plate;
      }
      if (pounds10Plate !== 0) {
        reqData.weightInventory.lbInventory['10'] = weightInventory.lbInventory['10'] + pounds10Plate;
      }
      if (pounds5Change !== 0) {
        reqData.weightInventory.lbInventory['5'] = weightInventory.lbInventory['5'] + pounds5Change;
      }
      if (pounds25Change !== 0) {
        reqData.weightInventory.lbInventory['2_5'] = weightInventory.lbInventory['2_5'] + pounds25Change;
      }
      axios
        .put(`http://localhost:3001/api/weightInventory/${data.username}`, reqData, config)
        .then(function () {
          Swal.fire({
            title: 'Weight Inventory Updated',
            icon: 'success',
          });
        })
        .catch(function (err2) {
          console.log(err2);
        });
    });
  };

  render() {
    const { weightInventory } = this.state;
    const redColor = 'red';
    const blueColor = 'blue';
    const yellowColor = 'yellow';
    const greenColor = 'green';
    const blackColor = 'black';
    const dropShadowStyle = {
      filter: 'drop-shadow(0 0 0.75rem black)',
    };
    const saveInventoryButtonStyle = {
      marginTop: 25,
      marginBottom: 50,
    };
    return (
      <>
        <NavBar/>
        <Container textAlign="center" style={{ marginTop: 100 }}>
          <Header as="h1" style={dropShadowStyle}>Weight Inventory</Header>
          <hr style={{ marginBottom: 50 }}/>
          <Grid centered columns={5}>
            <Header as="h2"><b>Kilograms (kgs)</b></Header>
            <Grid.Row>
              <Label.Group circular size="massive">
                <Menu borderless text>
                  <PlateIndicator color={redColor} weight={25} unit="kilograms"/>
                  <PlateIndicator color={blueColor} weight={20} unit="kilograms"/>
                  <PlateIndicator color={yellowColor} weight={15} unit="kilograms"/>
                  <PlateIndicator color={greenColor} weight={10} unit="kilograms"/>
                  <PlateIndicator weight={5} unit="kilograms"/>
                </Menu>
              </Label.Group>
            </Grid.Row>

            <Grid.Row>
              <Label.Group circular size="massive">
                <Menu borderless text>
                  <PlateIndicator color={redColor} weight={2.5} unit="kilograms"/>
                  <PlateIndicator color={blueColor} weight={2.0} unit="kilograms"/>
                  <PlateIndicator color={yellowColor} weight={1.5} unit="kilograms"/>
                  <PlateIndicator color={greenColor} weight={1.0} unit="kilograms"/>
                  <PlateIndicator weight={0.5} unit="kilograms"/>
                </Menu>
              </Label.Group>
            </Grid.Row>
          </Grid>

          <Grid centered columns={3}>
            <Header as="h2"><b>Pounds (lbs)</b></Header>
            <Grid.Row>
              <Label.Group circular size="massive">
                <Menu borderless text>
                  <PlateIndicator color={blueColor} weight={45} unit="pounds"/>
                  <PlateIndicator color={yellowColor} weight={35} unit="pounds"/>
                  <PlateIndicator color={greenColor} weight={25} unit="pounds"/>
                </Menu>
              </Label.Group>
            </Grid.Row>

            <Grid.Row>
              <Label.Group circular size="massive">
                <Menu borderless text>
                  <PlateIndicator color={blackColor} weight={10} unit="pounds"/>
                  <PlateIndicator weight={5} unit="pounds"/>
                  <PlateIndicator color={redColor} weight={2.5} unit="pounds"/>
                </Menu>
              </Label.Group>
            </Grid.Row>
          </Grid>
          {Object.keys(weightInventory).length === 0 && weightInventory.constructor === Object // check if empty
            ? ''
            : (
              <Button style={saveInventoryButtonStyle} color="blue" size="massive" onClick={this.handleSubmit}>
                Save Inventory
              </Button>
            )}
        </Container>

        <Footer/>
      </>
    );
  }
}

WeightInventoryPage.propTypes = {
  kilograms25Plate: PropTypes.number.isRequired,
  kilograms20Plate: PropTypes.number.isRequired,
  kilograms15Plate: PropTypes.number.isRequired,
  kilograms10Plate: PropTypes.number.isRequired,
  kilograms5Change: PropTypes.number.isRequired,
  kilograms25Change: PropTypes.number.isRequired,
  kilograms2Change: PropTypes.number.isRequired,
  kilograms15Change: PropTypes.number.isRequired,
  kilograms1Change: PropTypes.number.isRequired,
  kilograms05Change: PropTypes.number.isRequired,
  pounds45Plate: PropTypes.number.isRequired,
  pounds35Plate: PropTypes.number.isRequired,
  pounds25Plate: PropTypes.number.isRequired,
  pounds10Plate: PropTypes.number.isRequired,
  pounds5Change: PropTypes.number.isRequired,
  pounds25Change: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WeightInventoryPage);
