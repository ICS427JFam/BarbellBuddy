import React from 'react';
import {
  Container, Grid, Header, Label, Menu, Radio,
} from 'semantic-ui-react';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import Footer from '../components/Shared/Footer';
import PlateIndicator from '../components/WeightInventory/PlateIndicator';

class WeightInventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false, // default is kilograms (false)
      unit: 'kilograms',
      weightInventory: [],
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

  handleRadioSliderToggle = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }), () => {
      const { unit } = this.state;
      if (unit === 'kilograms') {
        this.setState({ unit: 'pounds' });
      } else {
        this.setState({ unit: 'kilograms' });
      }
    });
  };

  render() {
    const { unit, checked } = this.state;
    const redColor = 'red';
    const blueColor = 'blue';
    const yellowColor = 'yellow';
    const greenColor = 'green';
    const blackColor = 'black';
    const checkedStyle = {
      filter: 'drop-shadow(0 0 0.75rem black)',
    };
    return (
      <>
        <Container textAlign="center" style={{ marginTop: 100 }}>
          <Header as="h1">Weight Inventory</Header>
          <Menu text widths={3}>
            <Menu.Item position="right">
              <Header as="h2" style={checked ? undefined : checkedStyle}>Kilograms (kg)</Header>
            </Menu.Item>
            <Menu.Item>
              <Radio slider onChange={this.handleRadioSliderToggle}/>
            </Menu.Item>
            <Menu.Item position="left">
              <Header as="h2" style={checked ? checkedStyle : undefined}>Pounds (lbs)</Header>
            </Menu.Item>
          </Menu>
          {unit === 'kilograms'
            ? (
              <Grid centered columns={5}>
                <Grid.Row>
                  <Label.Group circular size="massive">
                    <PlateIndicator color={redColor} weight={25}/>
                    <PlateIndicator color={blueColor} weight={20}/>
                    <PlateIndicator color={yellowColor} weight={15}/>
                    <PlateIndicator color={greenColor} weight={10}/>
                    <PlateIndicator weight={5}/>
                  </Label.Group>
                </Grid.Row>

                <Grid.Row>
                  <Label.Group circular size="massive">
                    <PlateIndicator color={redColor} weight={2.5}/>
                    <PlateIndicator color={blueColor} weight={2.0}/>
                    <PlateIndicator color={yellowColor} weight={1.5}/>
                    <PlateIndicator color={greenColor} weight={1.0}/>
                    <PlateIndicator weight={0.5}/>
                  </Label.Group>
                </Grid.Row>
              </Grid>
            )
            : (
              <Grid centered columns={3}>
                <Grid.Row>
                  <Label.Group circular size="massive">
                    <PlateIndicator color={blueColor} weight={45}/>
                    <PlateIndicator color={yellowColor} weight={35}/>
                    <PlateIndicator color={greenColor} weight={25}/>
                  </Label.Group>
                </Grid.Row>

                <Grid.Row>
                  <Label.Group circular size="massive">
                    <PlateIndicator color={blackColor} weight={10}/>
                    <PlateIndicator weight={5}/>
                    <PlateIndicator color={redColor} weight={2.5}/>
                  </Label.Group>
                </Grid.Row>
              </Grid>
            )}
        </Container>

        <Footer/>
      </>
    );
  }
}

export default WeightInventoryPage;
