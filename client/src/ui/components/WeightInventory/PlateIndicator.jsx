import React from 'react';
import { Label, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import InventoryButtonGroup from './InventoryButtonGroup';

class PlateIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kilograms: {},
      pounds: {},
    };
  }

  componentDidMount() {
    const { unit, weight } = this.props;
    const { kilograms, pounds } = this.state;
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
          // comp.setState({ weightInventory: response.data.weightInventory.kgInventory });
          let weightInventory;
          if (unit === 'kilograms') {
            weightInventory = response.data.weightInventory.kgInventory;
            const newState = kilograms;
            switch (weight) {
              /* eslint-disable no-fallthrough */
              case 25:
                newState['25'] = weightInventory['25'];
                comp.setState({ kilograms: newState });
              case 20:
                newState['20'] = weightInventory['20'];
                comp.setState({ kilograms: newState });
              case 15:
                newState['15'] = weightInventory['15'];
                comp.setState({ kilograms: newState });
              case 10:
                newState['10'] = weightInventory['10'];
                comp.setState({ kilograms: newState });
              case 5:
                newState['5'] = weightInventory['5'];
                comp.setState({ kilograms: newState });
              case 2.5:
                newState['2_5'] = weightInventory['2_5'];
                comp.setState({ kilograms: newState });
              case 2.0:
                newState['2'] = weightInventory['2'];
                comp.setState({ kilograms: newState });
              case 1.5:
                newState['1_5'] = weightInventory['1_5'];
                comp.setState({ kilograms: newState });
              case 1.0:
                newState['1'] = weightInventory['1'];
                comp.setState({ kilograms: newState });
              case 0.5:
                newState['0_5'] = weightInventory['0_5'];
                comp.setState({ kilograms: newState });
                break;
              default:
                break;
              /* eslint-enable no-fallthrough */
            }
          } else {
            weightInventory = response.data.weightInventory.lbInventory;
            const newState = pounds;
            switch (weight) {
              /* eslint-disable no-fallthrough */
              case 45:
                newState['45'] = weightInventory['45'];
                comp.setState({ pounds: newState });
              case 35:
                newState['35'] = weightInventory['35'];
                comp.setState({ pounds: newState });
              case 25:
                newState['25'] = weightInventory['25'];
                comp.setState({ pounds: newState });
              case 10:
                newState['10'] = weightInventory['10'];
                comp.setState({ pounds: newState });
              case 5:
                newState['5'] = weightInventory['5'];
                comp.setState({ pounds: newState });
              case 2.5:
                newState['2_5'] = weightInventory['2_5'];
                comp.setState({ pounds: newState });
                break;
              default:
                break;
              /* eslint-enable no-fallthrough */
            }
          }
        })
        .catch(function (err2) {
          console.log(err2);
        });
    });
  }

  getInventoryCount = (unit, weight) => {
    const { kilograms, pounds } = this.state;
    if (unit === 'kilograms') {
      switch (weight) {
        case 25:
          return kilograms['25'];
        case 20:
          return kilograms['20'];
        case 15:
          return kilograms['15'];
        case 10:
          return kilograms['10'];
        case 5:
          return kilograms['5'];
        case 2.5:
          return kilograms['2_5'];
        case 2.0:
          return kilograms['2'];
        case 1.5:
          return kilograms['1_5'];
        case 1:
          return kilograms['1'];
        case 0.5:
          return kilograms['0_5'];
        default:
          return undefined;
      }
    } else {
      switch (weight) {
        case 45:
          return pounds['45'];
        case 35:
          return pounds['35'];
        case 25:
          return pounds['25'];
        case 10:
          return pounds['10'];
        case 5:
          return pounds['5'];
        case 2.5:
          return pounds['2_5'];
        default:
          return undefined;
      }
    }
  };

  render() {
    const { color, weight, unit } = this.props;
    const { kilograms, pounds } = this.state;
    const count = this.getInventoryCount(unit, weight); // This never gets referenced in InventoryButtonGroup but removing this breaks stuff for some reason so dont remove!!!
    return (
      <>
        <Menu.Item>
          <div>
            <Label color={color}>{weight}</Label>
            <br/>
            <InventoryButtonGroup count={count} unit={unit} weight={weight} kilograms={kilograms} pounds={pounds}/>
          </div>
        </Menu.Item>
      </>
    );
  }
}

PlateIndicator.propTypes = {
  color: PropTypes.string,
  weight: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

PlateIndicator.defaultProps = {
  color: undefined,
};

export default PlateIndicator;
