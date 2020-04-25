import * as TYPES from './types';

export const setKGSWeight = (weight, count) => {
  const retVal = {};
  retVal.payload = count;
  switch (weight) {
    case 25:
      retVal.type = TYPES.SET_KGS_25_PLATE_WEIGHT;
      break;
    case 20:
      retVal.type = TYPES.SET_KGS_20_PLATE_WEIGHT;
      break;
    case 15:
      retVal.type = TYPES.SET_KGS_15_PLATE_WEIGHT;
      break;
    case 10:
      retVal.type = TYPES.SET_KGS_10_PLATE_WEIGHT;
      break;
    case 5:
      retVal.type = TYPES.SET_KGS_5_CHANGE_WEIGHT;
      break;
    case 2.5:
      retVal.type = TYPES.SET_KGS_2_5_CHANGE_WEIGHT;
      break;
    case 2.0:
      retVal.type = TYPES.SET_KGS_2_0_CHANGE_WEIGHT;
      break;
    case 1.5:
      retVal.type = TYPES.SET_KGS_1_5_CHANGE_WEIGHT;
      break;
    case 1.0:
      retVal.type = TYPES.SET_KGS_1_0_CHANGE_WEIGHT;
      break;
    case 0.5:
      retVal.type = TYPES.SET_KGS_0_5_CHANGE_WEIGHT;
      break;
    default:
      break;
  }
  return retVal;
};

export const setLBSWeight = (weight, count) => {
  const retVal = {};
  retVal.payload = count;
  switch (weight) {
    case 45:
      retVal.type = TYPES.SET_LBS_45_PLATE_WEIGHT;
      break;
    case 35:
      retVal.type = TYPES.SET_LBS_35_PLATE_WEIGHT;
      break;
    case 25:
      retVal.type = TYPES.SET_LBS_25_PLATE_WEIGHT;
      break;
    case 10:
      retVal.type = TYPES.SET_LBS_10_PLATE_WEIGHT;
      break;
    case 5:
      retVal.type = TYPES.SET_LBS_5_CHANGE_WEIGHT;
      break;
    case 2.5:
      retVal.type = TYPES.SET_LBS_2_5_CHANGE_WEIGHT;
      break;
    default:
      break;
  }
  return retVal;
};
