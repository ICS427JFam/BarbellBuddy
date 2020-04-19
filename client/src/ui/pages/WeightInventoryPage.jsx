import React from 'react';
import {
  Button,
  Container, Grid, Header, Label, Menu,
} from 'semantic-ui-react';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import Footer from '../components/Shared/Footer';
import PlateIndicator from '../components/WeightInventory/PlateIndicator';
import NavBar from '../components/Shared/NavBar';

class WeightInventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // checked: false, // default is kilograms (false)
      // unit: 'kilograms',
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

  // handleRadioSliderToggle = () => {
  //   this.setState((prevState) => ({
  //     checked: !prevState.checked,
  //   }), () => {
  //     const { unit } = this.state;
  //     if (unit === 'kilograms') {
  //       this.setState({ unit: 'pounds' });
  //     } else {
  //       this.setState({ unit: 'kilograms' });
  //     }
  //   });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    // const { unit, checked } = this.state;
    const redColor = 'red';
    const blueColor = 'blue';
    const yellowColor = 'yellow';
    const greenColor = 'green';
    const blackColor = 'black';
    const dropShadowStyle = {
      filter: 'drop-shadow(0 0 0.75rem black)',
    };
    return (
      <>
        <NavBar/>
        <Container textAlign="center" style={{ marginTop: 100 }}>
          <Header as="h1" style={dropShadowStyle}>Weight Inventory</Header>
          {/* <Menu text widths={3}> */}
          {/* <Menu.Item position="right"> */}
          {/*   <Header as="h2" style={checked ? undefined : checkedStyle}>Kilograms (kg)</Header> */}
          {/* </Menu.Item> */}
          {/* <Menu.Item> */}
          {/*   <Radio slider onChange={this.handleRadioSliderToggle}/> */}
          {/* </Menu.Item> */}
          {/* <Menu.Item position="left"> */}
          {/*   <Header as="h2" style={checked ? checkedStyle : undefined}>Pounds (lbs)</Header> */}
          {/* </Menu.Item> */}
          {/* </Menu> */}
          {/* {unit === 'kilograms' */}
          {/* ? ( */}
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
          {/* ) */}
          {/*: ( */}
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
          {/* )} */}
          <Button color="blue" size="massive" onClick={this.handleSubmit}>Save Inventory</Button>
        </Container>

        <Footer/>
      </>
    );
  }
}

export default WeightInventoryPage;
