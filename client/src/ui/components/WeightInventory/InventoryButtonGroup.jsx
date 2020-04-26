import React from 'react';
import { Button, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { weightInventoryActions } from '../../../redux/reducers/WeightInventoryPage';

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

const mapDispatchToProps = (dispatch) => ({
  setKGSWeight: (weight, count) => dispatch(weightInventoryActions.setKGSWeight(weight, count)),
  setLBSWeight: (weight, count) => dispatch(weightInventoryActions.setLBSWeight(weight, count)),
});

class InventoryButtonGroup extends React.Component {
  handleIncrease = () => {
    const {
      setKGSWeight, setLBSWeight, unit, weight,
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
    if (unit === 'kilograms') {
      switch (weight) {
        case 25:
          setKGSWeight(weight, kilograms25Plate + 2);
          break;
        case 20:
          setKGSWeight(weight, kilograms20Plate + 2);
          break;
        case 15:
          setKGSWeight(weight, kilograms15Plate + 2);
          break;
        case 10:
          setKGSWeight(weight, kilograms10Plate + 2);
          break;
        case 5:
          setKGSWeight(weight, kilograms5Change + 2);
          break;
        case 2.5:
          setKGSWeight(weight, kilograms25Change + 2);
          break;
        case 2.0:
          setKGSWeight(weight, kilograms2Change + 2);
          break;
        case 1.5:
          setKGSWeight(weight, kilograms15Change + 2);
          break;
        case 1.0:
          setKGSWeight(weight, kilograms1Change + 2);
          break;
        case 0.5:
          setKGSWeight(weight, kilograms05Change + 2);
          break;
        default:
          break;
      }
    } else {
      switch (weight) {
        case 45:
          setLBSWeight(weight, pounds45Plate + 2);
          break;
        case 35:
          setLBSWeight(weight, pounds35Plate + 2);
          break;
        case 25:
          setLBSWeight(weight, pounds25Plate + 2);
          break;
        case 10:
          setLBSWeight(weight, pounds10Plate + 2);
          break;
        case 5:
          setLBSWeight(weight, pounds5Change + 2);
          break;
        case 2.5:
          setLBSWeight(weight, pounds25Change + 2);
          break;
        default:
          break;
      }
    }
  };

  handleDecrease = () => {
    const {
      setKGSWeight, setLBSWeight, unit, weight,
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
    if (unit === 'kilograms') {
      switch (weight) {
        case 25:
          setKGSWeight(weight, kilograms25Plate - 2);
          break;
        case 20:
          setKGSWeight(weight, kilograms20Plate - 2);
          break;
        case 15:
          setKGSWeight(weight, kilograms15Plate - 2);
          break;
        case 10:
          setKGSWeight(weight, kilograms10Plate - 2);
          break;
        case 5:
          setKGSWeight(weight, kilograms5Change - 2);
          break;
        case 2.5:
          setKGSWeight(weight, kilograms25Change - 2);
          break;
        case 2.0:
          setKGSWeight(weight, kilograms2Change - 2);
          break;
        case 1.5:
          setKGSWeight(weight, kilograms15Change - 2);
          break;
        case 1.0:
          setKGSWeight(weight, kilograms1Change - 2);
          break;
        case 0.5:
          setKGSWeight(weight, kilograms05Change - 2);
          break;
        default:
          break;
      }
    } else {
      switch (weight) {
        case 45:
          setLBSWeight(weight, pounds45Plate - 2);
          break;
        case 35:
          setLBSWeight(weight, pounds35Plate - 2);
          break;
        case 25:
          setLBSWeight(weight, pounds25Plate - 2);
          break;
        case 10:
          setLBSWeight(weight, pounds10Plate - 2);
          break;
        case 5:
          setLBSWeight(weight, pounds5Change - 2);
          break;
        case 2.5:
          setLBSWeight(weight, pounds25Change - 2);
          break;
        default:
          break;
      }
    }
  };

  renderCount = () => {
    const {
      weight, unit, kilograms, pounds,
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
    if (unit === 'kilograms') {
      switch (weight) {
        case 25:
          return kilograms['25'] + kilograms25Plate;
        case 20:
          return kilograms['20'] + kilograms20Plate;
        case 15:
          return kilograms['15'] + kilograms15Plate;
        case 10:
          return kilograms['10'] + kilograms10Plate;
        case 5:
          return kilograms['5'] + kilograms5Change;
        case 2.5:
          return kilograms['2_5'] + kilograms25Change;
        case 2.0:
          return kilograms['2'] + kilograms2Change;
        case 1.5:
          return kilograms['1_5'] + kilograms15Change;
        case 1.0:
          return kilograms['1'] + kilograms1Change;
        case 0.5:
          return kilograms['0_5'] + kilograms05Change;
        default:
          return undefined;
      }
    } else {
      switch (weight) {
        case 45:
          return pounds['45'] + pounds45Plate;
        case 35:
          return pounds['35'] + pounds35Plate;
        case 25:
          return pounds['25'] + pounds25Plate;
        case 10:
          return pounds['10'] + pounds10Plate;
        case 5:
          return pounds['5'] + pounds5Change;
        case 2.5:
          return pounds['2_5'] + pounds25Change;
        default:
          return undefined;
      }
    }
  };

  render() {
    const buttonGroupStyle = {
      paddingTop: 5,
    };
    const count = this.renderCount();
    return (
      <>
        <Button.Group style={buttonGroupStyle}>
          <Button onClick={this.handleDecrease} disabled={count === 0 ? true : undefined}>-</Button>
          <Button>{Number.isNaN(count) ? <Loader size="mini" active inline/> : count}</Button>
          <Button onClick={this.handleIncrease}>+</Button>
        </Button.Group>
      </>
    );
  }
}

InventoryButtonGroup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  kilograms: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pounds: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  setKGSWeight: PropTypes.func.isRequired,
  setLBSWeight: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(InventoryButtonGroup);
