import React from 'react';
import {
  Container, Grid, Header, Label, Menu, Radio,
} from 'semantic-ui-react';
import Footer from '../components/Shared/Footer';

class WeightInventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false, // default is kilograms (false)
      unit: 'kilograms',
    };
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
    const whiteColor = 'white';
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
                    <Label color={redColor}>25</Label>
                    <Label color={blueColor}>20</Label>
                    <Label color={yellowColor}>15</Label>
                    <Label color={greenColor}>10</Label>
                    <Label color={whiteColor}>5</Label>
                  </Label.Group>
                </Grid.Row>

                <Grid.Row>
                  <Label.Group circular size="massive">
                    <Label color={redColor}>2.5</Label>
                    <Label color={blueColor}>2.0</Label>
                    <Label color={yellowColor}>1.5</Label>
                    <Label color={greenColor}>1.0</Label>
                    <Label color={whiteColor}>0.5</Label>
                  </Label.Group>
                </Grid.Row>
              </Grid>
            )
            : (
              <Grid centered columns={3}>
                <Grid.Row>
                  <Label.Group circular size="massive">
                    <Label color={blueColor}>45</Label>
                    <Label color={yellowColor}>35</Label>
                    <Label color={greenColor}>25</Label>
                  </Label.Group>
                </Grid.Row>

                <Grid.Row>
                  <Label.Group circular size="massive">
                    <Label color={blackColor}>10</Label>
                    <Label color={whiteColor}>5</Label>
                    <Label color={redColor}>2.5</Label>
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
