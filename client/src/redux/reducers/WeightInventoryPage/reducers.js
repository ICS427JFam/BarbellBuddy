import * as TYPES from './types';

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
