// import axios from 'axios';
// import * as jwt from 'jsonwebtoken';
import * as TYPES from './types';

// const getWeightInventory = () => {
//   const userToken = window.localStorage.getItem('user-token');
//   jwt.verify(userToken, 'secret', (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     axios
//       .get(`http://localhost:3001/api/weightInventory/${data.username}`, {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       })
//       .then(function (response) {
//         return response.data.weightInventory;
//       })
//       .catch(function (err2) {
//         console.log(err2);
//       });
//   });
// };
//
// const getInitialState = () => {
//   const inventory = getWeightInventory();
//   return {
//     kilograms: {
//       '25': inventory.kgInventory['25'],
//       '20': inventory.kgInventory['20'],
//       '15': inventory.kgInventory['15'],
//       '10': inventory.kgInventory['10'],
//       '5': inventory.kgInventory['5'],
//       '2_5': inventory.kgInventory['2_5'],
//       '2_0': inventory.kgInventory['2'],
//       '1_5': inventory.kgInventory['1_5'],
//       '1_0': inventory.kgInventory['1'],
//       '0_5': inventory.kgInventory['0_5'],
//     },
//     pounds: {
//       '45': inventory.lbInventory['45'],
//       '35': inventory.lbInventory['35'],
//       '25': inventory.lbInventory['25'],
//       '10': inventory.lbInventory['10'],
//       '5': inventory.lbInventory['5'],
//       '2_5': inventory.lbInventory['2_5'],
//     },
//   };
// };

const initialState = {
  kilograms: {
    '25': 0,
    '20': 0,
    '15': 0,
    '10': 0,
    '5': 0,
    '2_5': 0,
    '2': 0,
    '1_5': 0,
    '1': 0,
    '0_5': 0,
  },
  pounds: {
    '45': 0,
    '35': 0,
    '25': 0,
    '10': 0,
    '5': 0,
    '2_5': 0,
  },
};

function reducer(state = initialState, action) {
  let s;
  const kilogramsState = state.kilograms;
  const poundsState = state.pounds;
  switch (action.type) {
    /* Kilograms */
    // Plate Weights
    case TYPES.SET_KGS_25_PLATE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '25': action.payload,
        },
      };
      return s;
    case TYPES.SET_KGS_20_PLATE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '20': action.payload,
        },
      };
      return s;
    case TYPES.SET_KGS_15_PLATE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '15': action.payload,
        },
      };
      return s;
    case TYPES.SET_KGS_10_PLATE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '10': action.payload,
        },
      };
      return s;
    // Change Weights
    case TYPES.SET_KGS_5_CHANGE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '5': action.payload,
        },
      };
      return s;
    case TYPES.SET_KGS_2_5_CHANGE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '2_5': action.payload,
        },
      };
      return s;
    case TYPES.SET_KGS_2_0_CHANGE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '2': action.payload,
        },
      };
      return s;
    case TYPES.SET_KGS_1_5_CHANGE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '1_5': action.payload,
        },
      };
      return s;
    case TYPES.SET_KGS_1_0_CHANGE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '1': action.payload,
        },
      };
      return s;
    case TYPES.SET_KGS_0_5_CHANGE_WEIGHT:
      s = {
        ...state,
        kilograms: {
          ...kilogramsState,
          '2_5': action.payload,
        },
      };
      return s;
    /* Pounds */
    // Plate Weights
    case TYPES.SET_LBS_45_PLATE_WEIGHT:
      s = {
        ...state,
        pounds: {
          ...poundsState,
          '45': action.payload,
        },
      };
      return s;
    case TYPES.SET_LBS_35_PLATE_WEIGHT:
      s = {
        ...state,
        pounds: {
          ...poundsState,
          '35': action.payload,
        },
      };
      return s;
    case TYPES.SET_LBS_25_PLATE_WEIGHT:
      s = {
        ...state,
        pounds: {
          ...poundsState,
          '25': action.payload,
        },
      };
      return s;
    case TYPES.SET_LBS_10_PLATE_WEIGHT:
      s = {
        ...state,
        pounds: {
          ...poundsState,
          '10': action.payload,
        },
      };
      return s;
    // Change Weights
    case TYPES.SET_LBS_5_CHANGE_WEIGHT:
      s = {
        ...state,
        pounds: {
          ...poundsState,
          '5': action.payload,
        },
      };
      return s;
    case TYPES.SET_LBS_2_5_CHANGE_WEIGHT:
      s = {
        ...state,
        pounds: {
          ...poundsState,
          '2_5': action.payload,
        },
      };
      return s;
    default:
      return state;
  }
}

export default reducer;
